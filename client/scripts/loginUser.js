import './loginButton.js'
import axios from 'axios';
import './navBar.js';
import {createCardHTML} from './file.js'
import { checkIfUserIsLoggedIn } from './navBar.js';

 export async function verify() {

        try {

            console.log('hit function')
        
         const res = await axios.post('/api/v1/login/loginTheUser', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,

           },{withCredentials: true}
            );
console.log(res)
           if(res.data.success) {
        setTimeout(() => {
  window.location.href = '/log';
}, 300);

          console.log('res')

           }
                   if (!res.data.success) {
  console.error('No user returned from backend');
  return;
} 
   
        } catch (error) {
            console.log('Error fetching secret data', error)
            //showLoginError()
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

