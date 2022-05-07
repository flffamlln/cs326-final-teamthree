import * as crud from './crud.js';

const message = document.getElementById("message");

document.getElementById("submit-email").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  console.log(email);
  if (email === "" || email === null) {
    message.innerHTML = "";
    message.innerHTML = "Please enter your email";
  } else {
    const count = await crud.forgotPassword(email);
    console.log(count);
    if (count === 1) {
      message.innerHTML = "";
      message.innerHTML = "An email has been sent to that address if it exists in our system";
    }
  }
});