const express = require('express');
const router = express.Router();
const {
    createAnime,
    getAllAnime,
} = require('../db/helpers/anime');

// Create Anime

// POST a new anime
router.post('/', async (req, res, next) => {
    try {
      const newAnime = req.body; // Assuming the request body contains anime data
      const createdAnime = await createAnime(newAnime); // Call the function to create a new anime
      res.status(201).json(createdAnime); // Respond with the created anime and HTTP status 201 (Created)
    } catch (error) {
      next(error); // Handle errors
    }
  });
  
  // GET all anime
  router.get('/', async (req, res, next) => {
    try {
      const animeList = await getAllAnime(); // Call the function to get all anime
      res.json(animeList); // Send the anime list as a JSON response
    } catch (error) {
      next(error); // Handle errors
    }
  });

module.exports = router;
