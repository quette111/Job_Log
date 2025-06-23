 import {verify} from './loginUser.js';
import './navBar.js';
 import { checkIfUserIsLoggedIn } from './navBar.js';
 
 document.getElementById('loginButton').addEventListener('click', (e) => {

    if(!document.getElementById('loginButton')) return
    e.preventDefault()
    console.log('hit first')
    verify()
})
