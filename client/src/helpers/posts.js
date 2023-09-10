// helpers/posts.js

const baseUrl = 'http://localhost:8089';

export async function fetchAllPosts() {
  try {
    const response = await fetch(`${baseUrl}/api/posts`);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw the error to handle it in your component
  }
}

export async function createPost(newPost) {
  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      const createdPost = await response.json();
      return createdPost;
    } else {
      throw new Error('Failed to create post');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function updatePost(postId, updatedPost) {
  try {
    const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });
    if (response.ok) {
      const updatedPost = await response.json();
      return updatedPost;
    } else {
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function patchPost(postId, updatedFields) {
  try {
    const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    if (response.ok) {
      const patchedPost = await response.json();
      return patchedPost;
    } else {
      throw new Error('Failed to patch post');
    }
  } catch (error) {
    console.error('Error patching post:', error);
    throw error;
  }
}

export async function deletePost(postId) {
  try {
    const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return true; // Successful deletion
    } else {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
