import express from 'express';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';
import * as db from './database.js';


// This is not how this is going to be implemented, this is just for testing.
// The actual implementation will have images stored in a database.
const posts = [
  {url: "./img/test1.jpg", description: "This is a description"},
  {url: "./img/test2.jpg", description: "This is a description"},
  {url: "./img/test3.jpg", description: "This is a description"},
  {url: "./img/test4.jpg", description: "This is a description"},
  {url: "./img/test5.jpg", description: "This is a description"},
  {url: "./img/test6.jpg", description: "This is a description"},
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
  console.log("Create post");
  const options = req.body;
  console.log(options);
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