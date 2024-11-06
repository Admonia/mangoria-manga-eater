import React, { useState, useEffect } from "react";
import {
  fetchAllAnime,
  createAnime,
  updateAnime,
  deleteAnime,
} from "../helpers/anime";
import "./anime.css"; // Import your CSS file

export default function Anime() {
  const [animeList, setAnimeList] = useState([]);
  const [newAnime, setNewAnime] = useState({ name: "", description: "" });
  const [editingAnimeId, setEditingAnimeId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchAnimeData();
  }, []);

  useEffect(() => {
    if (editingAnimeId) {
      // Set form fields when editingAnimeId is set
      const animeToEdit = animeList.find((anime) => anime.animeId === editingAnimeId);
      setEditFormData({ name: animeToEdit.name, description: animeToEdit.description });
    } else {
      // Clear form fields if no anime is being edited
      setEditFormData({ name: "", description: "" });
    }
  }, [editingAnimeId, animeList]);

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
      if (!editingAnimeId) return;

      const updatedAnime = await updateAnime(editingAnimeId, editFormData);
      setAnimeList((prevAnimeList) =>
        prevAnimeList.map((anime) =>
          anime.animeId === updatedAnime.animeId ? updatedAnime : anime
        )
      );
      setEditFormData({ name: "", description: "" }); // Clear form after editing
      setEditingAnimeId(null);
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

  const handleChangeEditField = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <div className="section-container">
      {/* Display anime data */}
      {animeList.map((anime) => (
        <div key={anime.animeId} className="section-box">
          {editingAnimeId === anime.animeId ? (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleChangeEditField}
                placeholder="Name"
              />
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleChangeEditField}
                placeholder="Description"
              />
              <button onClick={handleEditAnime}>Save Changes</button>
              <button onClick={() => setEditingAnimeId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <h3>{anime.name}</h3>
              <p>{anime.description}</p>
              <button onClick={() => handleDeleteAnime(anime.animeId)}>Delete</button>
              <button onClick={() => setEditingAnimeId(anime.animeId)}>Edit</button>
            </>
          )}
        </div>
      ))}

      {/* Create anime form */}
      <div className="section-box">
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
        <button onClick={handleCreateAnime}>Create Anime</button>
      </div>
    </div>
  );
}











