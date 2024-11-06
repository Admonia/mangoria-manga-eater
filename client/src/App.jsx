import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import Anime from "./components/Anime";
import Posts from "./components/Posts";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import { fetchAllUsers } from "./helpers/users";
import { fetchAllAnime } from "./helpers/anime";
import { fetchAllPosts } from "./helpers/posts";
import Signup from "./components/signup";
// import Signup from './components/Signup';
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/anime" element={<Anime anime={anime} />} />
          <Route path="/posts" element={<Posts posts={posts} />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add the dashboard route here */}
        </Routes>
      </div>
    </>
  );
}

export default App;
















