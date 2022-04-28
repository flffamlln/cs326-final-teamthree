import express from 'express';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';
import DatabaseConnection from './database.js';
import 'path';

const headerFields = { 'Content-Type': 'application/json' };

// This is not how this is going to be implemented, this is just for testing.
// The actual implementation will have images stored in a database.
const posts = [
    { "user_id": 0, "url": "./img/posts/test1.jpg", "description": "This is a description", "tag": "Puppy", "post_id": 0, "likes": [0, 1, 2], "comments": [{ "from": 1, "message": 'Adorable' }, { "from": 2, "message": 'I love this!' }] },
    { user_id: 1, url: "./img/posts/test2.jpg", description: "This is a description", tag: "Cat", post_id: 1, likes: [1, 2], comments: [{ from: 2, message: 'Lorem ipsum!' }, { from: 2, "message": 'Amazing!' }] },
    { user_id: 2, url: "./img/posts/test3.jpg", description: "This is a description", tag: "Reptile", post_id: 2, likes: [0, 1, 2], comments: [{ from: 2, message: 'Ipsum dolor sit.' }, { from: 2, "message": 'Spectacular' }] },
    { user_id: 3, url: "./img/posts/test4.jpg", description: "This is a description", tag: "Puppy", post_id: 3, likes: [0], comments: [{ from: 3, message: 'Thumbs up' }] },
    { user_id: 4, url: "./img/posts/test5.jpg", description: "This is a description", tag: "Cat", post_id: 4, likes: [4, 3], comments: [{ from: 5, message: 'Lorem ipsum dolor!!' }] },
    { user_id: 5, url: "./img/posts/test6.jpg", description: "This is a description", tag: "Cat", post_id: 5, likes: [2, 1], comments: [] },
];

const feed = [
    "./server/img/posts/bird1.jpg",
    "./server/img/posts/bird2.jpg",
    "./server/img/posts/dog1.jpeg",
    "./server/img/posts/dog2.webp",
    "./server/img/posts/cat1.jpg",
    "./server/img/posts/cat2.jpg",
    "./server/img/posts/bird1.jpg",
    "./server/img/posts/bird2.jpg"
];


class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    const __dirname = path.resolve();
    this.app.use('/client', express.static(path.join(__dirname, 'client')));

    // Temporary
    // this.app.use(logger('dev'));
  }

  // Initialize all of the routes for creating stuff (and logging in)
  initPostRoutes() {
    /**
     * 
     */
    this.app.post('/create_user', async (req, res) => {
      const options = req.body;

      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });

    /**
     * 
     */
    this.app.post('/create_post', async (req, res) => {
      const options = req.body;
      const post = {
        post_id: options.post_id,
        user_id: options.user_id,
        url: options.url,
        description: options.description,
        tag: options.tag,
      };

      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });

    /**
     * 
     */
    this.app.post('/create_comment', async (req, res) => {
      const options = req.body;
    
      const comment = {
        from: options.user_id,
        message: options.message
      };

      // Query database here
    
      res.writeHead(200, headerFields);
      res.end();
    });

    /**
     * AUTHENTICATION STUFF GOES HERE
     */
    this.app.post('/login', async (req, res) => {
      const options = req.body;

      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });
    
    /**
     * 
     */
    this.app.post('/signup', async (req, res) => {
      const options = req.body;
      
      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });
  }

  // Initialize all of the routes for getting stuff
  initGetRoutes() {
    /**
     * 
     */
    this.app.get('/get_post', async (req, res) => {
      const options = req.query;
      
      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });

    /**
     * 
     */
    this.app.get('/get_user_posts', async (req, res) => {
      const options = req.query;
      
      const query = 'SELECT * FROM posts WHERE user_id = $1;';
      const result = await this.db.generalQuery(query, [options.user_id]);

      res.status(200).json(result.rows);
    });

    /**
     * 
     */
    this.app.get('/get_user_post_count', async (req, res) => {
      const options = req.query;
      
      // Query database here
      const query = 'SELECT COUNT(*) FROM posts WHERE user_id = $1;';
      const result = await this.db.generalQuery(query, [options.user_id]);
      const count = result.rows[0].count;

      res.status(200).json(count);
    });

    /**
     * 
     */
    this.app.get('/get_likes', async (req, res) => {
      const options = req.query;

      // Query database here
      
      res.writeHead(200, headerFields);
      res.end();
    });

    /**
     * *****************************************
     * CHANGE WHEN AUTHENTICATION IS IMPLEMENTED
     * *****************************************
     */
    this.app.get('*', (req, res) => {
      res.redirect("/client/login.html");
    });
  }

  // Initialize all of the routes for updating stuff
  initPutRoutes() {
    /**
     * 
     */
    this.app.put('/update_user', async (req, res) => {
      const options = req.query;
      console.log(options);

      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });

    /**
     * 
     */
    this.app.put('/like_post', async (req, res) => {
      const options = req.body;
      const like = {
        post_id: options.post_id,
        user_id: options.user_id
      };

      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });
  }

  // Initialize all of the routes for deleting stuff
  initDeleteRoutes() {
    /**
     * Change to delete post, comment, etc.
     */
    this.app.delete('/delete', async (req, res) => {
      const options = req.query;

      // Query database here

      res.writeHead(200, headerFields);
      res.end();
    });
  }

  async initializeDatabase() {
    this.db = new DatabaseConnection(this.dburl);
    await this.db.connect();
  }

  // Start the server
  start() {
    this.initializeDatabase();
    this.initPostRoutes();
    this.initGetRoutes();
    this.initPutRoutes();
    this.initDeleteRoutes();
    this.app.listen(this.port, () => {
      console.log('Server Started');
    });
  }
}

const server = new Server(process.env.DATABASE_URL);
server.start();