import React from "react";

export default function User({ user }) {
  return (
    <div>
      <p>User ID: {user.userId}</p>
      <p>Username: {user.username}</p>
      {/* Add more user details as needed */}
    </div>
  );
}
