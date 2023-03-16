const emailInput = document.querySelector('#email');
const myForm = document.querySelector('#password-reset');
const msg = document.querySelector('.msg')

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();
    try{
        if(!emailInput.value){
            msg.classList.add('warning');
            msg.textContent = 'Please enter your email'
            setTimeout(() => msg.remove(), 3000);
        }
            const email = {
                email: emailInput.value
            }
            console.log(email)
            const response = await axios.post("34.229.254.109:4000/password/forgotpassword", email)
            if(response.status === 200){
                console.log(response);
                alert("Password Reset link sent. Please check your E-mail.")
                window.location.href= "../Login/login.html"
            }else{
                msg.classList.add('warning');
                msg.textContent = err.response.data.error;
                setTimeout(() => msg.remove(), 3000);
            }

    }catch(err){
        console.log(err)
        msg.classList.add('warning');
        msg.textContent = err.response.data.error;
        setTimeout(() => msg.remove(), 3000);
    }
}