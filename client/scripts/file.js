import axios from 'axios';
import './charts.js'
import './heatmap.js'
import './navBar.js';
import dayjs from 'dayjs';


async function callForKey() {

  try {
    const response = await axios.get('/api/config', { withCredentials: true })
    return response.data
  } catch (err) {

    console.error(`Could not GET api info for logo... ${err}`)
    return null
  }
}


function getInfoForCards() {

  const applicationStatus = document.getElementById("name").value
  const job = document.getElementById("jobTitle").value
  const company = document.getElementById("company").value

  const info = [
    {
      applicationStatus: `${applicationStatus}`,
      job: `${job}`,
      company: `${company}`
    }
  ]
  return info
}


const writeDB = async () => {


  const info = getInfoForCards();
  const now = dayjs();
  const formattedDate = now.format('MMM D, YYYY h:mm A');
  const apiUrl = await logoApiCall();

  try {
    const response = await axios.post(
      '/api/v1/users/writeDB',
      {
        applicationStatus: info[0].applicationStatus,
        job: info[0].job,
        company: info[0].company,
        apiUrl: apiUrl,
        formattedDate: formattedDate
      },
      {
        withCredentials: true
      }
    );

    
    return response.data.task._id;

  } catch (err) {
    console.error('Failed to write DB:', err);
    return null;
  }
};


//Calling logo.dev API 
async function logoApiCall() {

  
  const info = getInfoForCards()
  const companyName = info[0].company
  const companyName2 = companyName.replaceAll(' ', '').toLowerCase()

  try {
    const response = await callForKey()
    const apiKey = response.apiKey
    const apiUrl = `https://img.logo.dev/${companyName2}.com?token=${apiKey}`
    return apiUrl

  } catch (error) {
    if (error) {
      console.error(`Error fetching data:`, error)
    }
  }

}


async function createCardHTML(applicationStatus, job, company, apiUrl, formattedDate, salary, jobId) {

  if (salary == undefined) { salary = '' }

  return `<div value='${applicationStatus}' class="innerOutput" >

  <h3 class="jobOutput"></h3>

  <h3 class="nameOutput">${company}</h3>
  <h3 class="companyOutput">${job}</h3>

  <img src="${apiUrl}" class="companyImage" />


    <div 
      value="${applicationStatus}" 
       class="${applicationStatus} appendedButton">
      ${applicationStatus}
    </div>


    <h5 class='dateAndTime'>${formattedDate}</h5>
 

  <select name="subject" class='subject' data-id="${jobId}">
    <option value="" selected='${applicationStatus}'>Change Status</option>
    <option value="Applied">Applied</option>
    <option value="Interested">Interested</option>
    <option value="Closed">Closed</option>
    <option value="Assessment">Assessment</option>
    <option value="Rejected">Rejected</option>
    <option value="Interview">Interview</option>
  </select>

  <button class="btn delete" data-id="${jobId}">            
    <span class="mdi mdi-delete mdi-24px"></span>
    <span class="mdi mdi-delete-empty mdi-24px"></span>
    <span>Delete</span>
  </button> 

  <button class='openModalButton'>DROP</button>
</div>


<div class='modal'>

<button class='closeModalButton'></button>
  <form action="/add-note" class='userNotes'>
    
    <h3>Early Stages with ${company}:</h3>
    <br>
    <h2 class='salaryOutput'>Salary: $${salary}</h2><br>
   
    <label>
      <input type="checkbox" class='linkedInConnect' name="linkedInConnect">
      Connected on linkedIn
    </label>

    <br>

     <label>
      <input type="checkbox" class="proactiveAction" id='proactiveAction' name="proactiveAction">
      Inquired proactively
    </label>

    <br>

    <h3>Late Stages:</h3>

    <br>

    <label>
      <input type="checkbox" class="followUp" name="followUp">
      I have followed up
    </label>

    <br>
    <br> 

    <label>
      <input type="checkbox" class="thankYou" name="thankYou">
      Sent a thank you email or letter
    </label>

    <br>
    <br>

  <label> Salary input: 
       <input type="number" class="salary" name="salary">
  </label>

    <button class='saveNotes'>Save Note</button>
  </form>
  </div>

`
}


async function createCard() {

  try {
    const apiUrl = await logoApiCall();
    window.applicationStatus = document.querySelector('select').value;
    const now = dayjs();
    const formattedDate = now.format('MMM D, YYYY');
    const outputCard = document.getElementById('outputCard');
    const info = getInfoForCards();
    const jobId = await writeDB()

    if (document.getElementById("jobTitle").value !== "") {
      info.forEach(async (item) => {
        const card = document.createElement('div');
        const job = item.job;
        const company = item.company;
        card.className = 'card';
        card.setAttribute("value", window.applicationStatus);
        card.dataset.id = jobId;
        card.innerHTML = await createCardHTML(window.applicationStatus, job, company, apiUrl, formattedDate, jobId);
        outputCard.appendChild(card);
        document.getElementById("name").value = "";
        document.getElementById("jobTitle").value = "";
        document.getElementById("company").value = "";
      });
    } else {
      console.log('One or more required input fields are empty.');
    }
   
  return window.applicationStatus;

  } catch (err) {
    console.error('Error in createCard:', err);
  }
}


async function changeJobStatus(e) {
    if (!e.target.matches('.subject')) return;

  const row = e.target.closest('div');

  if (!row) {
    console.warn('No .time container found');
    return;
  }

  const btn = row.querySelector('.appendedButton');

  if (!btn) {
    console.warn('No .appendedButton found in row');
    return;
  }

  const value = e.target.value;
  btn.setAttribute('value', value);
  btn.classList.remove('Applied', 'Interested', 'Closed', 'Interview', 'Rejected', 'Assessment');
  btn.classList.add(value);
  btn.innerText = value;

  const targetedButton = e.target.closest(".subject");
  const id = targetedButton.getAttribute('data-id');

  await axios.patch(`/api/v1/users/${id}`, {
    applicationStatus: e.target.value,
  },
    {
      withCredentials: true
    })
}


function submitForm(e) {

if (!document.getElementById('submitForm')) return

  if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {

     const navigationArea = document.getElementById('navigationArea')

        navigationArea.style.cssText = 'border:2px solid red;'
        setTimeout(() => {
            navigationArea.style.cssText = 'border:1px solid #ccc;'

        }, 3000);

    
  } else {

    e.preventDefault()
    createCard()
    countForMonthInReview()

      const navigationArea = document.getElementById('navigationArea')

        navigationArea.style.cssText = 'border:2px solid green;'
        setTimeout(() => {
            navigationArea.style.cssText = 'border:1px solid #ccc;'

        }, 3000);

  }
}


async function deleteUserEntry(event) {

   if (!event.target.closest) {
    return
  }

  if (event.target.closest(".delete")) {
    event.preventDefault()
    event.target.closest(".delete").innerText = "Confirm deletion?"

    document.addEventListener("click", async (event) => {
      if (event.target.closest(".delete")) {
        const itemToRemove = event.target.closest(".card");
        const targetedButton = event.target.closest(".btn.delete");
        const id = targetedButton.getAttribute('data-id');

        if (itemToRemove) {
          itemToRemove.classList.add("fade-out");
          setTimeout(() => {
            reduceCountForMonthInReview()
            itemToRemove.remove();
          }, 500);
        }

        await axios.delete(`/api/v1/users/${id}`,
          { withCredentials: true }
        )
      }
    }
    )
  }
}


async function countForMonthInReview() {

  if (window.applicationStatus == 'Applied') {
    console.log('reviewed')
    document.getElementById('ap').innerText++
  } else if (window.applicationStatus === 'Interested') {

    document.getElementById('in').innerText++

  } else if (window.applicationStatus === 'Interview') {


    document.getElementById('int').innerText++
  } else if (window.applicationStatus === 'Rejected') {

    document.getElementById('rej').innerText++
  } else {
    return
  }

}
  

function reduceCountForMonthInReview() {

  const applicationStatus = createCard()

  if (applicationStatus == 'Applied') {
    console.log('reviewed')
    document.getElementById('ap').innerText--
  } else if (applicationStatus === 'Interested') {

    document.getElementById('in').innerText--

  } else if (applicationStatus === 'Interview') {


    document.getElementById('int').innerText--
  } else if (applicationStatus === 'Rejected') {

    document.getElementById('rej').innerText--
  } else {
    return
  }
}


function openTheModal(e) {

   const openButton = e.target.closest(".openModalButton");

  if (!openButton) return;

  const innerOutput = openButton.closest(".innerOutput");
  const modal = innerOutput?.nextElementSibling;

  if (!modal || !modal.classList.contains("modal")) return;

  const isActive = modal.classList.contains("active");
  e.preventDefault();

  document.querySelectorAll(".modal.active").forEach(m => m.classList.remove("active"));
  document.querySelectorAll(".openModalButton.active").forEach(b => b.classList.remove("active"));
  document.querySelector('.overlay').style.display = 'none';

  if (!isActive) {
    modal.classList.add("active");
    openButton.classList.add("active");
    document.querySelector('.overlay').style.display = 'block';
  }
}


function closeTheModal(e) {

    if (!document.querySelector('.modal.active')) return
  if (e.target.classList[0] == 'closeModalButton') {
    e.preventDefault()

    document.querySelector('.modal.active').classList.remove('active')
    document.querySelector('.overlay').style.display = 'none'
  }
}


async function saveNotesModal(e) {

   if (!document.querySelector(".modal.active")) return;

  if (e.target.classList.contains("saveNotes")) {
    e.preventDefault();

    const outputCard = e.target.parentElement.parentElement.parentElement.querySelector(".innerOutput");

    if (!outputCard) {
      console.warn("No .outputCard ancestor found");
      return;
    }

    const targetedButton = outputCard.querySelector(".delete");

    if (!targetedButton) {
      console.warn("No .subject found inside .outputCard");
      return;
    }

    const id = targetedButton.getAttribute("data-id");
    const saveNoteButton = e.target.closest('.saveNotes');
    console.log(e.target)
    console.log(e.target.parentElement.closest('salaryOutput'))
    const salaryOutput = e.target.parentElement.querySelector('.salaryOutput');
    saveNoteButton.style.cssText = 'border:solid 1px green;'
    saveNoteButton.innerText = 'Note Saved'

    salaryOutput.innerText = `Salary: $${e.target.parentElement.querySelector(".salary")?.value}`

     setTimeout(() => {
            saveNoteButton.style.cssText = 'border: 1px solid white;'

            saveNoteButton.innerText = 'Save Note'

        }, 3000);

    
    await axios.patch(
      `api/v1/users/modalData/${id}`,
      {
        connectedOnLI: e.target.querySelector(".linkedInConnect")?.value,
        inquire: e.target.querySelector(".proactiveAction")?.value,
        emailFollowUp: e.target.querySelector(".followUp")?.value,
        thankYou: e.target.querySelector(".thankYou")?.value,
        salary: e.target.parentElement.querySelector(".salary")?.value,
      },
      {
        withCredentials: true,
      }
    );
  }
}


async function displayWelcome() {
  try{

    const fetchCurrentUsersName = await axios.get('/api/v1/users/getUsersName', { withCredentials: true })
    const name = fetchCurrentUsersName.data.user.first
    const mainBody = document.getElementById('mainBody')
           
            const para = document.createElement("p")
            para.style.cssText = 'color:black;transition: opacity 250ms ease-in;z-index:50;position:absolute;top:8%;left:45%';
            para.innerText = `Welcome ${name}!`
            mainBody.append(para)
     
            setTimeout(() => {

            para.innerText = ''

        }, 10000);

  }catch (error) {
    console.error('Could not fetch user data:', error);
  }
}


//Loading in the users data

async function initializeDashboard() {
  try {
    const userEntries = await fetchCurrentUser();

    await renderDashboard(userEntries);
  } catch (error) {
    console.error('Could not fetch user data:', error);
    window.location.href = '/loginUser';
  }
}


async function fetchCurrentUser() {
  try {
    const res = await axios.get('/api/v1/users/getUserData', { withCredentials: true });

    // Safety check
    if (res?.data?.entries) {
      return res.data.entries;

    } else {
      console.warn('Unexpected response format:', res.data);
      console.log('Full fetch response:', res);

      return []; // fallback to empty list
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}

async function renderDashboard(entries) {
  console.log('rendering maybe');
  const outputCard = document.getElementById('outputCard'); // container element
  outputCard.innerHTML = ''; // clear existing cards if needed

  for (const entry of entries) {
    const { _id, applicationStatus, job, company, apiUrl, formattedDate, salary } = entry;

    // Await the async function to get the card HTML string
    const cardHTML = await createCardHTML(applicationStatus, job, company, apiUrl, formattedDate, salary, _id);

    // Append the created card HTML to container
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = cardHTML;
    outputCard.appendChild(cardDiv);

    
  }

      const userData = entries
      console.log(entries)
    const statusCounts = {};

    userData.forEach(number => {
      const status = number.applicationStatus;

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      
            
    });

    
        document.getElementById('ap').innerText = Object.values(statusCounts)[0]
        document.getElementById('in').innerText = Object.values(statusCounts)[1]
        document.getElementById('int').innerText = Object.values(statusCounts)[2]
        document.getElementById('rej').innerText = Object.values(statusCounts)[3]

}


//Event Listener Attachments

document.addEventListener('change', changeJobStatus)

document.getElementById('submitForm').addEventListener('click', submitForm)

document.addEventListener("click", deleteUserEntry)

document.addEventListener("click", openTheModal)

document.addEventListener("click", closeTheModal)

document.addEventListener("click", saveNotesModal)

window.addEventListener('DOMContentLoaded', initializeDashboard);

window.addEventListener('DOMContentLoaded', displayWelcome);
