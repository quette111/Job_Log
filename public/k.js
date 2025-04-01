function sendData(e) {
    let d = new Date();
  e.preventDefault()
  e.stopPropagation();
  
    window.info = [
      {
        Name: `${document.getElementById("name").value}`,
        Job: `${document.getElementById("jobTitle").value}`,
        Company: `${document.getElementById("company").value}`
      }
    ];
  
    fetch('/api/submit', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(info)
    
    })
    .then((response) => response.json())
    .then((data2) => {
      console.log("Response from server:", data2)
    })
  
      
  .then(() => {
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
  
  
  
    apiCall()
  })
  .then(() => { 
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
      }
    })
  
  .then(() => {
      document.getElementById("name").value = "";
      document.getElementById("jobTitle").value = "";
      document.getElementById("company").value = "";
     }) 
      .catch((error) => console.log('Error:', error));
    }
  
  
  
  
  
  