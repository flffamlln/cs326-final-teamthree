import * as crud from './crud.js';

const NUM_INIT_POSTS = 4;
const session_info = {
  user_id: 1
};

let path_to_pp = '';

let num_posts_displayed = 0;

window.onload = async function () {
  loadUserInfo();
  loadPostCount();
  loadInitPosts();
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
  document.getElementById("profile-picture-editable") = (await crud.getUserInfo(session_info.user_id)).pp_path;
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
    const uploadRes = await crud.uploadPP(newpp);
    if (!uploadRes.status === 200 || !uploadRes.ok) {
      alert("There was an error uploading your new profile picture");
    } else {
      const newpp_path = (await uploadRes.json()).newpp_path;
      const downloadBlob = await crud.downloadPP(newpp_path);
      const imgURL = URL.createObjectURL(downloadBlob);
      document.getElementById('profile-picture-editable').src = imgURL;
      document.getElementById("bfpp").click();
      path_to_pp = newpp_path;
    }
  }
});

const show_all_posts = document.getElementById("show-all-posts");
show_all_posts.addEventListener("click", async () => {
  // Get 1000 posts (if there are that many), this should be more than enough
  const res = await crud.getUserPosts(session_info.user_id, 1000, num_posts_displayed);
  if (res.status === 200 && res.ok) {
    res.posts_arr.forEach(post => {
      renderPost(post);
    });

    if (res.posts_arr.length > 0) {
      document.getElementById("recent-posts").style.overflowY = "scroll";
    }
  } else {
    alert("There was an error getting more posts");
  }
});




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
  post_img.src = post.url;
  post_img.alt = "Oops, this image couldn't be found";
  post_img.width = 350;
  post_img.addEventListener("click", () => {
    console.log("Post Clicked");
  });

  post_container.appendChild(post_img);
  document.getElementById(`row${Math.floor(num_posts_displayed / 2 + 1)}`).appendChild(post_container);

  ++num_posts_displayed;
}




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
      pfp.src = profile_picture.slice(profile_picture.indexOf('/client'));
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

async function loadInitPosts() {
  num_posts_displayed = 0;
  const res = await crud.getUserPosts(session_info.user_id, NUM_INIT_POSTS, 0);
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