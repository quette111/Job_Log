import axios from 'axios';
import './navBar.js';

async function postData() {

    const username = document.getElementById('username').value
    const lastName = document.getElementById('last').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value



    if (!username || !password || !email || !lastName) {
        const outerForm = document.getElementById('outerForm')
        outerForm.style.cssText = 'border:2px solid red;'
        const para = document.createElement("p")
        para.style.cssText = 'color:red';
        para.innerText = "Please fill out all required fields . . .";
        outerForm.appendChild(para)
        setTimeout(() => {
            outerForm.style.cssText = 'border: 1px solid white;'

            para.innerText = ''

        }, 3000);
    }

    else {
        try {
            await axios.post('/api/v1/login', {
                first: username,
                last: lastName,
                email: email,
                password: password,
            });




            const outerForm = document.getElementById('outerForm')
            outerForm.style.cssText = 'border:2px solid green;'
            const para = document.createElement("p")
            para.style.cssText = 'color:green;transition: opacity 250ms ease-in;';
            para.innerText = "Successfully created an account . . .";
            outerForm.appendChild(para)
            // After login success

            setTimeout(() => {
                window.location.href = '/loginUser'
            }, 300);

        } catch (error) {
            console.error('Error sending frontend data', error)
        }
    }
}

document.getElementById('submit').addEventListener('click', (e) => {

    e.preventDefault()
    postData()

    document.getElementById('username').value = ''
    document.getElementById('password').value = ''

})

