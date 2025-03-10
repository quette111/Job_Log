///note to self: struggling with implementing forEach() and localStorage no idea why, will keep at it 2moro
function sendData(e){

let d = new Date();

let info = [
    {
        "Name": `${document.getElementById('name').value}`,
        "Job": `${document.getElementById('jobTitle').value}`,
        "Company": `${document.getElementById('company').value}`
    }
]
localStorage.setItem('ggs', info)
let g = localStorage.getItem('ggs')
let amPm 
let hr = d.getHours();
    if(hr > 12){
        amPm = "PM"
        hr = hr - 12
    }else{
        amPm = "AM"
        hr = hr
    }


    e.preventDefault();
   if(document.querySelector('input').value != ''){
    document.getElementById('outputCard').innerHTML += info.map((item) =>    


`
    <div id="innerOutput">
        <h3 id="nameOutput">${item.Name}</h3>
        <h3 id="jobOutput">${item.Job}</h3>
        <h3 id="companyOutput">${item.Company}</h3>
        <img id="companyImage">
            <div id='time'>
                <h4>${d.getMonth()}/${d.getDate()}/${d.getFullYear()}</h4>
               
                <h5>${hr}:${d.getMinutes()}${amPm}</h5>
            </div>
            <div id='deleteAndEdit'>
                
                <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                <div class='btn'>
                <svg class='btn' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </div>
            </div>
    </div>`).join("");
    document.getElementById('name').value = ''
    document.getElementById('jobTitle').value = ''
    document.getElementById('company').value = ''

}};

//function deleto(){
 //   document.querySelector('h2').parentNode.remove()
//};

/*
document.getElementById("submitForm").addEventListener("click", ()=>{

setTimeout(() => {

document.getElementById('deletee').addEventListener("click", (e)=> {
    
    
     
 e.currentTarget.parentNode.parentNode.remove();
  },300)     
})

}, true)
*/

const button = document.querySelectorAll('.btn');

document.querySelectorAll("submit").addEventListener("click", ()=>{

    setTimeout(() => {
    button.forEach(function(i){
    i.addEventListener("click", (e)=> {
        
        
         
     e.currentTarget.parentNode.parentNode.remove();
    })  },300)     
    })
    
    }, true)