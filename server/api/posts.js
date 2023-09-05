const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
} = require('../db/helpers/posts');

//Create Post

// POST a new post
router.post('/', async (req, res, next) => {
    try {
      const newPost = req.body; // Assuming the request body contains post data
      const createdPost = await createPost(newPost); // Call the function to create a new post
      res.send(201).json(createdPost); // Respond with the created post and HTTP status 201 (Created)
    } catch (error) {
      next(error); // Handle errors
    }
  });
  
  // GET all posts
  router.get('/', async (req, res, next) => {
    try {
      const posts = await getAllPosts(); // Call the function to get all posts
      res.send(posts); // Send the posts as a JSON response
    } catch (error) {
      next(error); // Handle errors
    }
  });

  module.exports = router;