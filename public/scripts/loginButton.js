 import {verify} from './loginUser.js';
 
 
 
 document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('hit first')
    verify()
})