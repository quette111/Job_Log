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
    } else {
        document.body.className = ''
    }
}

document.getElementById('theme-switch').addEventListener('click', () => {
    changeDisplayMode()
})

function checkIfUserIsLoggedIn() {
    const logButtonSwitch = document.getElementById('loginA');
    if (!logButtonSwitch) return;

    if (document.cookie && document.cookie.length > 0) {
        console.log('logoutCook');
        logButtonSwitch.innerText = 'Logout';
    } else {
        console.log('loginCook');
        logButtonSwitch.innerText = 'Login';
    }
}

// Listen for clicks anywhere on the document
document.addEventListener('click', (e) => {
    const loginBtn = e.target.closest('#loginA');
    if (!loginBtn) return;  // Ignore clicks not on the button

    const btnText = loginBtn.innerText;

    if (btnText === 'Login') {
        console.log('login display');
        window.location.href = '/loginUser';
    } else if (btnText === 'Logout') {
        console.log('logout display');
        // Delete cookie by setting expiration in past
        document.cookie = "yourCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/';
    }
});

// Run check on page load
window.addEventListener('load', checkIfUserIsLoggedIn);
window.addEventListener('DOMContentLoaded', checkIfUserIsLoggedIn);




