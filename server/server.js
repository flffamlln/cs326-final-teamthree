import express from 'express';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';
import DatabaseConnection from './database.js';
import 'path';
import nodemailer from 'nodemailer'
import 'dotenv/config';
import { dirname } from 'path';
import users from './users.js';
import auth from './auth.js';
import expressSession from 'express-session';
import passport from 'passport';

import passportLocal from 'passport-local';
import flash from 'express-flash';
import session from 'express-session';

const __filename = fileURLToPath(
    import.meta.url);


// Session configuration
const sessionConfig = {
    // set this encryption key in Heroku config (never in GitHub)!
    secret: process.env.SECRET || 'SECRET',
    resave: false,
    saveUninitialized: false,
};

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'petstagram.03@hotmail.com',
        pass: 'CS326Final!'
    }
});

const headerFields = { 'Content-Type': 'application/json' };
const __dirname = path.resolve();

class Server {
    constructor(dburl) {
        this.dburl = dburl;
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.app.use(express.static('client'));
        this.app.use(expressSession(sessionConfig));
        this.app.use(express.json());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(flash());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/client', express.static(path.join(__dirname, 'client')));
        this.app.use(fileUpload({
            createParentPath: true
        }));
        this.app.use(
            session({
                // Key we want to keep secret which will encrypt all of our information
                secret: process.env.SESSION_SECRET,
                // Should we resave our session variables if nothing has changes which we dont
                resave: false,
                // Save empty value if there is no vaue which we do not want to do
                saveUninitialized: false
            })
        );
        this.app.set("view engine", "htmlthis.");

        auth.configure(this.app);


        // Temporary
        // this.app.use(logger('dev'));
    }

    // Initialize all of the routes for creating stuff (and logging in)
    initPostRoutes() {
        /**
         * 
         */
        this.app.post('/create_user', async(req, res) => {
            const options = req.body;

            // Query database here

            res.writeHead(200, headerFields);
            res.end();
        });

        /**
         * 
         */
        this.app.post('/create_post', async(req, res) => {
            const options = req.body;
            try {
                const postDetails = await this.db.addPost(options.user_id, options.picture_path, options.description, options.tag);
                res.status(200).send(postDetails.rows);
            } catch (err) {
                res.status(500).send({ error: 'There was an error creating a post' });
            }
            res.end();
        });

        /**
         * 
         */
        this.app.post('/add_comment', async(req, res) => {
            const options = req.body;
            try {
                const comments = await this.db.addComment(options.post_id, options.user_id, options.comment);
                res.status(200).send(comments.rows[0]);
            } catch (err) {
                res.status(500).send({ error: 'There was an error adding a comment' });
            }
            res.end();
        });

        /**
         * 
         */
        this.app.post('/upload_pp', async(req, res) => {
            if (!req.files) {
                res.status(400).send('No files were uploaded.');
            }

            const file = req.files.newFile;

            let extention = '';
            if (file.name.endsWith('.jpg')) {
                extention = '.jpg';
            } else if (file.name.endsWith('.jpeg')) {
                extention = '.jpeg';
            } else if (file.name.endsWith('.png')) {
                extention = '.png';
            }

            // Rename profile picture to something unique
            const d = new Date();
            const new_name = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
            file.name = new_name + extention;
            const file_path = __dirname + '/client/img/profile_pictures/' + file.name;

            await file.mv(file_path, (err) => {
                if (err) {
                    res.status(500).send(err);
                }
            });

            res.status(200).send({ newpp_path: (new_name.toString() + extention) });
        });

        /**
         * 
         */
        this.app.post('/upload_photo', async(req, res) => {
            if (!req.files) {
                res.status(400).send('No files were uploaded.');
            }

            const file = req.files.newFile;

            let extention = '';
            if (file.name.endsWith('.jpg')) {
                extention = '.jpg';
            } else if (file.name.endsWith('.jpeg')) {
                extention = '.jpeg';
            } else if (file.name.endsWith('.png')) {
                extention = '.png';
            }

            // Rename picture to something unique
            const d = new Date();
            const new_name = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDate().toString() + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString();
            file.name = new_name + extention;
            const file_path = __dirname + '/client/img/posts/' + file.name;

            await file.mv(file_path, (err) => {
                if (err) {
                    res.status(500).send(err);
                }
            });

            res.status(200).send({ newpp_path: (new_name.toString() + extention) });
        });

        /**
         * AUTHENTICATION STUFF GOES HERE
         */


        // this.app.get("/", (req, res) => {
        //     res.render("index");
        // });

        // this.app.get("/client/signup.html", checkAuthenticated, (req, res) => {
        //     res.render("signup.html");
        // });

        // this.app.get("/client/login.html", checkAuthenticated, (req, res) => {
        //     // flash sets a messages variable. passport sets the error message
        //     console.log(req.session.flash.error);
        //     res.render("login.html");
        // });

        // this.app.get("/client/home.html", checkNotAuthenticated, (req, res) => {
        //     console.log(req.isAuthenticated());
        //     res.render("home.html", { user: req.user.name });
        // });

        // // this.app.get("/users/logout", (req, res) => {
        // //     req.logout();
        // //     res.render("index", { message: "You have logged out successfully" });
        // // });

        // this.app.post("/client/signup.html", async(req, res) => {
        //     let { name, email, password, password2 } = req.body;

        //     let errors = [];

        //     console.log({
        //         name,
        //         email,
        //         password,
        //         password2
        //     });

        //     if (!name || !email || !password || !password2) {
        //         errors.push({ message: "Please enter all fields" });
        //     }

        //     if (password.length < 6) {
        //         errors.push({ message: "Password must be a least 6 characters long" });
        //     }

        //     if (password !== password2) {
        //         errors.push({ message: "Passwords do not match" });
        //     }

        //     if (errors.length > 0) {
        //         res.render("signup.html", { errors, name, email, password, password2 });
        //     } else {
        //         hashedPassword = await bcrypt.hash(password, 10);
        //         console.log(hashedPassword);
        //         // Validation passed
        //         pool.query(
        //             `SELECT * FROM users
        // WHERE email = $1`, [email],
        //             (err, results) => {
        //                 if (err) {
        //                     console.log(err);
        //                 }
        //                 console.log(results.rows);

        //                 if (results.rows.length > 0) {
        //                     return res.render("signup.html", {
        //                         message: "Email already registered"
        //                     });
        //                 } else {
        //                     pool.query(
        //                         `INSERT INTO users (name, email, password)
        //       VALUES ($1, $2, $3)
        //       RETURNING id, password`, [name, email, hashedPassword],
        //                         (err, results) => {
        //                             if (err) {
        //                                 throw err;
        //                             }
        //                             console.log(results.rows);
        //                             req.flash("success_msg", "You are now registered. Please log in");
        //                             res.redirect("/client/login.html");
        //                         }
        //                     );
        //                 }
        //             }
        //         );
        //     }
        // });

        // this.app.post(
        //     "/login.html",
        //     passport.authenticate("local", {
        //         successRedirect: "/client/home.html",
        //         failureRedirect: "/client/login.html",
        //         failureFlash: true
        //     })
        // );

        // function checkAuthenticated(req, res, next) {
        //     if (req.isAuthenticated()) {
        //         return res.redirect("/client/home.html");
        //     }
        //     next();
        // }

        // function checkNotAuthenticated(req, res, next) {
        //     if (req.isAuthenticated()) {
        //         return next();
        //     }
        //     res.redirect("/client/login.html");
        // }

        // this.app.post('/login', async(req, res) => {
        //     const options = req.body;

        //     // Query database here

        //     res.writeHead(200, headerFields);
        //     res.end();
        // });

        // /**
        //  * 
        //  */
        // this.app.post('/signup', async(req, res) => {
        //     const options = req.body;

        //     // Query database here

        //     res.writeHead(200, headerFields);
        //     res.end();
        // });


        // Our own middleware to check if the user is authenticated
        function checkLoggedIn(req, res, next) {
            if (req.isAuthenticated()) {
                // If we are authenticated, run the next route.
                next();
            } else {
                // Otherwise, redirect to the login page.
                res.redirect('/login');
            }
        }

        this.app.get('/', checkLoggedIn, (req, res) => {
            res.send('/home');
        });

        // Handle the URL /login (just output the login.html file).
        this.app.get('/login', (req, res) =>
            res.sendFile('client/login.html', { root: dirname(dirname(__filename)) })
        );

        // Handle post data from the login.html form.
        this.app.post(
            '/login',
            auth.authenticate('local', {
                // use username/password authentication
                successRedirect: '/private', // when we login, go to /private
                failureRedirect: '/login', // otherwise, back to login
            })
        );


        // Like login, but add a new user and password IFF one doesn't exist already.
        // If we successfully add a new user, go to /login, else, back to /register.
        // Use req.body to access data (as in, req.body['username']).
        // Use res.redirect to change URLs.
        this.app.post('/signup', (req, res) => {
            const { username, password } = req.body;
            if (users.addUser(username, password)) {
                res.redirect('/login');
            } else {
                res.redirect('/signup');
            }
        });

        // Register URL
        this.app.get('/signup', (req, res) =>
            res.sendFile('client/signup.html', { root: dirname(dirname(__filename)) })
        );

        // Private data
        this.app.get(
            '/private',
            checkLoggedIn, // If we are logged in (notice the comma!)...
            (req, res) => {
                // Go to the user's page.
                res.redirect('/private/' + req.user);
            }
        );

        // A dummy page for the user.
        this.app.get(
            '/private/:userID/',
            checkLoggedIn, // We also protect this route: authenticated...
            (req, res) => {
                // Verify this is the right user.
                if (req.params.userID === req.user) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end();
                } else {
                    res.redirect('/private/');
                }
            }
        );

        this.app.get('*', (req, res) => {
            res.send('Error');
        });
    }

    // Initialize all of the routes for getting stuff
    initGetRoutes() {
        this.app.get('/get_feed', async(req, res) => {
            const options = req.query;
            try {
                if (options.tag === "All") {
                    const query = 'SELECT * FROM posts;';
                    const posts = await this.db.generalQuery(query);
                    res.status(200).send(posts.rows);
                } else {
                    const posts = await this.db.getFeed(options.tag);
                    res.status(200).send(posts.rows);
                }
            } catch (err) {
                res.status(500).send({ error: err.message });
            }
            res.end();
        });

        /**
         * 
         */
        this.app.get('/get_post', async(req, res) => {
            const options = req.query;
            try {
                const post = await this.db.getPost(options.post_id);
                res.status(200).send(post.rows[0]);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving the post' });
            }
        });

        /**
         * 
         */
        this.app.get('/get_num_posts', async(req, res) => {
            const options = req.query;
            try {
                const data = await this.db.getNumPosts();
                res.status(200).send(data.rows[0]);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving the number of posts' });
            }
        });

        /**
         * 
         */
        this.app.get('/get_comments', async(req, res) => {
            const options = req.query;
            try {
                const comments = await this.db.getComments(options.post_id);
                res.status(200).send(comments.rows);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving the comments' });
            }
        });

        /**
         * 
         */
        this.app.get('/get_user_info', async(req, res) => {
            const options = req.query;

            const query = 'SELECT first_name, last_name, username, email, pp_path FROM users WHERE user_id = $1;';
            const values = [options.user_id];
            const result = await this.db.generalQuery(query, values);

            res.status(200).json(result.rows[0]);
        });

        /**
         * 
         */
        this.app.get('/get_username', async(req, res) => {
            const options = req.query;
            try {
                const data = await this.db.getUsername(options.user_id);
                res.status(200).send(data.rows[0]);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving username' });
            }
            res.end();
        });

        /**
         * 
         */
        this.app.get('/get_user_posts', async(req, res) => {
            const options = req.query;

            const query = 'SELECT * FROM posts WHERE user_id = $1;';
            const values = [options.user_id];
            const result = await this.db.generalQuery(query, values);

            res.status(200).send(result.rows);
        });

        /**
         * 
         */
        this.app.get('/get_user_post_count', async(req, res) => {
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
        this.app.get('/get_likes', async(req, res) => {
            const options = req.query;
            try {
                const likes = await this.db.getLikes(options.post_id);
                res.status(200).send(likes.rows[0]);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving the likes' });
            }
            res.end();
        });

        /**
         * 
         */
        this.app.get('/liked', async(req, res) => {
            const options = req.query;
            try {
                const likes = await this.db.liked(options.post_id, options.user_id);
                res.status(200).send(likes.rows[0]);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving whether user liked this post' });
            }
            res.end();
        });

        /**
         * 
         */
        this.app.get('/download_pp', async(req, res) => {
            const pp_path = __dirname + '/client/img/profile_pictures/' + req.query.newpp_path;
            res.status(200).sendFile(pp_path);
        });

        /**
         * 
         */
        this.app.get('/download_photo', async(req, res) => {
            const pp_path = __dirname + '/client/img/posts/' + req.query.newpp_path;
            res.status(200).sendFile(pp_path);
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
        this.app.put('/update_user', async(req, res) => {
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
                res.sendStatus(200);
            } catch (err) {
                res.sendStatus(500);
            }

            res.end();
        });

        this.app.put('/update_password', async(req, res) => {
            const options = req.body;

            const q1 = `SELECT password FROM users WHERE user_id = $1`;
            try {
                const actual_curr_password = (await this.db.generalQuery(q1, [options.user_id])).rows[0].password;
                if (actual_curr_password === options.current_password) {
                    const q2 = `UPDATE users SET password = $1 WHERE user_id = $2`;
                    await this.db.generalQuery(q2, [options.new_password, options.user_id]);
                    const q3 = `SELECT email FROM users WHERE user_id = $1`;
                    const user_email = (await this.db.generalQuery(q3, [options.user_id])).rows[0].email;

                    const mailOptions = {
                        from: 'petstagram.03@hotmail.com',
                        to: user_email,
                        subject: 'Password Changed!',
                        text: 'This email is to inform you that your password has been changed.'
                    };

                    transporter.sendMail(mailOptions, function(error) {
                        if (error) {
                            console.log(error);
                        }
                    });

                    res.sendStatus(200);
                } else {
                    res.sendStatus(406);
                }
            } catch (err) {
                res.sendStatus(500);
            }
        });

        /**
         * 
         */
        this.app.put('/update_likes', async(req, res) => {
            const options = req.body;
            try {
                const likes = await this.db.addLike(options.post_id, options.user_id);
                res.status(200);
            } catch (err) {
                res.status(500).send({ error: 'There was an error retreiving the likes' });
            }
            res.end();
        });
    }

    // Initialize all of the routes for deleting stuff
    initDeleteRoutes() {
        /**
         * Change to delete post, comment, etc.
         */
        this.app.delete('/delete', async(req, res) => {
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