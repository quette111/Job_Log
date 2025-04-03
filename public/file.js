fetch('/api/config')  
  .then(response => response.json())
  .then(data => {

    window.apiKey = data.apiKey;
  })
  .catch(error => {
    console.error('Error fetching config:', error)
  });

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

  let buttonOption = document.querySelector('select').value
  newInfo += info

  if (document.querySelector("input").value != "") {
    document.getElementById("outputCard").innerHTML += info
      .map(
        item =>
          `
            <div id="innerOutput">
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

              <div id="deleteAndEdit">
                <div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="red"
                  >
                    <path 
                      class="delete" 
                      d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                    />
                  </svg>
                </div>
              </div>
            </div>


          `
      )
      .join("");
    //getData()
    document.getElementById("name").value = "";
    document.getElementById("jobTitle").value = "";
    document.getElementById("company").value = "";
  }}
})

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

///NEW DELETE FUNCTION, NEED TO FIX MULT CLICKS FOR ONE DELETE
document.addEventListener("click", (ev) => {
  ev.stopPropagation()
  const deleteButton = document.querySelectorAll(".delete");
  console.log(deleteButton)

  deleteButton.forEach(i => {
    console.log("made it thru 3");

    i.addEventListener('click', (event) => {
      event.stopPropagation()

      i.addEventListener("click", e => {
        e.stopPropagation()
        console.log("made it thru 4");
        e.currentTarget.closest("#innerOutput").classList.add("fade-out");
        setTimeout(() => {
          e.currentTarget.closest("#innerOutput").remove()
        }, 500);
      })
    })
  });
});




/*let start = 0
document.querySelector('form').addEventListener('submit', () => {
   
    console.log('ilds')
    start+=1
  
 document.getElementById('ap').innerHTML = start
  //let selection = document.querySelector('select').value

  
  console.log('wokred')
  
})

let start = 0
let start2 = 0
let start3 = 0
let start4 = 0
*/
document.querySelector('form').addEventListener('submit', () => {


  console.log('clickedreview')


let selection = document.querySelector('select').value
console.log(selection)
  if (selection === 'Applied') {
    console.log('hit1st')
    document.getElementById('ap').innerText = start
    start += 1
  } else if (selection === 'Interested') {
    document.getElementById('in').innerText = start2
    start2 += 1
  } else if (selection === 'Interview') {
    document.getElementById('int').innerText = start3
    start3 += 1
  } else if (selection === 'Rejected') {
    console.log('hit2')
    document.getElementById('rej').innerText = start4
    start4 += 1
  } else {
    return
  }

})
/*let selection = document.querySelector('select').value

//if the inner html of the elemnt equals value of dropdown, start +1
if(selection === 'Applied'){
  document.getElementById('ap').innerText = start
  start += 1
}else if(selection === 'Interested'){
  document.getElementById('in').innerText = start
  start += 1
}else if(selection === 'Interview'){
  document.getElementById('int').innerText = start
  start += 1
}else if(selection === 'Rejected'){
  document.getElementById('rej').innerText = start
  start += 1
}else{
  
}
*/
