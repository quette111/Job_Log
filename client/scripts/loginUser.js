import './loginButton.js'
import axios from 'axios';
import './navBar.js';

export async function verify() {
    try {
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        if (!password || !email) {
            const outerForm = document.getElementById('outerForm')
            outerForm.style.cssText = 'border:2px solid red;text-align:center;'
            const para = document.createElement("p")
            para.style.cssText = 'color:red;text-align:center;';
            para.innerText = "Please enter your username and password . . .";
            document.body.appendChild(para)

            setTimeout(() => {
                outerForm.style.cssText = 'border: 1px solid white;'
                para.innerText = ''
            }, 3000);
            return
        }
        const res = await axios.post('/api/v1/login/loginTheUser', {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        },
            { withCredentials: true });

        if (res.data.success) {
            setTimeout(() => {
                window.location.href = '/log';
            }, 300);
        }
    } catch (error) {

        if (error.response.status === 400) {

            const outerForm = document.getElementById('outerForm')
            outerForm.style.cssText = 'border:2px solid red;'
            const para = document.createElement("p")
            para.style.cssText = 'color:red;text-align:center;';
            para.innerText = "Your username or password is incorrect. . .";
            document.body.appendChild(para)

            setTimeout(() => {
                outerForm.style.cssText = 'border: 1px solid white;'
                para.innerText = ''

            }, 3000);
            console.error('No user returned from backend');
        }
    }
}


