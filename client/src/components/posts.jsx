// components/Posts.jsx

import React from "react";

export default function Posts({ posts }) {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>Title: {post.title}</h3>
            <p>Body: {post.body}</p>
            {/* Add more post details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

