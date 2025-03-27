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









  if (document.querySelector("input").value != "") {
    document.getElementById("outputCard").innerHTML += info
      .map(
        item =>
          `
      <div id="innerOutput">
      <div id='minimize'>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-120v-120H120v-80h200v200h-80Zm400 0v-200h200v80H720v120h-80ZM120-640v-80h120v-120h80v200H120Zm520 0v-200h80v120h120v80H640Z"/></svg>
         </div> 
      <h3 id="jobOutput"></h3>
          <h3 id="nameOutput">${item.Company}</h3>
          <h3 id="companyOutput">${item.Job}</h3>
          <img src='${apiUrl}' id="companyImage"/>
              <div id='time'>
                  <h4>${d.getMonth()}/${d.getDate()}/${d.getFullYear()}</h4>
                 
                  <h5>${hr}:${d.getMinutes()}${amPm}</h5>
              </div>
              <div id='deleteAndEdit'>
                  
                  <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path class='edit' d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
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
  //getData()

}

///minimize function


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

document.addEventListener("click", (event) => {
event.stopPropagation()
  console.log('editing?')
  const editButton = document.querySelectorAll(".edit");
  editButton.forEach(i => {
    
    i.addEventListener('click', e => {

e.stopPropagation()
      document.body.style.cssText = 'background-color: rgba(0, 0, 0, 0.219);';
      let selectedCard = e.currentTarget.parentNode.parentNode.parentNode
      selectedCard.style.cssText = 'scale: 1.5;opacity: 2.5;z-index:500'
      e.currentTarget.document.getElementById('nameOutput') = 'margin-top: 200;'



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

function min() {
  console.log('minimize click')
  const minimize = document.getElementById('minimize');
  minimize.forEach(i => {
    i.addEventListener("click", e => {
      e.stopPropagation()
      document.body.style.cssText = 'background-color: rgba(0, 0, 0, 0);';

      e.currentTarget.parentNode.style.cssText = 'scale: 1;opacity: 1;z-index:0'
    })
  })
}


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
numberOfApps.innerText = `${start}`
});








let sel = document.querySelector('select')


sel.addEventListener("change", (event) => {
  event.stopPropagation(); 

  console.log(`changed selection to: ${sel}`)

  let selectedIndexx = sel.selectedIndex
  let text = sel.options[sel.selectedIndexx].value
  console.log(text)
  let clonee = document.getElementById(text.value)
  let cl = clonee.cloneNode(true)
  document.getElementById('jobOutput').append(cl)

})

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