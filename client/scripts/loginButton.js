import { verify } from './loginUser.js';
import './navBar.js';

document.getElementById('loginButton').addEventListener('click', (e) => {

    if (!document.getElementById('loginButton')) return
    e.preventDefault()

    verify()
})
