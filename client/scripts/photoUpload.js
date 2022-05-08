import { createPost, uploadPhoto, downloadPhoto } from './crud.js';

const session_info = {
  user_id: 1
};

let submit = document.getElementById("submit");
submit.addEventListener("click", async () => {  
  const user_id = session_info.user_id;
  const picture_path = await savePhoto();
  
  const description = document.getElementById("photoDescription").value;
  const tag = document.getElementById("tag").value;

  const res = await createPost(user_id, picture_path, description, tag);
  if (res === 200) {
    alert("Post successfully created");
    location.href = "./home.html";
  } else {
    alert("There was an error creating your post");
    location.reload();
  }
});

async function savePhoto() {
  const newpp = document.getElementById("formFileLg").files[0];
  if (newpp) {
    const upload_res = await uploadPhoto(newpp); // check
    if (!upload_res.status === 200 || !upload_res.ok) {
      alert("There was an error uploading your photo");
    } else {
      const newpp_path = (await upload_res.json()).newpp_path;
      const downloadBlob = await downloadPhoto(newpp_path);
      const imgURL = URL.createObjectURL(downloadBlob);
      return newpp_path;
    }
  }
}