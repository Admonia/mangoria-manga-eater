const client = require('../client')

const createPost = async ({ title, body }) => {
    try {
        const {
            rows: [post],
       
        } = await client.query (
         
            `
                INSERT INTO posts(title, body)
                VALUES($1, $2)
                RETURNING *;
            `,
            [title, body]
        )
        console.log(post)
        return post
    } catch (error) {
        throw error
    }
}
const getAllPosts = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM posts;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getPostById = async (postId) => {
    try {
      const query = {
        text: 'SELECT * FROM posts WHERE "postId" = $1',
        values: [postId], // Pass the userId as a parameter
      };
  
      const { rows } = await client.query(query);
  
      if (rows.length === 0) {
        return null; // User not found
      }
  
      return rows[0]; // Return the first user found (assuming userId is unique)
    } catch (error) {
      throw error;
    }
  };

  const updatePost = async (postId, { title, body }) => {
    try {
      const query = {
        text: 'UPDATE posts SET title = $2, body = $3 WHERE "postId" = $1 RETURNING *',
        values: [postId, title, body],
      };
  
      const { rows } = await client.query(query);
  
      if (rows.length === 0) {
        return null; // Post not found
      }
  
      return rows[0]; // Return the updated post
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };
  
  // const updatePost = async (userId, postId, { title, body }) => {
  //   try {
  //     const query = {
  //       text: 'UPDATE posts SET title = $2, body = $3 WHERE "userId" = $1 AND "postId" = $4 RETURNING *',
  //       values: [userId, title, body, postId],
  //     };
  
  //     const { rows } = await client.query(query);
  
  //     if (rows.length === 0) {
  //       return null; // Post not found
  //     }
  
  //     return rows[0]; // Return the updated post
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //     throw error;
  //   }
  // };
  
  const deletePost = async (postId) => {
    try {
      const {
        rows: [deletedPost],
      } = await client.query(
        `
        DELETE FROM posts
        WHERE "postId" = $1
        RETURNING *;
        `,
        [postId]
      );
  
      if (!deletedPost) {
        console.error(`Post with ID ${postId} not found`);
        return null; // Handle the case when the post doesn't exist
      }
  
      console.log(`Deleted post with ID ${postId}`);
      return deletedPost;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };
  
  // const deletePost = async (postId) => {
  //   try {
  //     const {
  //       rows: [deletedPost],
  //     } = await client.query(
  //       `
  //       DELETE FROM posts
  //       WHERE "postId" = $1
  //       RETURNING *;
  //       `,
  //       [userId]
  //     );
  
  //     if (!deletedPost) {
  //       console.error(`Post with ID ${postId} not found`);
  //       return null; // Handle the case when the user doesn't exist
  //     }
  
  //     console.log(`Deleted post with ID ${postId}`);
  //     return deletedPost;
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //     throw error;
  //   }
  // };
  
  
  
module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost }