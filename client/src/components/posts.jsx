import React, { useState, useEffect } from "react";
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../helpers/posts";


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await fetchAllPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);
      setNewPost({ title: "", body: "" }); // Clear form after creating
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleEditPost = async () => {
    try {
      if (!editingPost) return;

      const updatedPost = await updatePost(editingPost.postId, newPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post
        )
      );
      setNewPost({ title: "", body: "" }); // Clear form after editing
      setEditingPost(null);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.postId !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      {/* Display posts data */}
      {posts.map((post) => (
        <div key={post.postId}>
          <p>Post ID: {post.postId}</p>
          <p>Title: {post.title}</p>
          <p>Description: {post.body}</p>
          <button onClick={() => handleDeletePost(post.postId)}>Delete</button>
          <button onClick={() => setEditingPost(post)}>Edit</button>
        </div>
      ))}

      {/* Create or edit post form */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        {editingPost ? (
          <button onClick={handleEditPost}>Edit Post</button>
        ) : (
          <button onClick={handleCreatePost}>Create Post</button>
        )}
      </div>
    </div>
  );
}







// import React from "react";

// export default function Posts({ posts }) {
//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.postId}>
//           <p>Post ID: {post.postId}</p>
//           <p>Title: {post.title}</p>
//           <p>Description: {post.body}</p>
//           {/* Add more post details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// }
