import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Anime from "./components/Anime";
import Posts from "./components/Posts";
import { fetchAllUsers } from "./helpers/users";
import { fetchAllAnime } from "./helpers/anime";
import { fetchAllPosts } from "./helpers/posts";
// import LoginForm from "./components/LoginForm";
import Signup from './components/Signup';
import Login from './components/Login';
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [anime, setAnime] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedUsers, fetchedAnime, fetchedPosts] = await Promise.all([
          fetchAllUsers(),
          fetchAllAnime(),
          fetchAllPosts(),
        ]);

        setUsers(fetchedUsers);
        setAnime(fetchedAnime);
        setPosts(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/anime" element={<Anime anime={anime} />} />
          <Route path="/posts" element={<Posts posts={posts} />} />
          <Route path="/signup" element={<Signup signup={Signup} />} />
          <Route path="/login" element={<Login login={Login} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;





// import React, { useState, useEffect } from "react";
// import { fetchAllUsers } from "./helpers/users";
// import { fetchAllAnime } from "./helpers/anime";
// import { fetchAllPosts } from "./helpers/posts"; // Import the fetchAllPosts function
// import User from "./components/users";
// import Anime from "./components/Anime";
// import Posts from "./components/Posts"; // Import the Posts component

// function App() {
//   const [allUsers, setAllUsers] = useState([]);
//   const [allAnime, setAllAnime] = useState([]);
//   const [allPosts, setAllPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [users, anime, posts] = await Promise.all([
//           fetchAllUsers(),
//           fetchAllAnime(),
//           fetchAllPosts(), // Fetch posts data
//         ]);

//         setAllUsers(users);
//         setAllAnime(anime);
//         setAllPosts(posts); // Set the posts data
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>User and Anime List App</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error.message}</p>
//       ) : (
//         <div>
//           <h2>User List</h2>
//           <ul>
//             {allUsers.map((user) => (
//               <li key={user.userId}>
//                 <User user={user} />
//               </li>
//             ))}
//           </ul>

//           <h2>Anime List</h2>
//           <ul>
//             {allAnime.map((anime) => (
//               <li key={anime.animeId}>
//                 <Anime anime={anime} />
//               </li>
//             ))}
//           </ul>

//           <Posts posts={allPosts} /> {/* Include the Posts component */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;














