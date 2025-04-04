//then chaining to fetch API key from env file
fetch('/api/config')
  .then(response => response.json())
  .then(data => {

    window.apiKey = data.apiKey;
  })
  .catch(error => {
    console.error('Error fetching config:', error)
  });

//call to logo.dev to retrieve company logo when user enters name (MOSTLY foolproof)
function apiCall() {

  const headers = {
    'Authorization': `Bearer: ${apiKey}`,
    'Content-Type': 'application/json'
  };

  let companyName = info[0].Company
  let companyName2 = companyName.replaceAll(' ', '').toLowerCase()
  window.apiUrl = `https://img.logo.dev/${companyName2}.com?token=${apiKey}`

  async function getData() {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) {
        throw new Error(`API call not working ${response.statusText}`)
      }
      const data = await response.json();
      console.log('success', data)
    } catch (error) {
      console.log('error cuh:', error)
    }
  }
}

let newInfo = [];
//Putting together element of job card (date, time, etc)
document.querySelector('form').addEventListener('submit', (e) => {
  let d = new Date();
  e.preventDefault()
  e.stopPropagation()

  window.info = [
    {
      Name: `${document.getElementById("name").value}`,
      Job: `${document.getElementById("jobTitle").value}`,
      Company: `${document.getElementById("company").value}`
    }
  ];
  if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {
    alert('Error: Please enter job title to continue');

  } else {


    //Fetching frontend user data to send to backend, data is sent to .json file
    fetch('/api/submit', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)

    })
      .then((response) => response.json())
      .then((data2) => {
        console.log("Response from server:", data2)
      })
      .catch((error) => console.log('Error:', error));

    localStorage.setItem("ggs", info);
    let g = localStorage.getItem("ggs");
    let amPm;
    let hr = d.getHours();
    if (hr > 12) {
      amPm = "PM";
      hr = hr - 12;
    } else {
      amPm = "AM";
      hr = hr;
    }

    e.preventDefault();

    apiCall()

    window.buttonOption = document.querySelector('select').value
    newInfo += info
    //handling user input to be consistently appended to the DOM each time a valid submit is made
    if (document.querySelector("input").value != "") {
      e.preventDefault()
      e.stopPropagation()
      document.getElementById("outputCard").innerHTML += info
        .map(
          item =>
            `
            <div value='${buttonOption}' id="innerOutput">
              <h3 id="jobOutput"></h3>
              
              <h3 id="nameOutput">${item.Company}</h3>
              <h3 id="companyOutput">${item.Job}</h3>
              
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
 
                <h4>${d.getMonth()}/${d.getDate()}/${d.getFullYear()}</h4>
                <h5>${hr}:${d.getMinutes()}${amPm}</h5>
               
              </div>

                     <button class="btn delete">
  <span class="mdi mdi-delete mdi-24px"></span>
  <span class="mdi mdi-delete-empty mdi-24px"></span>
  <span>Delete</span>
</button> 
                  
   
              
            </div>
      


          `
        )
        .join("");
      //getData()
      document.getElementById("name").value = "";
      document.getElementById("jobTitle").value = "";
      document.getElementById("company").value = "";
    }
  }
})

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

///NEED TO FIX EVENT BUBBLING
document.addEventListener("click", (event) => {
  if (event.target.closest(".delete")) {
    console.log("Delete button clicked!");

    // Example: Remove the parent element if needed
    const itemToRemove = event.target.closest("#innerOutput");
    if (itemToRemove) {
      itemToRemove.classList.add("fade-out");
      setTimeout(() => {
        itemToRemove.remove();
      }, 500);
    }
  }
});


let start = 1
let start2 = 1
let start3 = 1
let start4 = 1

document.querySelector('form').addEventListener('submit', () => {

  if (buttonOption === 'Applied') {
    document.getElementById('ap').innerText = start
    start += 1
  } else if (buttonOption === 'Interested') {
    document.getElementById('in').innerText = start2
    start2 += 1
  } else if (buttonOption === 'Interview') {
    document.getElementById('int').innerText = start3
    start3 += 1
  } else if (buttonOption === 'Rejected') {
    document.getElementById('rej').innerText = start4
    start4 += 1
  } else {
    return
  }

})


//array would be better
document.querySelectorAll('span#statusButtons').addEventListener('click', (e) => {
    if(document.getElementById('innerOutput').value != e.currentTarget.value){
      document.getElementById('innerOutput').remove()
    }

})
