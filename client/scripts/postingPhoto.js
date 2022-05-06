import { getComments, createComment, getPost, updateLike, getLikes } from './crud.js';

const session_info = {
    user_id: 1,
    post_id: 1
};

window.onload = async function () {
    loadPhoto();
}

async function loadPhoto() {
    /* General post */
    const post_info = await getPost(session_info.post_id);
    const tag = post_info.tag;
    const imageURL = post_info.picture_path;
    const poster = post_info.user_id;
    const description = post_info.description;

    const tag1 = document.getElementById('tags');
    tag1.innerHTML = 'Tag: ' + tag;

    const image1 = document.getElementById('image');
    image1.innerHTML = '';
    const img = document.createElement('img');
    img.src = imageURL; // doesn't work rn
    image1.appendChild(img);

    const poster1 = document.getElementById('poster');
    poster1.innerHTML = poster + ':';

    const description1 = document.getElementById('description');
    description1.innerHTML = description;

    /* Likes */
    const likes_info = await getLikes(session_info.post_id);
    const likes = likes_info.count;
    const likes1 = document.getElementById('likes');
    likes1.innerHTML = likes + ' likes';

    /* Comments */
    const comments_info = await getComments(session_info.post_id);
    const commentSection1 = document.getElementById('commentSection');
    commentSection1.innerHTML = 'Comments:';
    for(let i = 0; i < comments_info.length; i++){
            const curComment = comments_info[i];
            const commenter = curComment.user_id;
            const message = curComment.comment;

            let comment1 = document.createElement('div');
            comment1.classList.add('mb-1');

            let commenter1 = document.createElement('span');
            let bold1 = document.createElement('b');
            bold1.innerHTML = commenter + ': ';
            commenter1.appendChild(bold1);

            let message1 = document.createElement('span');
            message1.innerHTML = message;
            
            comment1.appendChild(commenter1);
            comment1.appendChild(message1);

            commentSection1.appendChild(comment1);
        } 
}

// Add comment
let comment = document.getElementById("button-addon2");
comment.addEventListener("click", async () => {
    const comment_info = await getComments(session_info.post_id);
    const comment_id = comment_info.length;

    const post_id = session_info.post_id; 
    const user_id = session_info.user_id;

    const comment = document.getElementById("comment-text").value;

    const res = await createComment(comment_id, post_id, user_id, comment);
    if(res === 200){
        alert("Comment successfully created");
        location.reload();
    } else{
        alert("There was an error adding your comment");
        location.reload();
    }
})

// Like photo
let like = document.getElementById("likeButton");
like.addEventListener("click", async () => {
    const likes_info = await getLikes(session_info.post_id);
    const like_id = likes_info.count;

    const post_id = session_info.post_id; 
    const user_id = session_info.user_id;
    const res = await updateLike(like_id, post_id, user_id);
    if(res === 200){
        alert("Like successfully went through");
        location.reload();
    } else{
        alert("There was an error liking the photo");
        location.reload();
    }
});