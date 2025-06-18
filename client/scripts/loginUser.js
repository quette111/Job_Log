import './loginButton.js'
import axios from 'axios';
import './navBar.js';
import {createCardHTML} from './file.js'

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
            window.location.href = '/log'
          console.log('res')
         
            if (!user) {
  console.error('No user returned from backend');
  return;
}
            console.log('hello user', user)

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