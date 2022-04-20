// used https://dev.to/keshavs759/how-to-make-a-responsive-sign-up-form-in-html-css-with-javascript-password-validation-2k86 for refrence


const username_input = document.getElementById("username");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const confirmPassword_input = document.getElementById("confirmPassword");
const sign_up = document.getElementById("signup");

// The password should contain around 8-15 alhpanumeric characters
const passwordPattern = /^[a-zA-Z0-9]{8,15}$/

password.addEventListener('focusin', () => {
    pwd_format.style.display = 'block';

    // now lets check the password entered by the user
    password.addEventListener('keyup', () => {
        if (passwordPattern.test(password.value)) {
            password.style.borderColor = 'green' // if password pattern matches the border of password input will ne green
            pwd_format.style.color = 'green'
        } else {
            password.style.borderColor = 'red'
            pwd_format.style.color = 'red'
        }
    })
})

confirmPassword.addEventListener('keyup', () => {
    if (password.value !== confirmPassword.value) {
        password.style.backgroundColor = 'red';
        confirmPassword.style.backgroundColor = 'red';
    }
});


sign_up.addEventListener("click", (e) => {
    e.preventDefault();
    const username = username_input.value;
    const email = email_input.value;
    const password = password_input.value;
    const confirmPassword = confirmPassword_input.value;


    const res = await crud.login(username, email, password, confirmPassword);
    if (res === 200) {
        alert("Successfully Signed up");
        location.reload();
    } else {
        alert("There was an error signing you up");
    }
});