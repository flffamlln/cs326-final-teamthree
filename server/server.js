import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';
import DatabaseConnection from './database.js';
import 'path';
import * as fs from 'fs';

const headerFields = { 'Content-Type': 'application/json' };
const __dirname = path.resolve();
let pp_count = 0;

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/client', express.static(path.join(__dirname, 'client')));
    this.app.use(fileUpload({
      createParentPath: true
    }));

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
     * 
     */
    this.app.post('/upload_pp', async (req, res) => {
      if (!req.files) {
        res.status(400).send('No files were uploaded.');
      }
 
      const file = req.files.pp;
      const file_path = __dirname + '/client/img/profile_pictures/' + file.name;
      let extention = '';
      if (file.name.endsWith('.jpg')) {
        extention = '.jpg';
      } else if (file.name.endsWith('.jpeg')) {
        extention = '.jpeg';
      } else if (file.name.endsWith('.png')) {
        extention = '.png';
      }
    
      await file.mv(file_path, (err) => {
        if (err) {
          res.status(500).send(err);
        }
      });

      const d = new Date();
      const new_name = d.getDate().toString() + (d.getMonth()+1).toString() + d.getFullYear().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
      console.log(new_name);
      const new_path = __dirname + '/client/img/profile_pictures/' + new_name.toString() + extention;
      fs.rename(file_path, new_path, () => {});

      res.status(200).send({ newpp_path: new_path });
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
     this.app.get('/get_user_info', async (req, res) => {
      const options = req.query;
      
      const query = 'SELECT first_name, last_name, username, email, pp_path FROM users WHERE user_id = $1;';
      const values = [options.user_id];
      const result = await this.db.generalQuery(query, values);

      res.status(200).json(result.rows[0]);
    });

    /**
     * 
     */
    this.app.get('/get_user_posts', async (req, res) => {
      const options = req.query;
      
      const query = 'SELECT * FROM posts WHERE user_id = $1;';
      const values = [options.user_id];
      const result = await this.db.generalQuery(query, values);

      res.status(200).json(result.rows);
    });

    /**
     * 
     */
    this.app.get('/get_user_post_count', async (req, res) => {
      const options = req.query;
      
      // Query database here
      const query = 'SELECT COUNT(*) FROM posts WHERE user_id = $1;';
      const values = [options.user_id];
      const result = await this.db.generalQuery(query, values);
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
     * 
     */
    this.app.get('/download_pp', async (req, res) => {
      res.status(200).sendFile( req.query.newpp_path);
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
      const options = req.body;

      const query = `
        UPDATE users
        SET first_name = $2,
            last_name = $3,
            username = $4,
            email = $5,
            pp_path = $6
        WHERE user_id = $1
        RETURNING *
      ;`;
      const values = [options.user_id, options.new_first_name, options.new_last_name, options.new_username, options.new_email, options.newpp_path];

      try {
        await this.db.generalQuery(query, values);
        res.writeHead(200, headerFields);
      } catch (err) {
        res.writeHead(500, headerFields);
      }

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