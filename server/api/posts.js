const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../db/helpers/posts');

// Create Post
router.post('/', async (req, res, next) => {
  try {
    const newPost = req.body;
    const createdPost = await createPost(newPost);
    res.status(201).json(createdPost);
  } catch (error) {
    next(error); // Pass errors to the error handling middleware
  }
});

// Get All Posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts); // Respond with all posts
  } catch (error) {
    next(error);
  }
});

// Get Post by ID
router.get('/:id', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await getPostById(postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Update Post by ID
router.put('/:id', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id);
    const updatedPostData = req.body;
    const updatedPost = await updatePost(postId, updatedPostData);

    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Delete Post by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id);
    const deletedPost = await deletePost(postId);

    if (deletedPost) {
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;




