import { createPost } from './crud.js';

const session_info = {
    user_id: 1
};

let submit = document.getElementById("submit");

submit.addEventListener("click", async () => {
  const photo           = document.getElementById("formFileLg").value;
  const description       = document.getElementById("photoDescription").value;
  const tag        = document.getElementById("tag").value;
  const res = await createPost(session_info.user_id, photo, description, tag);
  console.log(res);
  if (res === 200) {
    alert("Post successfully created");
  } else {
    alert("There was an error creating your post");
  }
});