import express from 'express';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';
import * as db from './database.js';


// This is not how this is going to be implemented, this is just for testing.
// The actual implementation will have images stored in a database.
const posts = [
  {user_id: 0, url: "./img/test1.jpg", description: "This is a description", tag: "Puppy", post_id: 0},
  {user_id: 1, url: "./img/test2.jpg", description: "This is a description", tag: "Cat", post_id: 1},
  {user_id: 2, url: "./img/test3.jpg", description: "This is a description", tag: "Reptile", post_id: 2},
  {user_id: 3, url: "./img/test4.jpg", description: "This is a description", tag: "Puppy", post_id: 3},
  {user_id: 4, url: "./img/test5.jpg", description: "This is a description", tag: "Cat", post_id: 4},
  {user_id: 5, url: "./img/test6.jpg", description: "This is a description", tag: "Cat", post_id: 5},
];


const app = express();
const port = 3000;
const __dirname = path.resolve();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static(path.join(__dirname, 'client')));



app.post('/create', (req, res) => {
  console.log("Create");
  const options = req.body;
  console.log(options);
});

app.post('/create_post', (req, res) => {
  const options = req.body;

  let post = {};
  post[user_id] = options.user_id;
  post[url] = options.picture;
  post[description] = options.description;
  post[tag] = options.tag;
  post[post_id] = posts.length;

  posts.push(post);
  res.sendStatus(200);
});

app.post('/create_comment', (req, res) => {
  console.log("Create comment");
  const options = req.body;
  console.log(options);
});

app.get('/get_user_posts', (req, res) => {
  const options = req.query;
  const selected_posts = posts.slice(options.num_posts_present, options.num_posts_requested);
  console.log(selected_posts);
  res.status(200).send(selected_posts);
});

app.get('/get_post_count', (req, res) => {
  const options = req.query;
  const count = posts.length;
  res.status(200).send(count.toString());
});

app.put('/update_user', (req, res) => {
  console.log("Update User");
  const options = req.query;
  res.sendStatus(200);
});

app.delete('/delete', (req, res) => {
  console.log("Delete");
  const options = req.query;
  console.log(options);
});

app.get('*', (req, res) => {
  res.redirect("/client/login.html");
})



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});