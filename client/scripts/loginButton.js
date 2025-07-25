import { verify } from './loginUser.js';
import './navBar.js';


 if (!document.getElementById('loginButton')){ 
    console.log('returning')}
 else{

 
document.getElementById('loginButton').addEventListener('click', (e) => {

    if (!document.getElementById('loginButton')) return
    e.preventDefault()

    verify()
})
 }