

async function postData() {
    console.log('postData')
    let username = document.getElementById('username').value
    let lastName = document.getElementById('last').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    
    if (!username || !password || !email || !lastName) {

        document.getElementById('outerForm').style.cssText = 'border:2px solid red'
        para = document.createElement("p")
        para.style.cssText = 'color:red';
        para.innerText = "Please enter a username and password . . .";
        document.body.appendChild(para)


    }
    else {
        try {
            window.response = await axios.post('/api/v1/login', {
                first: username,
                last: lastName,
                email: email,
                password: password,
            });
            console.log(response.data);
            document.getElementById('outerForm').style.cssText = 'border:2px solid green;'
            para = document.createElement("p")
            para.style.cssText = 'color:green;transition: opacity 250ms ease-in;';
            para.innerHTML = "Successfully created an account . . .";
            document.body.appendChild(para)
            // After login success
          
            setTimeout(() => {
             window.location.href = '/loginUser'   
            }, 1000);
            
        } catch (error) {
            console.error('Error sending frontend data', error)
        }
    }
}

const form = document.getElementById('form')

document.getElementById('submit').addEventListener('click', (e) => {
console.log('hit')
    e.preventDefault()
    postData()
    console.log('form submitted')
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''

})

