const express = require('express');
const router = express.Router();
const {
    createAnime,
    getAllAnime,
    getAnimeById,
    updateAnime,
    deleteAnime,
} = require('../db/helpers/anime'); // Assuming you have anime-related database helper functions

// Create Anime
router.post('/', async (req, res, next) => {
    try {
        const newAnime = req.body;
        const createdAnime = await createAnime(newAnime); // Call the function to create a new anime
        res.status(201).json(createdAnime); // Respond with the created anime and HTTP status 201 (Created)
    } catch (error) {
        next(error); // Handle errors
    }
});

// Get All Anime
router.get('/', async (req, res, next) => {
    try {
        const animeList = await getAllAnime(); // Call the function to get all anime
        res.json(animeList); // Send the anime list as a JSON response
    } catch (error) {
        next(error); // Handle errors
    }
});

// Get Anime by ID
router.get('/:id', async (req, res, next) => {
    try {
        const animeId = parseInt(req.params.id); // Parse the anime ID from the URL

        const anime = await getAnimeById(animeId); // Call the function to get anime by ID

        if (anime) {
            res.json(anime); // Send the anime data as a JSON response
        } else {
            res.status(404).json({ message: 'Anime not found' }); // Anime not found
        }
    } catch (error) {
        next(error); // Handle errors
    }
});

// Update Anime by ID
router.put('/:id', async (req, res, next) => {
    try {
        const animeId = parseInt(req.params.id);
        const updatedAnimeData = req.body;
        const updatedAnime = await updateAnime(animeId, updatedAnimeData); // Call the function to update anime by ID

        if (updatedAnime) {
            res.json(updatedAnime); // Send the updated anime data as a JSON response
        } else {
            res.status(404).json({ message: 'Anime not found' }); // Anime not found
        }
    } catch (error) {
        next(error); // Handle errors
    }
});

// Delete Anime by ID
router.delete('/:id', async (req, res, next) => {
  try {
    // Parse the animeId from the URL parameter
    const animeId = parseInt(req.params.id);

    // Call the deleteAnime function to delete the anime by ID
    const deletedAnime = await deleteAnime(animeId);

    // Check if the anime was successfully deleted
    if (deletedAnime) {
      res.json({ message: 'Anime deleted' }); // Respond with a message indicating that the anime was deleted
    } else {
      res.status(404).json({ message: 'Anime not found' }); // Anime not found
    }
  } catch (error) {
    next(error); // Handle errors
  }
});



module.exports = router;



// const express = require('express');
// const router = express.Router();
// const {
//     createAnime,
//     getAllAnime,
// } = require('../db/helpers/anime');

// // Create Anime

// // POST a new anime
// router.post('/', async (req, res, next) => {
//     try {
//       const newAnime = req.body; // Assuming the request body contains anime data
//       const createdAnime = await createAnime(newAnime); // Call the function to create a new anime
//       res.status(201).json(createdAnime); // Respond with the created anime and HTTP status 201 (Created)
//     } catch (error) {
//       next(error); // Handle errors
//     }
//   });
  
//   // GET all anime
//   router.get('/', async (req, res, next) => {
//     try {
//       const animeList = await getAllAnime(); // Call the function to get all anime
//       res.json(animeList); // Send the anime list as a JSON response
//     } catch (error) {
//       next(error); // Handle errors
//     }
//   });

// module.exports = router;
