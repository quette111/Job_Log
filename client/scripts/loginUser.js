import './loginButton.js'
import axios from 'axios';
import './navBar.js';

 export async function verify() {
   /* if (!response) {
        let unauthText = document.createElement("p")
        unauthText.style.cssText = 'color:red';
        unauthText.innerText = "You are not authorized . . .";
        document.getElementById('verificationBlock').appendChild(unauthText)

    }
           
    else {  */
    
   
 
        try {

            console.log('hit function')
            /*const token = localStorage.getItem('token');

            const respond = await axios.get('/api/v1/landing', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })*/
         const res = await axios.post('/api/v1/login/loginTheUser', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
           })

           
            localStorage.setItem('Bearer', res.data.token);
   

            window.location.href = '/log'   
    
   
           
        } catch (error) {
            console.log('Error fetching secret data', error)
        }
    }
//}


 

 






/*

function showLogin() {
    document.getElementById('hideLog').hidden = false
    document.getElementById('hideLog').cssText =  ' animation: fadeInAnimation ease 3s; animation-iteration-count: 1; animation-fill-mode: forwards;'
}

document.getElementById('signUp').addEventListener('click', () => {
    showLogin()
})*/