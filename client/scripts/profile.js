import { updateUser, getUserPosts } from './crud.js';

const NUM_INIT_POSTS = 2;
const session_info = {
  user_id: 0,
  profile_picture: "./img/mike.jpg",
};

let num_posts_displayed = 0;

const pfps = document.getElementsByClassName("profile-picture");
Array.from(pfps).forEach(pfp => {
  pfp.src = session_info.profile_picture;
});

const posts_div = document.getElementById("recent-posts");
window.onload = async function () {
  num_posts_displayed = 0;
  const res = await getUserPosts(session_info.user_id, NUM_INIT_POSTS, 0);
  if (res.status === 200 && res.ok) {
    res.posts_arr.forEach(post => {
      renderPost(post);
    });
  } else {
    posts_div.appendChild(document.createElement("p").appendChild(document.createTextNode("There was an error getting the initial posts")));
    posts_div.appendChild(document.createElement("br"));
  }
}



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
back_to_profile_button.addEventListener("click", () => {
  profile_container.style.filter = "";
  profile_container.style.pointerEvents = "";
  edit_profile_overlay.style.visibility = "hidden";
  change_profile_picture_overlay.style.visibility = "hidden";
});



const change_profile_picture_button = document.getElementById("profile-picture-editable");
change_profile_picture_button.addEventListener("click", () => {
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
    document.getElementById("new-profile-picture").value="";

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
  const profile_picture = "some picture";
  const res = await updateUser(session_info.user_id, first_name, last_name, username, email, profile_picture);
  if (res === 200) {
    alert("Profile Successfully Updated");
    location.reload();
  } else {
    alert("There was an error updating your profile");
  }
});

const show_all_posts = document.getElementById("show-all-posts");
show_all_posts.addEventListener("click", async () => {
  // Get 1000 posts (if there are that many), this should be more than enough
  const res = await getUserPosts(session_info.user_id, 1000, num_posts_displayed);
  if (res.status === 200 && res.ok) {
    res.posts_arr.forEach(post => {
      renderPost(post);
    });
  } else {
    alert("There was an error getting more posts");
  }
});




function renderPost(post) {
  const post_container = document.createElement("div");
  post_container.classList.add("col-lg-6");
  post_container.classList.add("pr-lg-1");
  post_container.classList.add("mb-2");
  post_container.classList.add("h-50");
  post_container.classList.add("post-container");
  // post_container.style.marginRight = "5px";

  const post_img = document.createElement("div");
  post_img.style.background = "url(" + post.url + ")";
  post_img.style.backgroundSize = "cover";
  post_img.classList.add("post-img");
  post_img.addEventListener("click", () => {
    console.log("Post Clicked");
  });

  post_container.appendChild(post_img);
  posts_div.appendChild(post_container);

  ++num_posts_displayed;
}