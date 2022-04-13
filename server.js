import express from 'express';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';



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

app.get('/get_user_posts', (req, res) => {
  //console.log("Get User Posts");
  const options = req.query;
  // console.log("Options:");
  // console.log(options);
  const posts = ["post1", "post2", "post3"];
  res.status(200).send(posts);
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