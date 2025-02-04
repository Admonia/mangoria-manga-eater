import React, { useState, useEffect } from "react";
import {
  fetchAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../helpers/posts";
import "./posts.css"; // Import your CSS file

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (editingPostId) {
      // Set form fields when editingPostId is set
      const postToEdit = posts.find((post) => post.postId === editingPostId);
      setEditFormData({ title: postToEdit.title, body: postToEdit.body });
    } else {
      // Clear form fields if no post is being edited
      setEditFormData({ title: "", body: "" });
    }
  }, [editingPostId, posts]);

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

  const handleEditPost = async (postId) => {
    try {
      const updatedPost = await updatePost(postId, editFormData);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === updatedPost.postId ? updatedPost : post
        )
      );
      setEditingPostId(null); // Reset editingPostId state
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

  const handleChangeEditField = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <div className="section-container">
      {/* Display posts data */}
      {posts.map((post) => (
        <div key={post.postId} className="section-box">
          {editingPostId === post.postId ? (
            <div className="edit-form">
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleChangeEditField}
              />
              <textarea
                name="body"
                value={editFormData.body}
                onChange={handleChangeEditField}
              />
              <button onClick={() => handleEditPost(post.postId)}>Save Changes</button>
              <button onClick={() => setEditingPostId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <p>Post ID: {post.postId}</p>
              <p>Title: {post.title}</p>
              <p>Description: {post.body}</p>
              <button onClick={() => handleDeletePost(post.postId)}>Delete</button>
              <button onClick={() => setEditingPostId(post.postId)}>Edit</button>
            </>
          )}
        </div>
      ))}

      {/* Create post form */}
      <div className="section-box">
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
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
}


















