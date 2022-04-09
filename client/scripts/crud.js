export async function createUser(first_name, last_name, username, email, password) {
  const response = await fetch(`/create_user?
                                first_name=${first_name}&
                                last_name=${last_name}&
                                username=${username}&
                                email=${first_name}&
                                password=${first_name}`,
                                { method: 'POST' });
  const data = await response.json();
  return data;
}

export async function createPost(user_id, picture, desciption) {
  const response = await fetch(`/create_post?
                                user_id=${user_id}&
                                picture=${picture}&
                                description=${desciption}`, 
                                { method: 'POST' });
  const data = await response.json();
  return data;
}

export async function createComment(post_id, user_id, comment_text) {
  const response = await fetch(`/create_comment?
                                post_id=${post_id}&
                                user_id=${user_id}&
                                comment_text=${comment_text}`,
                                { method: 'POST' });
  const data = await response.json();
  return data;
}



export async function updateUser(user_id, first_name, last_name, username, profile_picture) {
  try {
    const response = await fetch(`/update_user?
                                  user_id=${user_id}&
                                  first_name=${first_name}&
                                  last_name=${last_name}&
                                  username=${username}&
                                  profile_picture=${profile_picture}`,
                                  { method: 'PUT', });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePost(post_id, new_desc) {
  try {
    const response = await fetch(`/update_post?
                                  post_id=${post_id}&
                                  new_desc=${new_desc}`, 
                                  { method: 'PUT' });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateLike(post_id, add) {
  try {
    const response = await fetch(`/update_like?
                                  post_id=${post_id}&
                                  add=${add}`,
                                  { method: 'PUT' });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}


export async function deletePost(post_id) {
  try {
    const response = await fetch(`/delete_post?
                                  post_id=${post_id}`,
                                  { method: 'DELETE', });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteComment(comment_id) {
  try {
    const response = await fetch(`/delete_comment?
                                  comment_id=${comment_id}`,
                                  { method: 'DELETE' });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}