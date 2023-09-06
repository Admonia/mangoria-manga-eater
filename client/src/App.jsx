import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "./helpers/users";
import User from "./components/users"; // Import the User component

function App() {
  // useState
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect
  useEffect(() => {
    async function fetchData() {
      try {
        const users = await fetchAllUsers();
        setAllUsers(users);
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
      <h1>Users For Mangoria</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {allUsers.map((user) => (
            <li key={user.userId}>
              <User user={user} /> {/* Pass each user to the User component */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;


