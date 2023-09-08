import React from "react";
import "./Users.css"; // Import your CSS file

export default function Users({ users }) {
  return (
    <div>
      <h2 className="user-heading">Meet Our Favorite Users!</h2>
      <div className="user-cards">
        {users.map((user) => (
          <div className="user-card" key={user.userId}>
            <p>User ID: {user.userId}</p>
            <p>Username: {user.username}</p>
            {/* Add more user details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}



// import React from "react";

// export default function Users({ users }) {
//   return (
//     <div>
//       <h2>Meet Our Favorite Users!</h2>
//       {users.map((user) => (
//         <div key={user.userId}>
//           <p>User ID: {user.userId}</p>
//           <p>Username: {user.username}</p>
//           {/* Add more user details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// }



