const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection

// Define API routes
router.get('/', async (req, res, next) => {
  try {
    // Query the database
    const results = await db.query('SELECT * FROM users');
    res.json(results.rows);
  } catch (error) {
    next(error);
  }
});

// Add more routes as needed (POST, PUT, DELETE, etc.)
router.post('/', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      // Validate input data here if necessary
  
      // Insert a new user into the database
      const result = await db.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
        [username, password]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  });
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Query the database to get a user by ID
      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  });
  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
      // Validate input data here if necessary
  
      // Update user information in the database
      const result = await db.query(
        'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *',
        [username, password, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  });
  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Delete a user from the database by ID
      const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  });
        

module.exports = router;
