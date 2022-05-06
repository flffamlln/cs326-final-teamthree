import { createPost, getNumPosts } from './crud.js';

const session_info = {
    user_id: 1
};

let submit = document.getElementById("submit");
submit.addEventListener("click", async () => {
  const post_info = await getNumPosts();
  const post_id = parseInt(post_info.count) + 1;
  
  const user_id = session_info.user_id;
  const picture_path           = 'puppyPhoto.jpg';
  const description       = document.getElementById("photoDescription").value;
  const tag        = document.getElementById("tag").value;

  const res = await createPost(post_id, user_id, picture_path, description, tag);
  if (res === 200) {
    alert("Post successfully created");
    location.reload();
  } else {
    alert("There was an error creating your post");
    location.reload();
  }
});

/*
// async function?
function uploadPhoto(){
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
}
*/