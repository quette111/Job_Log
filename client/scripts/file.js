//NOTE TO SELF: MODULARIZE CODE, IMPROVE VARIABLE NAMES
import axios from 'axios';
 import './charts.js'
 import './heatmap.js'
import './navBar.js';
import dayjs from 'dayjs';


async function callForKey(){

  try{
      const response =  await axios.get('/api/config', {withCredentials: true})
  return response.data
  }catch(err){

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
  console.log('cookie at write time:', document.cookie);

  console.log('in writeDB');

  const info = getInfoForCards();
  const now = dayjs();
  const formattedDate = now.format('MMM D, YYYY <br> h:mm A');
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

    console.log('end writedb');
    return response.data.task._id;

  } catch (err) {
    console.error('Failed to write DB:', err);
    return null; 
  }
};



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


/*function confirmCreation() {
  document.getElementById(submitForm).innerText = 'Entry added . . . '
}
*/






async function createCardHTML(applicationStatus, job, company, apiUrl, formattedDate, jobId) {   
 console.log('creating function')
 //const jobId = await writeDB()
 console.log('writeDB:', jobId)
/*
 if (!jobId) {
  console.error('Write failed or unauthorized');
  return;
}*/
  return `<div value='${applicationStatus}' class="innerOutput" >

  <h3 class="jobOutput"></h3>

  <h3 class="nameOutput">${company}</h3>
  <h3 class="companyOutput">${job}</h3>

  <img src="${apiUrl}" class="companyImage" />


    <div 
      value="${applicationStatus}" 
       class="${applicationStatus} appendedButton" 
    >
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
    
   
    <label>
     <input type="checkbox" id='linkedInConnect' name="linkedInConnect" value="linkedInConnect">
    Connected on linkedIn
    </label>

    <br>
     <label>
    <input type="checkbox" class="proactiveAction" id='proactiveAction' name="proactiveAction" value="proactiveAction">
    Inquired proactively
    </label>
    <br>

    <h3>Late Stages:</h3>
    <br>

    <label>
    <input type="checkbox" class="followUp" name="followUp" value="followUp">
    I have followed up
    </label>
    <br>
    <br> 
    <label>
    <input type="checkbox" class="thankYou" name="thankYou" value="thankYou">
   Sent a thank you email or letter
    </label>
    <br>
    <br>
  <label>
       <input type="number" class="salary" name="salary">
       Estimated Compensation: 
  </label>
  
  


    <button class='saveNotes' type="submit">Save Note</button>
  </form>
  </div>

`
}


async function createCard() {
  console.log('in createcard function');
  try {
    const apiUrl = await logoApiCall();
    const applicationStatus = document.querySelector('select').value;
    const now = dayjs();
    const formattedDate = now.format('MMM D, YYYY <br> h:mm A');
    const outputCard = document.getElementById('outputCard');
    const info = getInfoForCards();
    const jobId = await writeDB()

    if (document.querySelector("input").value !== "") {
      info.forEach(async (item) => {
        const card = document.createElement('div');
        const job = item.job;
        const company = item.company;
        card.className = 'card';
        card.setAttribute("value", applicationStatus);
        card.dataset.id = jobId;
        card.innerHTML = await createCardHTML(applicationStatus, job, company, apiUrl, formattedDate, jobId);
        outputCard.appendChild(card);

        document.getElementById("name").value = "";
        document.getElementById("jobTitle").value = "";
        document.getElementById("company").value = "";
      });
    } else {
      console.log('One or more required input fields are empty.');
    }

    console.log('end of createCard');
    return applicationStatus;
  } catch (err) {
    console.error('Error in createCard:', err);
  }
}



document.addEventListener('change', async function (e) {
  if (!e.target.matches('.subject')) return;

  console.log('Subject changed:', e.target.value);

  const row = e.target.closest('div');
  console.log(row)
  if (!row) {
    console.warn('No .time container found');
    return;
  }

  const btn = row.querySelector('.appendedButton');
  console.log(`button?`, btn)
  if (!btn) {
    console.warn('No .appendedButton found in row');
    return;
  }
console.log('made it')
  const value = e.target.value;
  btn.setAttribute('value', value);
  btn.classList.remove('Applied', 'Interested', 'Closed', 'Interview', 'Rejected', 'Assessment');

  btn.classList.add(value);
  
  btn.innerText = value;

  const targetedButton = e.target.closest(".subject");
  console.log(targetedButton)

const id = targetedButton.getAttribute('data-id');
console.log(id)
  await axios.patch(`/api/v1/users/${id}`, {
    applicationStatus: e.target.value,
  },
  {
 withCredentials: true 
})

});

document.getElementById('submitForm').addEventListener('click', (e) => {
if(!document.getElementById('submitForm')) return

 if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {
    alert('Error: Please enter job title to continue');  

  } else {
    console.log('working')
  
 e.preventDefault()
   createCard()
  //countForMonthInReview()
  
  }

 
})
/*

document.querySelector('form').addEventListener('submit', (e) => {
  console.log('form submitting in client')
if(!document.querySelector('form')) return



 
})

*/
document.addEventListener("click", async (event) => {

  if(!event.target.closest){
    return
  }


  if (event.target.closest(".delete")) {
  event.preventDefault()
    event.target.closest(".delete").innerText = "Confirm deletion?"

    const itemToRemove = event.target.closest(".card");
    const targetedButton = event.target.closest(".btn.delete");
    const id = targetedButton.getAttribute('data-id');

    console.log(itemToRemove.parentElement.id)
    console.log(`Hello quette . .  .${itemToRemove.parentElement.id}`)

    if (itemToRemove) {
      itemToRemove.classList.add("fade-out");
      setTimeout(() => {
        console.log('removing from the DOM')
        itemToRemove.remove();
      }, 500);
    }
    console.log('Deleting user with id:', id);
    await axios.delete(`/api/v1/users/${id}`,
      
        { withCredentials: true }
      
    )


  }
});

/*
async function countForMonthInReview() {
  console.log('crwairfpijr')
  const applicationStatus = await createCard()

  if (applicationStatus == 'Applied') {
    console.log('reviewed')
    document.getElementById('ap').innerText++
  } else if (applicationStatus === 'Interested') {

    document.getElementById('in').innerText++

  } else if (applicationStatus === 'Interview') {


    document.getElementById('int').innerText++
  } else if (applicationStatus === 'Rejected') {

    document.getElementById('rej').innerText++
  } else {
    return
  }

}
function reduceCountForMonthInReview() {


  console.log('quettedel')
  const applicationStatus = createCard()

  if (applicationStatus == 'Applied') {
    console.log('reviewed')
    document.getElementById('ap').innerText--
  } else if (applicationStatus === 'Interested') {

    document.getElementById('in').innerText++

  } else if (applicationStatus === 'Interview') {


    document.getElementById('int').innerText++
  } else if (applicationStatus === 'Rejected') {

    document.getElementById('rej').innerText++
  } else {
    return
  }
}

*/
document.addEventListener("click", (e) => {

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
});



document.addEventListener("click", (e) => {

if(!document.querySelector('.modal.active')) return
  if(e.target.classList[0] == 'closeModalButton'){
  e.preventDefault()
  console.log('working')
document.querySelector('.modal.active').classList.remove('active')
document.querySelector('.overlay').style.display = 'none'

  }
  
});







async function initializeDashboard() {
  try {
    console.log('initializing maybe')
    
    const userEntries = await fetchCurrentUser();
    console.log('hello init func: ', userEntries)
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
    return []; // also fallback on network/server errors
  }
}



async function renderDashboard(entries) {
  console.log('rendering maybe');
  const outputCard = document.getElementById('outputCard'); // container element
  outputCard.innerHTML = ''; // clear existing cards if needed

  for (const entry of entries) {
    const { _id, applicationStatus, job, company, apiUrl, formattedDate } = entry;

    // Await the async function to get the card HTML string
    const cardHTML = await createCardHTML(applicationStatus, job, company, apiUrl, formattedDate, _id);

    // Append the created card HTML to your container
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.innerHTML = cardHTML;
    outputCard.appendChild(cardDiv);
  }
}

window.addEventListener('DOMContentLoaded', initializeDashboard);

