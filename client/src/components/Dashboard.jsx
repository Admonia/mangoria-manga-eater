// src/components/Dashboard.jsx

import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard weebs</p>
            <div className="card-container">
                <div className="card">
                    <h2>Anime is Lyf</h2>
                    <iframe
                        className="video"
                        src="https://www.youtube.com/embed/Vq1OvGJKtTc"
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <p>Watch your video above.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;














// // src/components/Dashboard.jsx
// import React from "react";
// import "./Dashboard.css"; // Import your CSS file

// function Dashboard() {
//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <p>Welcome to the dashboard!</p>
      
//       {/* Example cards */}
//       <div className="card-container">
//         <div className="card">
//           <h2>Users</h2>
//           <p>Manage your users here.</p>
//           <a href="/users">View Users</a>
//         </div>
//         <div className="card">
//           <h2>Anime</h2>
//           <p>Explore your favorite anime.</p>
//           <a href="/anime">View Anime</a>
//         </div>
//         <div className="card">
//           <h2>Posts</h2>
//           <p>Check out the latest posts.</p>
//           <a href="/posts">View Posts</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;














