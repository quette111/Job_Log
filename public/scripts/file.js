import { verify } from './loginUser.js';




const call = (r) => {
  return axios.get('/api/config').then(response => response.data)
}

let appendedButton = document.querySelector('.appendedButton');


const fetchUsers = async () => {
  const response = await fetch('/api/v1/users/allUsers')
  const users = await response.json()

  const info = getInfoForCards()
  createCard(users, info)
  return users

}

function getInfoForCards() {


  const info = [
    {
      name: `${document.getElementById("name").value}`,
      job: `${document.getElementById("jobTitle").value}`,
      company: `${document.getElementById("company").value}`
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




async function apiCall() {
  let response = await call()

  const apiKey = response.apiKey

  const info = getInfoForCards()

  try {

    let companyName = info[0].company
    let companyName2 = companyName.replaceAll(' ', '').toLowerCase()
    let apiUrl = `https://img.logo.dev/${companyName2}.com?token=${apiKey}`
    console.log(apiUrl)
    return apiUrl
  } catch (error) {
    if (error) {
      console.error(`Error fetching data:`, error)
    }
  }

}




function confirmCreation() {
  document.getElementById(submitForm).innerText = 'Entry added . . . '
}



async function createCard(users, info) {

  let apiUrl = await apiCall()



  apiCall()
  //writeDB()

 const buttonOption = document.querySelector('select').value

  if (document.querySelector("input").value != "") {

    const now = dayjs()

    const formatted = now.format('MMM D, YYYY <br> h:mm A')
    const outputCard = document.getElementById('outputCard');
    const info = getInfoForCards();
    const jobId = await writeDB()

    info.forEach(item => {

      const users = fetchUsers()
      const card = document.createElement('div');

      card.className = 'card'
      card.setAttribute("value", buttonOption)

      card.innerHTML =
        `
        <div value='${buttonOption}' id="innerOutput">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>

        <h3 id="jobOutput"></h3>
  
              <h3 id="nameOutput">${item.company}</h3>
              <h3 id="companyOutput">${item.job}</h3>
              
              <img src="${apiUrl}" id="companyImage" />
  
              <div class="time">

             
                <button 
                  value="${buttonOption}" 
                  class="appendedButton" 
                  id="${buttonOption}" 
                  
                >
                  ${buttonOption}
                </button>
             
            


           
                <h4></h4>
                <h5 id='dateAndTime'>${formatted}</h5>
              </div>

 <select name="subject" id="subject" class='subject' data-id="${jobId}">
    
      <option value="" selected='${buttonOption}'>Change Status</option>
      <option value="Applied"> Applied</option>
        <option value="Interested">Interested</option>
          <option value="Closed" >Closed</option>
            <option value="Assessment" >Assessment</option>
              <option value="Rejected" >Rejected</option>
                <option value="Interview">Interview</option>
  </select>

              <button class="btn delete" id='deleteButton' data-id="${jobId}">            
                <span class="mdi mdi-delete mdi-24px"></span>
                <span class="mdi mdi-delete-empty mdi-24px"></span>
                <span>Delete</span>
              </button> 
            </div>`

      outputCard.appendChild(card)
      document.getElementById("name").value = "";
      document.getElementById("jobTitle").value = "";
      document.getElementById("company").value = "";
      


    })
  }
  //createEventListener()
  return buttonOption
}


document.addEventListener('change', async function (e) {
  if (!e.target.matches('.subject')) return;

  console.log('Subject changed:', e.target.value);

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








//Putting together element of job card (date, time, etc)
document.querySelector('form').addEventListener('submit', (e) => {

  e.preventDefault()
  e.stopPropagation()

  if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {
    alert('Error: Please enter job title to continue');   /////////better error handling on UI

  } else {

    createCard()
  console.log('create card')
 

    console.log('evemt lostem')
  }
}
)





/*
//unfinished
let dd = document.getElementById('statusbuttons')
dd.addEventListener('click', () => {

  console.log('listening')
  for (let i = 0; i < dd.length; i++) {
    if (currentButton.innerText != dd.childNodes[i].innerText) {
      console.log(currentButton.parentNode)
      currentButton.parentNode.remove()
    }
  }
})
*/








document.addEventListener("click", async (event) => {
  event.preventDefault()
  // const buttonOption = createCard()


  if (event.target.closest(".delete")) {

    console.log("Delete button clicked!");

    event.target.closest(".delete").innerText = "Confirm deletion?"

    const item = localStorage.getItem('Bearer')

    const itemToRemove = event.target.closest(".card"); 
    const targetedButton = event.target.closest(".btn.delete");


console.log(itemToRemove.parentElement.id)
    console.log(`Hello quette . .  .${itemToRemove.parentElement.id}`)
    const id = targetedButton.getAttribute('data-id');
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





//
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
//setTimeout(() => {
  //listenForDelete()

//}, 2000);

})




/*
function listenForDelete(){
  document.getElementById('deleteButton').addEventListener('click',  (e) => {
  e.preventDefault()
  reduceCountForMonthInReview()
})
}
*/

/*document.querySelectorAll('.appendedButton').addEventListener('click', () => {

})
  */


/*
function filtered(e) {

  if (e.currentTarget.style.cssText != 'border:3px solid black' || card.name != e.target.closest(".realG").value) { ///if it doesnt have a border
    e.target.closest(".realG").style.cssText = 'border:1px solid black'
    //for loop may be better?
    document.getElementsByClassName('card').hidden = true

  } else {
    e.currentTarget.style.cssText = 'border:none'
    card.name.hidden = false
  }
}


document.querySelector('.realG').addEventListener('click', (e) => {

  return info.filter(filtered);



})



document.querySelector('.realG').addEventListener('click', (e) => {

return info.filter( item => item.Name === e.target.closest(".realG").value)



})
*//*
document.querySelector('.realG').addEventListener('click', (e) => {
  let find = document.getElementsByClassName('appendedButton').value
  info.forEach((element) => {
    if (element.name === e.target.closest(".realG").value) {

    } else {
      console.log(element)

    }
  })
  //document.getElementsByClassName('appendedButton').value
})
//start of filtering of cards based on buttons

*/


//array would be better
/*document.querySelectorAll('span#statusButtons').addEventListener('click', (e) => {
    if(document.getElementById('innerOutput').value != e.currentTarget.value){
      document.getElementById('innerOutput').remove()
    }

})
*/








