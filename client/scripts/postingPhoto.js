import { createComment } from "./crud";

const session_info = {
    user_id: 0,
    profile_picture: "./img/mike.jpg",
};

const post_info = {
    post_id: 0;
}

// Fill in tag


// Fill in image

// Fill in likes

// Fill in description

// Fill in comments

// Enter comment
let comment = document.getElementById("button-addon2");
comment.addEventListener("click", async () => {
    const post_id = post_info.post_id; 
    const user_id = session_info.user_id;
    const comment_text = document.getElementById("comment_text");
    const res = await createComment(post_id, user_id, comment_text);
    if(res === 200){
        alert("Comment successfully created");
    } else{
        alert("There was an error posting your comment");
    }
})

// Like photo
let like = document.getElementById("likeButton");
like.addEventListener("click", async () => {

});