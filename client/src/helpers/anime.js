const baseUrl = 'http://localhost:8089'; // Replace with your API URL

// Fetch all anime
export async function fetchAllAnime() {
  try {
    const response = await fetch(`${baseUrl}/api/anime`);
    const anime = await response.json();
    return anime;
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw error;
  }
}

// Create new anime
export async function createAnime(newAnime) {
  try {
    const response = await fetch(`${baseUrl}/api/anime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnime),
    });

    if (!response.ok) {
      throw new Error(`Failed to create anime (Status: ${response.status})`);
    }

    const createdAnime = await response.json();
    return createdAnime;
  } catch (error) {
    console.error("Error creating anime:", error);
    throw error;
  }
}

// Update anime by ID
export async function updateAnime(animeId, updatedAnimeData) {
  try {
    const response = await fetch(`${baseUrl}/api/anime/${animeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAnimeData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update anime (Status: ${response.status})`);
    }

    const updatedAnime = await response.json();
    return updatedAnime;
  } catch (error) {
    console.error("Error updating anime:", error);
    throw error;
  }
}


export async function deleteAnime(animeId) {
  try {
    // Construct the URL for deleting the anime
    const deleteUrl = `${baseUrl}/api/anime/${animeId}`;
    console.log('DELETE URL:', deleteUrl); // Add this line for debugging

    // Send a DELETE request to the server
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });

    console.log('Response Status:', response.status); // Add this line for debugging

    if (!response.ok) {
      const errorMessage = `Failed to delete anime (Status: ${response.status})`;
      console.error(errorMessage);

      // Handle specific error cases here if needed (e.g., 404)
      if (response.status === 404) {
        throw new Error(`Anime with ID ${animeId} not found`);
      } else {
        throw new Error(errorMessage);
      }
    }

    // If the deletion was successful, you can return a success message or
    // simply indicate that the anime was deleted.
    return { message: 'Anime deleted successfully' };
  } catch (error) {
    console.error("Error deleting anime:", error);
    throw error;
  }
}


// Read anime by ID
export async function readAnime(animeId) {
  try {
    const response = await fetch(`${baseUrl}/api/anime/${animeId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch anime (Status: ${response.status})`);
    }
    const anime = await response.json();
    return anime;
  } catch (error) {
    console.error("Error reading anime:", error);
    throw error;
  }
}






// import React, { useState, useEffect } from "react";

// const baseUrl = 'http://localhost:8089';

// export async function fetchAllAnime() {
//     try {
//         const response = await fetch(`${baseUrl}/api/anime`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching anime data:", error);
//         throw error; // Re-throw the error to handle it in your component
//     }
// }





