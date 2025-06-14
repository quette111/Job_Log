//NOTE TO SELF: MODULARIZE CODE, IMPROVE VARIABLE NAMES
import axios from 'axios';
 import './charts.js'
 import './heatmap.js'
import './navBar.js';
import dayjs from 'dayjs';

const callForKey = (r) => {
  return axios.get('/api/config').then(response => response.data)
}


function getInfoForCards() {
  const name = document.getElementById("name").value
  const job = document.getElementById("jobTitle").value
  const company = document.getElementById("company").value

  const info = [
    {
      name: `${name}`,
      job: `${job}`,
      company: `${company}`
    }
  ]

  return info

}


const writeDB = async () => {

  const info = getInfoForCards()
  const item = localStorage.getItem('Bearer')

  const response = await axios.post(
    '/api/v1/users/writeDB',
    {
      name: info[0].name,
      job: info[0].job,
      company: info[0].company,
    },
    {
      headers: {
        'Authorization': `Bearer ${item}`
      }
    })
    .then(response => {

      return response.data.task._id

    })

  return response

}


async function logoApiCall() {

  const response = await callForKey()
  const apiKey = response.apiKey
  const info = getInfoForCards()
  const companyName = info[0].company
  const companyName2 = companyName.replaceAll(' ', '').toLowerCase()

  try {

    const apiUrl = await `https://img.logo.dev/${companyName2}.com?token=${apiKey}`
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


function createCardHTML(item, apiUrl, jobId, buttonOption, formattedDate) {

  return `<div value='${buttonOption}' class="innerOutput">

  <h3 class="jobOutput"></h3>

  <h3 class="nameOutput">${item.company}</h3>
  <h3 class="companyOutput">${item.job}</h3>

  <img src="${apiUrl}" class="companyImage" />


    <div 
      value="${buttonOption}" 
      class="appendedButton ${buttonOption} " 
      
    >
      ${buttonOption}
    </div>


    <h5 class='dateAndTime'>${formattedDate}</h5>
 

  <select name="subject" class='subject' data-id="${jobId}">
    <option value="" selected='${buttonOption}'>Change Status</option>
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
    
    <h3>Early Stages with ${item.company}:</h3>
    <br>
    
   
    <label for="linkedInConnect">
     <input type="checkbox" id='linkedInConnect' name="linkedInConnect" value="linkedInConnect">
    Connected on linkedIn
    </label>

    <br>
    <input type="checkbox" class="proactiveAction" id='proactiveAction' name="proactiveAction" value="proactiveAction">
    <label for="proactiveAction">Inquired proactively</label>
    <br>

    <h3>Late Stages:</h3>
    <br>
    <input type="checkbox" class="followUp" name="followUp" id='followUp' value="followUp">
    <label for="followUp">I have followed up</label>
    <br>
    <br>
    <input type="checkbox" class="thankYou" id='thankYou' name="thankYou" value="thankYou">
    <label for="thankYou">Sent a thank you email or letter</label>
    <br>
    <br>
  <label for="salary">Estimated Compensation: </label>
       <input type="number" class="salary" id='salary' name="salary">
  


    <button class='saveNotes' type="submit">Save Note</button>
  </form>
  </div>
</div>
`
}


async function createCard() {

  const apiUrl = await logoApiCall()
  const buttonOption = document.querySelector('select').value
  const now = dayjs()
  const formattedDate = now.format('MMM D, YYYY <br> h:mm A')
  const outputCard = document.getElementById('outputCard');
  const info = getInfoForCards();
  const jobId = await writeDB()

  if (document.querySelector("input").value != "") {

    info.forEach(item => {

      const card = document.createElement('div');
      card.className = 'card'
      card.setAttribute("value", buttonOption)
      card.innerHTML = createCardHTML(item, apiUrl, jobId, buttonOption, formattedDate)
      outputCard.appendChild(card)

      document.getElementById("name").value = "";
      document.getElementById("jobTitle").value = "";
      document.getElementById("company").value = "";
    })
  }
  return buttonOption
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
  btn.setAttribute('id', value);
  btn.innerText = value;

  const targetedButton = e.target.closest(".subject");
  console.log(targetedButton)

const id = targetedButton.getAttribute('data-id');
console.log(id)
 const item = localStorage.getItem('Bearer')
  await axios.patch(`/api/v1/users/${id}`, {
    name: e.target.value,
  },
  {
 headers: {
          'Authorization': `Bearer ${item}`
        }
})

});


document.querySelector('form').addEventListener('submit', (e) => {

  e.preventDefault()
  e.stopPropagation()

  if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {
    alert('Error: Please enter job title to continue');  

  } else {
    createCard()
  }
})


document.addEventListener("click", async (event) => {
  event.preventDefault()

  if (event.target.closest(".delete")) {

    event.target.closest(".delete").innerText = "Confirm deletion?"

    const item = localStorage.getItem('Bearer')
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
      {
        headers: {
          'Authorization': `Bearer ${item}`
        }
      }
    )


  }
});

async function countForMonthInReview() {
  console.log('crwairfpijr')
  const buttonOption = await createCard()

  if (buttonOption == 'Applied') {
    console.log('reviewed')
    document.getElementById('ap').innerText++
  } else if (buttonOption === 'Interested') {

    document.getElementById('in').innerText++

  } else if (buttonOption === 'Interview') {


    document.getElementById('int').innerText++
  } else if (buttonOption === 'Rejected') {

    document.getElementById('rej').innerText++
  } else {
    return
  }

}
function reduceCountForMonthInReview() {


  console.log('quettedel')
  const buttonOption = createCard()

  if (buttonOption == 'Applied') {
    console.log('reviewed')
    document.getElementById('ap').innerText--
  } else if (buttonOption === 'Interested') {

    document.getElementById('in').innerText++

  } else if (buttonOption === 'Interview') {


    document.getElementById('int').innerText++
  } else if (buttonOption === 'Rejected') {

    document.getElementById('rej').innerText++
  } else {
    return
  }
}

document.getElementById('submitForm').addEventListener('click', (e) => {

  e.preventDefault()
  countForMonthInReview()
})

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

console.log('modalActive')
console.log(e.target)
console.log(e.target.classList[0])
  if(e.target.classList[0] == 'closeModalButton'){
  e.preventDefault()
  console.log('working')
document.querySelector('.modal.active').classList.remove('active')
document.querySelector('.overlay').style.display = 'none'

  }
  
});









