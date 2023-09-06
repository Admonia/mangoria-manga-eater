import React from "react";


export default function Anime({ anime }) {
  return (
    <div>
      <p>Anime ID: {anime.animeId}</p>
      <p>Anime Name: {anime.name}</p>
      <p>Anime Description: {anime.description}</p>
      {/* Add more anime details as needed */}
    </div>
  );
}

