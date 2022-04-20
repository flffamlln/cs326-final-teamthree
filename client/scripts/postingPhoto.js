import { createComment, getPost, updateLike, getLikes } from './crud.js';

const session_info = {
    user_id: 0,
    post_id: 0
};

window.onload = async function () {
    const post_info = await getPost(session_info.post_id);
    const post = JSON.parse(post_info[post]);

    const tag = document.getElementById('tags');
    const image = document.getElementById('image');
    const likes = document.getElementById('likes');
    const poster = document.getElementById('poster');
    const description = document.getElementById('description');
    const commentSection = document.getElementById('commentSection');

    tag.innerHTML = '';
    image.innerHTML = '';
    likes.innerHTML = '';
    poster.innerHTML = '';
    description.innerHTML = '';
    commentSection.innerHTML = '';

    if(post_info.status === 200 && post_info.ok){
        tag.appendTextNode(post.tag);

        const img = document.createElement('img');
        img.src = post.url;
        image.appendChild(img);

        likes.appendTextNode(post[likes].length + ' likes');

        poster.appendTextNode(post.user_id + ':');

        description.appendTextNode(post.description);

        for(let i = 0; i < post[comments].length; i++){
            let curComment = post[comments][i];

            let comment = document.createElement('div');
            comment.classList.add('mb-1');

            let commenter = document.createElement('span');
            let bold = document.createElement('b');
            bold.appendTextNode(curComment[from]);
            commenter.appendChild(bold);

            let message = document.createElement('span');
            message.appendTextNode(curComment[message]);
            
            comment.appendChild(commenter);
            comment.appendChild(message);

            commentSection.appendChild(comment);
        }
    } else{
        tag.appendTextNode("error");
        image.appendTextNode("error");
        likes.appendTextNode("error");
        poster.appendTextNode("error");
        description.appendTextNode("error");
        commentSection.appendTextNode("error");
    }
}

// Enter comment
let comment = document.getElementById("button-addon2");
comment.addEventListener("click", async () => {
    const post_id = session_info.post_id; 
    const user_id = session_info.user_id;
    const comment = document.getElementById("comment_text").value;
    const res = await createComment(post_id, user_id, comment);
    if(res === 200){
        alert("Comment successfully created");

        const commentSection = document.getElementById('commentSection');
        let com = document.createElement('div');
        com.classList.add('mb-1');

        let commenter = document.createElement('span');
        let bold = document.createElement('b');
        bold.appendTextNode(curComment[from]);
        commenter.appendChild(bold);

        let message = document.createElement('span');
        message.appendTextNode(curComment[message]);
            
        com.appendChild(commenter);
        com.appendChild(message);

        commentSection.appendChild(com);
    } else{
        alert("There was an error posting your comment");
    }
})

// Like photo
let like = document.getElementById("likeButton");
like.addEventListener("click", async () => {
    const post_id = session_info.post_id; 
    const user_id = session_info.user_id;
    const res = await updateLike(post_id, user_id);
    if(res === 200){
        alert("Like went through");
    } else{
        alert("There was an error liking the post");
    }

    const num_likes = await getLikes(session_info.post_id);

    const likes = document.getElementById('likes');
    likes.innerHTML = '';

    if(num_likes.status === 200 && num_likes.ok){
        likes.appendTextNode(num_likes.likes + ' likes');
    } else{
        likes.appendTextNode("error");
    }
});