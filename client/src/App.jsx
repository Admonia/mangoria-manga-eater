import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "./helpers/users";
import { fetchAllAnime } from "./helpers/anime";
import { fetchAllPosts } from "./helpers/posts"; // Import the fetchAllPosts function
import User from "./components/users";
import Anime from "./components/Anime";
import Posts from "./components/Posts"; // Import the Posts component

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [allAnime, setAllAnime] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [users, anime, posts] = await Promise.all([
          fetchAllUsers(),
          fetchAllAnime(),
          fetchAllPosts(), // Fetch posts data
        ]);

        setAllUsers(users);
        setAllAnime(anime);
        setAllPosts(posts); // Set the posts data
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>User and Anime List App</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <h2>User List</h2>
          <ul>
            {allUsers.map((user) => (
              <li key={user.userId}>
                <User user={user} />
              </li>
            ))}
          </ul>

          <h2>Anime List</h2>
          <ul>
            {allAnime.map((anime) => (
              <li key={anime.animeId}>
                <Anime anime={anime} />
              </li>
            ))}
          </ul>

          <Posts posts={allPosts} /> {/* Include the Posts component */}
        </div>
      )}
    </div>
  );
}

export default App;








// import React, { useState, useEffect } from "react";
// import { fetchAllUsers } from "./helpers/users";
// import User from "./components/users"; // Import the User component

// function App() {
//   // useState
//   const [allUsers, setAllUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const users = await fetchAllUsers();
//         setAllUsers(users);
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
//       <h1>Users For Mangoria</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error.message}</p>
//       ) : (
//         <ul>
//           {allUsers.map((user) => (
//             <li key={user.userId}>
//               <User user={user} /> {/* Pass each user to the User component */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default App;


