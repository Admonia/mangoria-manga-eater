import React from "react";

export default function Posts({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.postId}>
          <p>Post ID: {post.postId}</p>
          <p>Title: {post.title}</p>
          <p>Description: {post.body}</p>
          {/* Add more post details as needed */}
        </div>
      ))}
    </div>
  );
}
