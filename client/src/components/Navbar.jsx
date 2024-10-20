import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <h1>MANGORIA</h1>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Dashboard</Link> {/* New link to the Dashboard */}
        </li>
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
      </ul>
    </nav>
  );
}

export default Navbar;














// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css"; // Import your CSS file


// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h1>MANGORIA</h1>
//       <ul className="nav-links">
//         <li>
//           <Link to="/users">Users</Link>
//         </li>
//         <li>
//           <Link to="/anime">Anime</Link>
//         </li>
//         <li>
//           <Link to="/posts">Posts</Link>
//         </li>
//         <li>
//         <Link to="/signup">Signup</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;


