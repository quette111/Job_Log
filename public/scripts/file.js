

 const call = (r) => {

  return axios.get('/api/config').then(response => response.data)
  /*
 axios.get('/api/config')
  .then(response => {
console.log('1')
    const apiKey = response.data.apiKey;
    console.log(apiKey)
    return apiKey
  } )

  .catch(error => {
    console.error('Error fetching config:', error)
  });
  
  */
}
//then chaining to fetch API key from env file


let appendedButton = document.querySelector('.appendedButton');


/* let statusChange = appendedButton.addEventListener('mouseenter', (e) => {
   e.currentTarget.append('Change Status?');
 });
*/
















//call to logo.dev to retrieve company logo when user enters name (MOSTLY foolproof)




fetchUsers = async () => {
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

writeDB = async () => {
  const info = getInfoForCards()
console.log(info[0].name)
  const response = await axios.post('/api/v1/users/writeDB', {
    name: info[0].name,
    job: info[0].job,
    company: info[0].company,
  })
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







async function createCard(users, info) {

  let apiUrl = await apiCall()

  apiCall()

    window.buttonOption = document.querySelector('select').value

    if (document.querySelector("input").value != "") {

      const outputCard = document.getElementById('outputCard');
      const info = getInfoForCards();
writeDB()
      info.forEach(item => {

        const users = fetchUsers()
        const card = document.createElement('div');

        card.className = 'card'
        card.setAttribute("value", buttonOption)

        card.innerHTML = 
        `
            <div value='${buttonOption}' id="innerOutput" class='card'>
              <h3 id="jobOutput"></h3>
  
              <h3 id="nameOutput">${item.company}</h3>
              <h3 id="companyOutput">${item.job}</h3>
              
              <img src="${apiUrl}" id="companyImage" />
  
              <div id="time">
                <button 
                  value="${buttonOption}" 
                  class="appendedButton" 
                  id="${buttonOption}" 
                  disabled
                >
                  ${buttonOption}
                </button>

                <h4>FIX DATE</h4>
                <h5>FIX DATE</h5>
              </div>

              <button class="btn delete" data-id="${users._id}">            
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
    return buttonOption
  }




//Putting together element of job card (date, time, etc)
document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault()
    e.stopPropagation()

     if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {
      alert('Error: Please enter job title to continue');   /////////better error handling on UI

  } else {

    createCard()

    }
  }
)




























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





document.addEventListener("click", async (event) => {
  if (event.target.closest(".delete")) {
    console.log("Delete button clicked!");


    const itemToRemove = event.target.closest("#innerOutput");
    const targetedButton = event.target.closest(".btn.delete");
    console.log(targetedButton)
    const id = targetedButton.getAttribute('data-id');
    if (itemToRemove) {
      itemToRemove.classList.add("fade-out");
      setTimeout(() => {
        itemToRemove.remove();
      }, 500);
    }
    console.log('Deleting user with id:', id);
    await fetch(`/api/v1/users/${id}`, {    //fetch the route provided by the backend
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },

    })
  }
});











//



document.getElementById('submitForm').addEventListener('click', async() => {
  console.log('crwairfpijr')
  const buttonOption = await createCard()
console.log(buttonOption)
let start = 0
let start2 = 0
let start3 = 0
let start4 = 0

document.getElementById('ap').innerText = start
  document.getElementById('in').innerText = start2 
  document.getElementById('int').innerText = start3
   document.getElementById('rej').innerText = start4

  if (buttonOption === 'Applied') {
    console.log('reviewed')
    start++
  } else if (buttonOption === 'Interested') {
  
    start2++
  } else if (buttonOption === 'Interview') {
   
    start3++
  } else if (buttonOption === 'Rejected') {
   
    start4++
  } else {
    return
  }
})

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
*/
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




//array would be better
/*document.querySelectorAll('span#statusButtons').addEventListener('click', (e) => {
    if(document.getElementById('innerOutput').value != e.currentTarget.value){
      document.getElementById('innerOutput').remove()
    }

})
*/








