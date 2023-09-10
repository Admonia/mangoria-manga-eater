import React, { useState, useEffect } from "react";
import {
  fetchAllAnime,
  createAnime,
  updateAnime,
  deleteAnime,
} from "../helpers/anime";

export default function Anime() {
  const [animeList, setAnimeList] = useState([]);
  const [newAnime, setNewAnime] = useState({ name: "", description: "" });
  const [editingAnime, setEditingAnime] = useState(null);

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

  const handleCreateAnime = async () => {
    try {
      const createdAnime = await createAnime(newAnime);
      setAnimeList([...animeList, createdAnime]);
      setNewAnime({ name: "", description: "" }); // Clear form after creating
    } catch (error) {
      console.error("Error creating anime:", error);
    }
  };

  const handleEditAnime = async () => {
    try {
      if (!editingAnime) return;

      const updatedAnime = await updateAnime(editingAnime.animeId, newAnime);
      setAnimeList((prevAnimeList) =>
        prevAnimeList.map((anime) =>
          anime.animeId === updatedAnime.animeId ? updatedAnime : anime
        )
      );
      setNewAnime({ name: "", description: "" }); // Clear form after editing
      setEditingAnime(null);
    } catch (error) {
      console.error("Error editing anime:", error);
    }
  };

  const handleDeleteAnime = async (animeId) => {
    try {
      await deleteAnime(animeId);
      setAnimeList(animeList.filter((anime) => anime.animeId !== animeId));
    } catch (error) {
      console.error("Error deleting anime:", error);
    }
  };

  return (
    <div>
      {/* Display anime data */}
      {animeList.map((anime) => (
        <div key={anime.animeId}>
          <h3>{anime.name}</h3>
          <p>{anime.description}</p>
          <button onClick={() => handleDeleteAnime(anime.animeId)}>Delete</button>
          <button onClick={() => setEditingAnime(anime)}>Edit</button>
        </div>
      ))}

      {/* Create or edit anime form */}
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newAnime.name}
          onChange={(e) => setNewAnime({ ...newAnime, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newAnime.description}
          onChange={(e) =>
            setNewAnime({ ...newAnime, description: e.target.value })
          }
        />
        {editingAnime ? (
          <button onClick={handleEditAnime}>Edit Anime</button>
        ) : (
          <button onClick={handleCreateAnime}>Create Anime</button>
        )}
      </div>
    </div>
  );
}




