import React from "react";
import "./Anime.css"; // Import your CSS file

export default function Anime({ anime }) {
  return (
    <div>
      <h2 className="anime-heading">Anime List</h2> {/* Apply the anime-heading class here */}
      <div className="anime-cards">
        {anime.map((animeItem) => (
          <div key={animeItem.animeId} className="anime-card">
            <p className="anime-info">Anime ID: {animeItem.animeId}</p>
            <p className="anime-info">Anime Name: {animeItem.name}</p>
            <p className="anime-info">Anime Description: {animeItem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}




