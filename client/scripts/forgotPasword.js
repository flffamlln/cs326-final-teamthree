import * as crud from './crud.js';

const message = document.getElementById("message");

document.getElementById("submit-email").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  if (email === "" || email === null) {
    message.innerHTML = "";
    message.innerHTML = "Please enter your email";
  } else {
    // Not my job lol
    message.innerHTML = "";
    message.innerHTML = "An email has been sent to that address if it exists in our system";
  }
});