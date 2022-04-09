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
app.use('/client', express.static('client'));



app.post('/create', async (req, res) => {
  const options = request.body;
  console.log(options);
});

app.get('/read', async (req, res) => {
  const options = request.query;
  console.log(options);
});

app.put('/update',async (req, res) => {
  const options = request.query;
  console.log(options);
});

app.delete('/delete', async (req, res) => {
  const options = request.query;
  console.log(options);
});

app.get('*', async (req, res) => {
  res.redirect('localhost:3000/client/login.html');
});

app.get('/client/login.html', async (req, res) => {
  res.render(__dirname + '/client/login.html');
});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});