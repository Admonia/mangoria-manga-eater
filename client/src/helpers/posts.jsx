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
