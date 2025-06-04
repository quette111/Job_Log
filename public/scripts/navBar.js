const openSidebar = () => {
document.querySelector('.sidebar').style.display = 'flex'

}

document.getElementById('menuButton').addEventListener('click', ()=>{
openSidebar()
})

const closeSideBar = () => {
    document.querySelector('.sidebar').style.display = 'none'
}

document.getElementById('closeMenuButton').addEventListener('click', ()=>{
closeSideBar()
})

const changeDisplayMode = () => {
    //const body 
    if(document.body.className != 'darkmode'){
        document.body.className = 'darkmode'
    } else{
        document.body.className = ''
    }
}

document.getElementById('theme-switch').addEventListener('click', ()=>{
changeDisplayMode()
})

const logButtonSwitch = document.getElementById('loginA')

if(!localStorage.getItem('Bearer')){
    console.log('no token')
}else{
    logButtonSwitch.innerText = 'Logout'
    logButtonSwitch.addEventListener('click', (e)=>{
        e.preventDefault()
        window.href = '/loginUser'
    })
}

