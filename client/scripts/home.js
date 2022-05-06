import * as crud from './crud.js';

const feed_photos = [
  "./img/posts/bird1.jpg",
  "./img/posts/bird2.jpg",
  "./img/posts/dog1.jpeg",
  "./img/posts/dog2.webp",
  "./img/posts/cat1.jpg",
  "./img/posts/cat2.jpg",
  "./img/posts/bird1.jpg",
  "./img/posts/bird2.jpg",
];

window.onload = async function () {
  addFeedPhoto();
  displayFeed();
}

async function getPostFeed() {
  await crud.getFeed(tag);
  
}

async function displayFeed() {
  const posts = document.getElementById("posts");
  for (let i = 0; i < Math.floor(Object.keys(feed_photos).length/2); ++i) {
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
      photo.src = feed_photos[2*i + j];
      //photo.innerHTML = "onclick='location.href='postingPhoto.html";
      photo.addEventListener("click", redirected);
      centering.appendChild(photo);
      row.appendChild(centering);
    }
    posts.appendChild(row);
  }
}

function redirected() {
  window.location.replace("/client/postingPhoto.html");
}

async function addFeedPhoto(image) {
  crud.getFeed();
  feed_photos.push(image);
}
