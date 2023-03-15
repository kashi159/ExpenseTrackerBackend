const myForm = document.querySelector('.login-form');
const msg = document.querySelector('.msg')
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const forgotPassword = document.getElementById('forgot-password');
let userId;

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();
    try{
            const user = {
                email: emailInput.value,
                password: passwordInput.value
            }
            const response = await axios.post('100.27.0.10:4000/user/login', user)
            // console.log(response.data)
            if(response.status === 200){
                localStorage.setItem('token', response.data.token)
                alert('Login Success!!!')
                window.location.href = "../ExpenseTracker/index.html"
            }else{
                throw new Error('Failed to login')
            }
        }catch(err) {
        console.log(err)
        msg.classList.add('warning');
        msg.textContent = err.response.data.error;
        setTimeout(() => msg.remove(), 3000);
    } 
}

forgotPassword.addEventListener('click', reset)

function reset(e){
    window.location.href =  "../PasswordReset/forgetPassword.html"
}

