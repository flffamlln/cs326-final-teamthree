
// Use this as an example
/**
 * Create a new user in the database
 * @param {String} first_name 
 * @param {String} last_name 
 * @param {String} username 
 * @param {String} email 
 * @param {String} password 
 * @returns A success if the user was successfully created, a failure otherwise
 */
export async function createUser(first_name, last_name, username, email, password) {
  const user_data = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password
  };
  const response = await fetch(`/create_user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user_data)
  });

  const data = await response.json();
  return data;
}

export async function createPost(user_id, picture, desciption) {
  
}

export async function createComment(post_id, user_id, comment_text) {
  
}



export async function getUserPosts(user_id, num_posts) {
  
}



export async function updateUser(user_id, new_first_name, new_last_name, new_username, new_profile_picture) {
  try {
    const new_data = {
      user_id: user_id,
      new_first_name: new_first_name,
      new_last_name: new_last_name,
      new_username: new_username,
      new_profile_picture: new_profile_picture
    };
    const response = await fetch(`/update_user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_data)
    });
    return response.status;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePost(post_id, new_desc) {
  try {
    const new_data = {
      post_id: post_id,
      new_desc: new_desc
    };
    const response = await fetch(`/update_post?post_id=${post_id}&new_desc=${new_desc}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_data)
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateLike(post_id, add) {
  
}


export async function deletePost(post_id) {
  
}

export async function deleteComment(comment_id) {
  
}