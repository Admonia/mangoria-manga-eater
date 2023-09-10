import React, { useState, useEffect } from "react";
import { fetchAllAnime, deleteAnime, createAnime } from "../helpers/anime";
import CreateAnimeForm from "./CreateAnimeForm";

export default function Anime() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchAnimeData();
  }, []);

  const fetchAnimeData = async () => {
    try {
      const data = await fetchAllAnime();
      setAnimeList(data);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  };

  const handleDeleteAnime = async (animeId) => {
    console.log("Deleting anime with ID:", animeId);
  
    try {
      await deleteAnime(animeId);
      console.log("Anime deleted successfully.");
      setAnimeList((prevAnimeList) =>
        prevAnimeList.filter((anime) => anime.id !== animeId)
      );
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };
  
  

  const handleCreateAnime = async (newAnime) => {
    try {
      const createdAnime = await createAnime(newAnime);
      setAnimeList((prevAnimeList) => [...prevAnimeList, createdAnime]);
    } catch (error) {
      console.error("Error creating anime:", error);
    }
  };

  return (
    <div>
      <h2>Anime List</h2>
      <ul>
        {animeList.map((anime) => (
          <li key={anime.id}>
            <div>
              <h3>{anime.name}</h3>
              <p>{anime.description}</p>
              <button onClick={() => anime.id && handleDeleteAnime(anime.id)}>Delete</button>

            </div>
          </li>
        ))}
      </ul>

      <CreateAnimeForm onAnimeCreated={handleCreateAnime} />
    </div>
  );
}
