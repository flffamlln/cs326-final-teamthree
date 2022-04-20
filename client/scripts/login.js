// login.addEventListener("click", async() => {
//     const res = await createPost(session_info.user_id, photo, description, tag);
//     if (res === 200) {
//         alert("Post successfully created");
//     } else {
//         alert("There was an error creating your post");
//     }
// });



const login = document.getElementById("login");
const loginForm = document.getElementById("login-form");
const loginErrorMsg = document.getElementById("login-error-msg");

login.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.email.value;
    const password = loginForm.password.value;
})