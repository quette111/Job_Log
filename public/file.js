function apiCall() {
  let companyName = info[0].Company
  let companyName2 = companyName.replaceAll(' ', '').toLowerCase()
  const apiKey = 'pk_AcKPaEj6R5q_Al3XZu8hCw'
  window.apiUrl = `https://img.logo.dev/${companyName2}.com?token=${apiKey}`


  const headers = {
    'Authorization': `Bearer: ${apiKey}`,
    'Content-Type': 'application/json'
  };

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

      //displayData(data)
    } catch (error) {
      console.log('error cuh:', error)
    }

  }
}


let newInfo = [];

///note to self: this code is all over the place, implementing functionality first for learning purposes
function sendData(e) {
  let d = new Date();

  window.info = [
    {
      Name: `${document.getElementById("name").value}`,
      Job: `${document.getElementById("jobTitle").value}`,
      Company: `${document.getElementById("company").value}`
    }
  ];

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
          <img src='${apiUrl}' id="companyImage"/>
              <div id='time'>
                         

                        <button value='${buttonOption}' class='appendedButton' id='${buttonOption}' disabled>${buttonOption}</button>

                  <h4>${d.getMonth()}/${d.getDate()}/${d.getFullYear()}</h4>
                 
                  <h5>${hr}:${d.getMinutes()}${amPm}</h5>
              </div>
              <div id='deleteAndEdit'>
                  
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path class='delete' d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
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

  }


  //status()
  //g
}



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
      console.lg






      i.addEventListener("click", e => {
        e.stopPropagation()

        console.log("made it thru 4");
        e.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
      })
    })
  });
  let numberOfApps = document.getElementById('numberOfApplications')


  console.log('hi')

});
let start = 0;
let numberOfApps = document.getElementById('numberOfApplications')
document.getElementById('submitForm').addEventListener('click', (event) => {
  event.stopPropagation(); // Prevents the event from bubbling up the DOM tree

  if (document.getElementById('jobTitle').value == '' || document.getElementById('company').value == '') {
    alert('Error: Please enter job title to continue');
  } else {
    start += 1;
    console.log('hi');
    numberOfApps.innerText = ` ${start}`;
  }
});





