import * as crud from './crud.js';

let feed_photos_path = [];
let feed_photos_scr = [];

/*  "./img/posts/bird1.jpg",
  "./img/posts/bird2.jpg",
  "./img/posts/dog1.jpeg",
  "./img/posts/dog2.webp",
  "./img/posts/cat1.jpg",
  "./img/posts/cat2.jpg",
  "./img/posts/bird1.jpg",
  "./img/posts/bird2.jpg",*/

window.onload = async function () {
  //addFeedPhoto();
  getPostFeedPath();
  displayFeed();
}
const tagFilter = document.getElementById("drop-button");
tagFilter.addEventListener('change',getPostFeedPath);

async function getPostFeedPath() {
  feed_photos_path = [];
  const tagFilter = document.getElementById("drop-button");
  const results = await crud.getFeed(tagFilter.value);
  for(let i = 0; i < Object.keys(results).length; ++i){
    feed_photos_path.push([results[i].post_id,results[i].picture_path]);
  }
  getPostFeedImages();
}

async function getPostFeedImages() {
  feed_photos_scr = [];
  for (let i = 0; i <feed_photos_path.length; ++i){
    try{
      const downloadPostBlob = await crud.downloadPost(feed_photos_path[i][1]);
      if(downloadPostBlob !== undefined){
        const imgURL = URL.createObjectURL(downloadPostBlob);
        feed_photos_scr.push([imgURL,feed_photos_path[i][0]]);
      }
    } catch (err){
      console.log(err.message);
    }
  }
  displayFeed();
}


async function displayFeed() {
  const posts = document.getElementById("posts");
  while(posts.firstChild){
    posts.removeChild(posts.firstChild);
  }
  for (let i = 0; i < Math.floor(feed_photos_scr.length/2); ++i) {
    const row = document.createElement("div");
    row.classList.add("post-img-row");
    for (let j = 0; j < 2; ++j) {
      const centering = document.createElement("div");
      centering.classList.add("d-flex");
      centering.classList.add("justify-content-center");
      const photo = document.createElement("img");
      photo.classList.add("img-fluid");
      photo.classList.add("rounded");
      photo.classList.add("shadow-sm");
      photo.id = feed_photos_scr[2*i + j][1];

      photo.src = feed_photos_scr[2*i + j][0];
      
      photo.addEventListener("click", redirected);
      centering.appendChild(photo);
      row.appendChild(centering);
    }
    posts.appendChild(row);
  }
}

function redirected(e) {
  window.location.replace(`/client/postingPhoto.html?post_id=${e.path[0].id}`);
}
