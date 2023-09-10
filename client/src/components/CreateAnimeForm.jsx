import React, { useState } from "react";
import { createAnime, updateAnime } from "../helpers/anime"; // Adjust the import path accordingly

export default function CreateAnimeForm({ onAnimeCreated, isEditing, initialData }) {
  const [animeData, setAnimeData] = useState(initialData || { name: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnimeData({
      ...animeData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        // Call the updateAnime function for editing
        await updateAnime(animeData);
      } else {
        // Call the createAnime function for creating
        const createdAnime = await createAnime(animeData);
        if (onAnimeCreated) {
          onAnimeCreated(createdAnime);
        }
      }

      // Reset the form data
      setAnimeData({ name: "", description: "" });
    } catch (error) {
      console.error(`Error ${isEditing ? "editing" : "creating"} anime:`, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for creating/editing anime */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={animeData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={animeData.description}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">{isEditing ? "Edit Anime" : "Create Anime"}</button>
    </form>
  );
}










// import "./Anime.css"; // Import your CSS file
// import React, { useState } from "react";
// import { createAnime } from "../helpers/anime"; // Adjust the path accordingly

// export default function CreateAnimeForm({ onAnimeCreated }) {
//   const [newAnime, setNewAnime] = useState({
//     name: "",
//     description: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewAnime({
//       ...newAnime,
//       [name]: value,
//     });
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const createdAnime = await createAnime(newAnime);
//       // Use the onAnimeCreated prop to handle the created anime
//       onAnimeCreated(createdAnime);
//       setNewAnime({
//         name: "",
//         description: "",
//         imageUrl: "",
//       });
//     } catch (error) {
//       console.error("Error creating anime:", error);
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Form fields for creating anime */}
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={newAnime.name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           name="description"
//           value={newAnime.description}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button type="submit">Create Anime</button>
//     </form>
//   );
// }








