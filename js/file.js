function apiCall(){
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
dd.addEventListener('click', ()=> {
  console.log('listening')
for(let i = 0; i < dd.length; i++){ 
  if( currentButton.innerText   != dd.childNodes[i].innerText){
    console.log(currentButton.parentNode)
    currentButton.parentNode.remove()
  }
}
})


//////////////////////////////does not work as intended yet



////////////////???API CALL API CALL/////////////////////
/*let companyName = info[0].Company
    let companyName2 = companyName.replaceAll(' ', '').toLowerCase()    
   const apiKey = 'pk_AcKPaEj6R5q_Al3XZu8hCw' 
    const  apiUrl = `https://img.logo.dev/${companyName2}.com?token=${apiKey}`
  

const headers = {
  'Authorization': `Bearer: ${apiKey}`,
  'Content-Type': 'application/json'
};

 async function getData(){
     try{
         const response = await fetch(apiUrl, {
           method: 'GET',
           headers: headers
         
     });
     if(!response.ok){
       throw new Error(`API call not working ${response.statusText}`)
    }
     const data = await response.json();
     console.log('success', data)
     //displayData(data)
 }catch(error){
   console.log('error cuh:', error)
 }
document.getElementById('companyImage').src = apiUrl
 }
 console.log(companyName)
  
 */

/*
/////////EDIT
document.querySelector(".submit").addEventListener(
    "click",
    () => {
      console.log("made it thru first");
      setTimeout(() => {
        console.log("made it thru 2");
  
        const editButton = document.querySelectorAll(".edit")[0];
        const editButtonArray = Array.isArray(editButton) ? editButton : [editButton];
          
        editButtonArray.forEach(function (i) {
          console.log("made it thru 3");
          console.log(editButtonArray);
     
  console.log(editButtonArray[0])
  
          
          i.addEventListener("click", () => {
            console.log("made it thru 4");
           document.getElementById("nameOutput").innerHTML = document.getElementById('searchBar').value ;
          });
        }, 500);
      });
    },
    true
  );
*/







///////////buggyyyyy
/*
document.addEventListener("click", (event) => {
event.stopPropagation()
  console.log('editing?')
  const editButton = document.querySelectorAll(".edit");
  editButton.forEach(i => {
    
    i.addEventListener('click', e => {

e.stopPropagation()
      e.currentTarget.style.cssText = 'backdrop-filter: blur(5px);-webkit-backdrop-filter: blur(5px);'
document.body.style.cssText = 'background: rgba(255, 255, 255, 0.2);'
      let selectedCard = e.currentTarget.parentNode.parentNode.parentNode



      const sp1 = document.createElement('h3')

      sp1.id = 'newSpan';

      let searValue = document.getElementById('searchBar').value


      const sp1_content = document.createTextNode(searValue)

      sp1.appendChild(sp1_content);

      let sp2 = document.getElementById('nameOutput')
      let ow = document.getElementById('innerOutput');
      let parentDiv = e.currentTarget.parentNode.parentNode.parentNode

      parentDiv.replaceChild(sp1, sp2);

      //e.currentTarget.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerHTML.appendChild(newContent)

    })
   

  })

})

*/
 
 /* minimize.forEach(i => {
    i.addEventListener("click", e => {
console.log('work nigga')

      e.stopPropagation()
     
      e.currentTarget.parentNode.remove()
  })
      */


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



/////OLD DELETE  FUNCTION
/*
 document.querySelector(".submit").addEventListener(
   "click",
   () => {
     console.log("made it thru first");
     setTimeout(() => {
       console.log("made it thru 2");
 
       const deleteButton = document.querySelectorAll(".delete")[0];
       const deleteButtonArray = Array.isArray(deleteButton) ? deleteButton : [deleteButton];
         
       deleteButtonArray.forEach(function (i) {
         console.log("made it thru 3");
         console.log(deleteButtonArray);
    
 console.log(deleteButtonArray[0])
 console.log(deleteButtonArray)
         
         i.addEventListener("click", e => {
           console.log("made it thru 4");
           e.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
         });
       }, 500);
     });
   },
   true
 );








 
 /*document.querySelector(".submit").addEventListener("click", () => {
    
        
 
         
     
 })
 
  setTimeout(()=> {
  const editButton = document.querySelectorAll(".edit");
         const editButtonArray = Array.isArray(editButton) ? editButton : [editButton];    
 editButtonArray.addEventListener("click", () => {
             document.getElementById("outputCard").innerHTML = document.getElementById('searchBar').value 
         })
     }, 5000)
 /*
 const button = document.querySelectorAll(".btn");
 const buttonArray = Array.isArray(button) ? button : [button];
 
 document.querySelector(".submit").addEventListener(
   "click",
   () => {
       console.log("made it thru first")
     setTimeout(() => {
         console.log("made it thru 2")
 
       buttonArray.forEach(handleClick)
       }, 300);
 
   },
   true
 );
 
 
 const handleClick = (e) => {
 e.currentTarget.parentNode.parentNode.remove();
 buttonArray.addEventListener("click", handleClick); 
 }
 
 
 
 */