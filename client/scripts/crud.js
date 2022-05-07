/**
 * Create a new user in the database
 * @param {string} first_name the user's first name
 * @param {string} last_name  the user's last name
 * @param {string} username   the user's username
 * @param {string} email      the user's email
 * @param {string} password   the user's password
 * @returns 200 if the user was successfully created, 400 otherwise
 */
export async function createUser(first_name, last_name, username, email, password) {
  try {
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
  
    return response.status;
  } catch(err) {
    console.log(err);
  }
}

/**
 * Create a new post in the database
 * @param {int} user_id the user's id
 * @param {string} picture_path post photo
 * @param {string} description   the post description
 * @param {string} tag the post tag
 * @returns 200 if the post was successfully created, 400 otherwise
 */
export async function createPost(user_id, picture_path, description, tag) {
  try {
    const post_data = {
      user_id: user_id,
      picture_path: picture_path,
      description: description,
      tag: tag
    };
    const response = await fetch('/create_post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post_data)
    });
    return response.status;
  } catch(err) {
    console.log(err);
  }
}

/**
 * Create a new comment in the database
 * @param {string} post_id the post's id
 * @param {string} user_id the user's id
 * @param {string} comment   the comment text
 * @returns 200 if the comment was successfully created, 400 otherwise
 */
export async function createComment(comment_id, post_id, user_id, comment) {
  try {
    const new_data = {
      comment_id: comment_id,
      post_id: post_id,
      user_id: user_id,
      comment: comment,
    };
    const response = await fetch(`/add_comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_data)
    });
    return response.status;
  } catch(err) {
    console.log(err);
  }
}

export async function uploadPP(new_file) {
  try {
    const picture = new FormData();
    picture.append('newFile', new_file);
    const response = await fetch('/upload_pp', {
      method: 'POST',
      body: picture
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function downloadPP(newpp_path) {
  try {
    const response = await fetch(`/download_pp?&newpp_path=${newpp_path}`, {
      method: 'GET',
    });

    if (response.status === 200 && response.ok) {
      return response.blob();
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Return the post information for a given post
 * @param {string} post_id 
 * @returns Post information
 */
 export async function getPost(post_id) {
  try {
    const response = await fetch(`/get_post?post_id=${post_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false}
  }
}

/**
 * Gets all posted photos for the feed that 
 * are tagged as the specified tag
 * @param {string} tag
 * @returns Post information
 */
 export async function getFeed(tag) {
  try {
    const response = await fetch(`/get_feed?tag=${tag}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = { status: response.status, ok: response.ok, post: await response.json() };
    return data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Return the number of posts created 
 * @returns Post information
 */
 export async function getNumPosts() {
  try {
    const response = await fetch(`/get_num_posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false}
  }
}


/**
 * Returns the username given user_id
 * @param {string} user_id 
 * @returns Post information
 */
 export async function getUsername(user_id) {
  try {
    const response = await fetch(`/get_username?user_id=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false}
  }
}

/**
 * Return the comments for a post
 * @param {string} post_id 
 * @returns Comments
 */
 export async function getComments(post_id) {
  try {
    const response = await fetch(`/get_comments?post_id=${post_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false}
  }
}

/**
 * Return the 'num_posts' most recent posts for a user
 * @param {string} user_id 
 * @returns The first name, last name, username, and email for a user
 */
 export async function getUserInfo(user_id) {
  try {
    const response = await fetch(`/get_user_info?user_id=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false };
  }
}

/**
 * Return the 'num_posts' most recent posts for a user
 * @param {string} user_id 
 * @param {number} num_posts_requested 
 * @param {number} num_posts_present 
 * @returns An array of posts
 */
export async function getUserPosts(user_id) {
  try {
    const response = await fetch(`/get_user_posts?user_id=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = { status: response.status, ok: response.ok, posts_arr: await response.json() };
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false };
  }
}

/**
 * Return the number of posts a user has uploaded
 * @param {string} user_id 
 * @returns {number} A number representing the amount of posts a user has uploaded
 */
 export async function getUserPostCount(user_id) {
  try {
    const response = await fetch(`/get_user_post_count?user_id=${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = { status: response.status, ok: response.ok, post_count: await response.json() };
    return data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Return the number of likes a post has
 * @param {string} post_id 
 * @returns {number} A number representing the amount of likes the post has
 */
 export async function getLikes(post_id) {
  try {
    const response = await fetch(`/get_likes?post_id=${post_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return { status: 500, ok: false}
  }
}


/**
 * 
 * @param {string} user_id              the user's id
 * @param {string} new_first_name       may or may not be changed from its current state
 * @param {string} new_last_name        may or may not be changed from its current state
 * @param {string} new_username         may or may not be changed from its current state
 * @param {string} new_profile_picture  may or may not be changed from its current state
 * @returns 200 if the user was successfully updated, 500 otherwise
 */
export async function updateUser(user_id, new_first_name, new_last_name, new_username, new_email, newpp_path) {
  try {
    const new_data = {
      user_id: user_id,
      new_first_name: new_first_name,
      new_last_name: new_last_name,
      new_username: new_username,
      new_email: new_email,
      newpp_path: newpp_path
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

export async function updatePassword(user_id, current_password, new_password) {
  try {
    const new_data = {
      user_id: user_id,
      current_password: current_password,
      new_password: new_password
    };
    const response = await fetch('/update_password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_data)
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Update the description for a post
 * @param {string} post_id  the post id
 * @param {string} new_desc the new description for the post
 * @returns 200 if the post was successfully updated, 400 otherwise
 */
export async function updatePost(post_id, new_desc) {
  try {
    const new_data = {
      post_id: post_id,
      new_desc: new_desc
    };
    const response = await fetch(`/update_post`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new_data)
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Update the description for a post
 * @param {string} like_id  the post id of post being liked
 * @param {string} post_id  the post id of post being liked
 * @param {string} user_id the user id of liker
 * @returns 200 if the post was successfully updated, 400 otherwise
 */
export async function updateLike(like_id, post_id, user_id) {
  try {
    const new_data = {
      like_id: like_id,
      post_id: post_id,
      user_id: user_id
    };
    const response = await fetch(`/update_likes`, {
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
