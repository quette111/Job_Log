window.addEventListener('load', () => {
document.body.className = localStorage.getItem('mode')
})
console.log(`cookie:${document.cookie}`)

const openSidebar = () => {
    document.querySelector('.sidebar').style.display = 'flex'
}

document.getElementById('menuButton').addEventListener('click', () => {
    openSidebar()
})

const closeSideBar = () => {
    document.querySelector('.sidebar').style.display = 'none'
}

document.getElementById('closeMenuButton').addEventListener('click', () => {
    closeSideBar()
})

const changeDisplayMode = () => {
    //const body 
    if (document.body.className != 'darkmode') {
        document.body.className = 'darkmode'
        localStorage.setItem('mode', 'darkmode')
    } else {
        document.body.className = ''
        localStorage.setItem('mode', '')
    }
}

document.getElementById('theme-switch').addEventListener('click', () => {
    changeDisplayMode()
})


const checkIfUserIsLoggedIn = () => {fetch('/auth/check', { credentials: 'include' })
  .then(res => res.json())
  .then(data => {
    console.log('in there')
       const logButtonSwitch = document.getElementById('loginA');
       if(window.location.href.includes('loginUser') === true) return
    if (data.loggedIn) {
        console.log(data)
        console.log('none')
           logButtonSwitch.innerText = 'Logout';
           return data
    } else {
        console.log('some')
               logButtonSwitch.innerText = 'Login';
               return data
    }
  });

}




document.addEventListener('click', (e) => {
    const data = checkIfUserIsLoggedIn
    const loginBtn = e.target.closest('#loginA');
    if (!loginBtn) return;  // Ignore clicks not on the button

    const btnText = loginBtn.innerText;

    if (btnText === 'Login') {
     data.loggedIn = true
        window.location.href = '/loginUser';
    } else if (btnText === 'Logout') {
        data.loggedIn = false
        btnText === 'Login'
        // Delete cookie by setting expiration in past
        document.cookie = "jid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/';

           const outerForm = document.getElementById('outerForm')
            outerForm.style.cssText = 'border:2px solid green;'
            const para = document.createElement("p")
            para.style.cssText = 'color:green;text-align:center;';
            para.innerText = "Successfully logged out. . .";
            document.body.appendChild(para)

            setTimeout(() => {
                  data.loggedIn = false
        btnText === 'Login'
                outerForm.style.cssText = 'border: 1px solid white;'
                para.innerText = ''

            }, 3000);

    }
});



window.addEventListener('load', checkIfUserIsLoggedIn);
window.addEventListener('DOMContentLoaded', checkIfUserIsLoggedIn);



import axios from 'axios';
import './navBar.js';

async function postData() {

    const username = document.getElementById('username').value
    const lastName = document.getElementById('last').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value


console.log('heelo')
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
function listenForSubmit(){
     let submit = document.getElementById('submit')
if(!submit){return}
submit.addEventListener('click', (e) => {

    e.preventDefault()
    postData()

    document.getElementById('username').value = ''
    document.getElementById('password').value = ''

})
}



window.addEventListener('DOMContentLoaded', listenForSubmit);
