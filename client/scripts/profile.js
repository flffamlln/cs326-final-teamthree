import * as crud from './crud.js';

const session_info = {
  user_id: 1
};

let path_to_pp = '';

let num_posts_displayed = 0;

window.onload = async function () {
  loadUserInfo();
  loadPostCount();
  loadPosts();
  await new Promise(r => setTimeout(r, 100));
  resizeElements();
}

window.addEventListener("resize", () => {
  resizeElements();
});

function resizeElements() {
  const pch = document.getElementById("profile-container").getBoundingClientRect().height;
  const d1h = document.getElementById("d1").getBoundingClientRect().height;
  const d2h = document.getElementById("d2").getBoundingClientRect().height;
  const d3h = pch - (d1h + d2h);
  document.getElementById("d3").style.height = `${d3h}px`;

  const d4h = document.getElementById("d4").getBoundingClientRect().height;
  const rph = d3h - d4h - 20;
  document.getElementById("recent-posts").style.height = `${rph}px`;
}

const posts_div = document.getElementById("recent-posts");
const change_profile_picture_overlay = document.getElementById("change-profile-picture-overlay");
const change_password_overlay = document.getElementById("change-password-overlay");
const edit_profile_overlay = document.getElementById("edit-profile-overlay");
const profile_container = document.getElementById("profile-container");

const edit_profile_button = document.getElementById("edit-profile-button");
edit_profile_button.addEventListener("click", () => {
  profile_container.style.filter = "blur(8px)";
  profile_container.style.pointerEvents = "none";
  edit_profile_overlay.style.visibility = "visible";
});

const back_to_profile_button = document.getElementById("back-to-profile-button");
back_to_profile_button.addEventListener("click", async () => {
  profile_container.style.filter = "";
  profile_container.style.pointerEvents = "";
  edit_profile_overlay.style.visibility = "hidden";
  change_profile_picture_overlay.style.visibility = "hidden";
  document.getElementById("profile-picture-editable").src = (await crud.getUserInfo(session_info.user_id)).pp_path;
});

const profile_picture_editable = document.getElementById("profile-picture-editable");
profile_picture_editable.addEventListener("click", () => {
  edit_profile_overlay.style.visibility = "hidden";
  change_profile_picture_overlay.style.visibility = "visible";
});

const change_password_button = document.getElementById("change-password-button");
change_password_button.addEventListener("click", () => {
  edit_profile_overlay.style.visibility = "hidden";
  change_password_overlay.style.visibility = "visible";
});

const back_to_edit_buttons = document.getElementsByClassName("back-to-edit-profile-button");
Array.from(back_to_edit_buttons).forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("current-password").value="";
    document.getElementById("new-password").value="";
    document.getElementById("password-change-message").innerHTML="";
    
    edit_profile_overlay.style.visibility = "visible";
    change_password_overlay.style.visibility = "hidden";
    change_profile_picture_overlay.style.visibility = "hidden";
  });
});


const save_profile = document.getElementById("save-profile-button");
save_profile.addEventListener("click", async () => {
  // To be dynamically updated later after login and sessions are created
  const first_name      = document.getElementById("first-name").value;
  const last_name       = document.getElementById("last-name").value;
  const username        = document.getElementById("username").value;
  const email           = document.getElementById("email").value;
  const profile_picture = path_to_pp;
  const res = await crud.updateUser(session_info.user_id, first_name, last_name, username, email, profile_picture);
  if (res === 200) {
    alert("Profile Successfully Updated");
    location.reload();
  } else {
    alert("There was an error updating your profile");
    location.reload();
  }
});

const upload_profile_picture = document.getElementById("save-profile-picture-button");
upload_profile_picture.addEventListener("click", async () => {
  const newpp = document.getElementById("newpp").files[0];
  if (newpp) {
    const upload_res = await crud.uploadPP(newpp);
    if (!upload_res.status === 200 || !uploadRes.ok) {
      alert("There was an error uploading your new profile picture");
    } else {
      const newpp_path = (await upload_res.json()).newpp_path;
      const downloadBlob = await crud.downloadPP(newpp_path);
      const imgURL = URL.createObjectURL(downloadBlob);
      document.getElementById('profile-picture-editable').src = imgURL;
      document.getElementById("bfpp").click();
      path_to_pp = newpp_path.slice(newpp_path.indexOf('/2'));
    }
  }
});

const change_password = document.getElementById("save-password-change-button");
change_password.addEventListener("click", async () => {
  document.getElementById("password-change-message").innerHTML = "";
  document.getElementById("password-change-message").style.color = "";
  const current_password = document.getElementById("current-password");
  const new_password = document.getElementById("new-password");

  // I know this is very weak but it's not really a priority and I don't feel like using regex
  if (new_password.value.length < 8 || new_password.value.length > 32) {
    document.getElementById("password-change-message").innerHTML = "Your new password should be between 8 and 32 characters";
    document.getElementById("password-change-message").style.color = "red";
  } else {
    const update_res = await crud.updatePassword(session_info.user_id, current_password.value, new_password.value);
    if (update_res.status === 200 && update_res.ok) {
      document.getElementById("password-change-message").innerHTML = "Password successfully updated";
      document.getElementById("password-change-message").style.color = "green";
      current_password.value = "";
      new_password.value = "";
    } else if (update_res.status === 406) {
      document.getElementById("password-change-message").innerHTML = "Incorrect password";
      document.getElementById("password-change-message").style.color = "red";
      current_password.value = "";
      new_password.value = "";
    } else {
      document.getElementById("password-change-message").innerHTML = "There was an error changing your password";
      document.getElementById("password-change-message").style.color = "red";
      current_password.value = "";
      new_password.value = "";
    }
  }
});

async function loadUserInfo() {
  const user_info = await crud.getUserInfo(session_info.user_id);
  const first_name      = user_info.first_name;
  const last_name       = user_info.last_name;
  const username        = user_info.username;
  const email           = user_info.email;
  const profile_picture = user_info.pp_path;

  const first_names = document.getElementsByClassName("display-first-name");
  Array.from(first_names).forEach(node => {
    node.value = first_name;
  });

  const last_names = document.getElementsByClassName("display-last-name");
  Array.from(last_names).forEach(node => {
    node.value = last_name;
  });

  const full_names = document.getElementsByClassName("display-full-name");
  Array.from(full_names).forEach(node => {
    node.innerHTML = first_name + " " + last_name;
  });

  const usernames = document.getElementsByClassName("display-username");
  Array.from(usernames).forEach(node => {
    if (node.tagName === "INPUT") {
      node.value = username;
    } else {
      node.innerHTML = username;
    }
  });

  const emails = document.getElementsByClassName("display-email");
  Array.from(emails).forEach(node => {
    if (node.tagName === "INPUT") {
      node.value = email;
    } else {
      node.innerHTML = email;;
    }
  });

  const pfps = document.getElementsByClassName("profile-picture");
  Array.from(pfps).forEach(pfp => {
    if (profile_picture) {
      pfp.src = '/client/img/profile_pictures' + profile_picture;
      pfp.onerror = function () {
        this.onerror = null;
        this.src='/client/img/profile_pictures/default.jpg';
      };
    } else {
      pfp.src = '/client/img/profile_pictures/default.jpg';
    }
  });
}

async function loadPostCount() {
  const num_posts = await crud.getUserPostCount(session_info.user_id);
  const num_posts_text = document.getElementById("num-posts");
  if (num_posts.status === 200 && num_posts.ok) {
    num_posts_text.innerHTML = '';
    num_posts_text.appendChild(document.createTextNode(num_posts.post_count));
  } else {
    num_posts_text.innerHTML = '';
    num_posts_text.appendTextNode("error");
  }
}

async function loadPosts() {
  num_posts_displayed = 0;
  const res = await crud.getUserPosts(session_info.user_id);
  if (res.status === 200 && res.ok) {
    if (res.posts_arr.length === 0) {
      const div = document.createElement("div");
      div.classList.add("w-100");
      div.classList.add("mt-5");
      div.classList.add("text-center");
      div.appendChild(document.createTextNode("You don't have any posts!"));
      posts_div.appendChild(div);
    } else {
      res.posts_arr.forEach(post => {
        renderPost(post);
      });
    }
  } else {
    posts_div.appendChild(document.createElement("p").appendChild(document.createTextNode("There was an error getting the initial posts")));
    posts_div.appendChild(document.createElement("br"));
  }
}


function renderPost(post) {
  if (num_posts_displayed % 2 === 0) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.id = `row${num_posts_displayed / 2 + 1}`;
    posts_div.appendChild(row);
  }

  const post_container = document.createElement("div");
  post_container.classList.add("col-lg-6");
  post_container.classList.add("my-2");
  post_container.classList.add("post-container");

  const post_img = document.createElement("img");
  post_img.classList.add("img-fluid");
  post_img.classList.add("rounded");
  post_img.classList.add("shadow-sm");
  post_img.classList.add("pointer");
  post_img.src = '/client/img/posts' + post.picture_path;
  post_img.alt = "Oops, this image couldn't be found";
  post_img.width = 375;
  post_img.addEventListener("click", async () => {
    const post_display = await crud.getPost(post.post_id);
    console.log(post_display);
  });

  post_container.appendChild(post_img);
  document.getElementById(`row${Math.floor(num_posts_displayed / 2 + 1)}`).appendChild(post_container);

  ++num_posts_displayed;
}