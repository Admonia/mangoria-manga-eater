import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <h1>MANGORIA</h1>
      <ul className="nav-links">
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/anime">Anime</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
        <Link to="/signup">Signup</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css"; // Import your Navbar styles

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to="/">Mangoria~ Manga-eater</Link>
//       </div>
//       <ul className="navbar-menu">
//         <li className="navbar-item">
//           <Link to="/users">Users</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/anime">Anime</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/posts">Posts</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;




// Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom"; // If using React Router for navigation

// function Navbar() {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/users">Users</Link>
//         </li>
//         <li>
//           <Link to="/anime">Anime</Link>
//         </li>
//         <li>
//           <Link to="/posts">Posts</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
