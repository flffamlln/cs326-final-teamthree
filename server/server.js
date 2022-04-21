import express from 'express';
import path from 'path';
import morgan from 'morgan';
import logger from 'morgan';
import * as db from './database.js';
import * as pg from 'pg';

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

const post_likes = {

};


const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static(path.join(__dirname, 'client')));



app.post('/create_post', (req, res) => {
    const options = req.body;

    let post = {};
    post["user_id"] = options.user_id;
    post["url"] = options.picture;
    post["description"] = options.description;
    post["tag"] = options.tag;
    post["post_id"] = posts.length;
    post["likes"] = 0;
    post["comments"] = [];

    posts.push(post);
    res.writeHead(200, headerFields);
    res.end();
});

app.post('/create_comment', (req, res) => {
    const options = req.body;

    let obj = {};
    obj["from"] = options.user_id;
    obj["message"] = options.comment;

    let commented = false;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["post_id"] === options.post_id) {
            posts[i]["comments"].push(obj);
            commented = true;
        }
    }
    if (commented) {
        res.writeHead(200, headerFields);
    }
    res.end();
});

app.get('/get_post', (req, res) => {
    const options = req.query;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["post_id"] === options.post_id) {
            res.status(200).send(posts[i]);
        }
    }
});

app.get('/get_user_posts', (req, res) => {
    const options = req.query;
    const selected_posts = posts.slice(options.num_posts_present, options.num_posts_requested);
    res.status(200).send(selected_posts);
});

app.get('/get_post_count', (req, res) => {
    const options = req.query;
    const count = posts.length;
    res.status(200).send(count.toString());
});

app.get('/get_likes', (req, res) => {
    const options = req.query;

    let likes = null;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["post_id"] === options.post_id) {
            likes = posts[i]["likes"].length;
            res.status(200).send(likes.toString());
            res.end();
        }
    }
    res.status(200).send(likes.toString());
});

app.put('/update_user', (req, res) => {
    console.log("Update User");
    const options = req.query;
    res.sendStatus(200);
});

app.put('/update_likes', (req, res) => {
    const options = req.body;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["post_id"] === options.post_id) {
            if (!posts[i]["likes"].includes(options.user_id)) {
                posts[i]["likes"].push(options.user_id);
            }
        }
    }
    res.writeHead(200, headerFields);
    res.end();
})

app.delete('/delete', (req, res) => {
    console.log("Delete");
    const options = req.query;
    console.log(options);
});

app.get('*', (req, res) => {
    res.redirect("/client/login.html");
});



const USER_FILE = 'user-info.json';

// Returns a function that will save a user sign up info to an info file.
function saveToUserFlie(path) {
    return async(username, email, password) => {
        const data = { username, email, password };
        const info = await readUserInfo();
        scores.push(data);
        writeFile(path, JSON.stringify(info), 'utf8');
    };
}

// Returns a function that will read a info file.
function readSignupFile(path) {
    return async() => {
        try {
            const infoFile = await readFile(path, 'utf8');
            const info = JSON.parse(infoFile);
            return info;
        } catch (error) {
            // Likely the file doesn't exist
            return [];
        }
    };
}

async function saveData(dataObject, id) {
    // Save the current scores in a file 
    try {
        const data = JSON.stringify(dataObject);
        await writeFile(USER_FILE, data, { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

const readUserInfo = readSignupFile(USER_FILE);
const saveSignupInfo = saveToUserFlie(USER_FILE);

app.post('/login', (req, res) => {
    console.log("Login");
    const options = req.body;
    console.log(options);
    res.writeHead(200, headerFields);
});

app.post('/signup', (req, res) => {
    console.log("signup");
    const options = req.body;
    saveSignupInfo(options.username, options.email, options.password);
    res.writeHead(200, headerFields);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});