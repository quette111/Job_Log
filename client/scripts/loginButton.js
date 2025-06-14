 import {verify} from './loginUser.js';
import './navBar.js';
 
 
 document.getElementById('loginButton').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('hit first')
    verify()
})