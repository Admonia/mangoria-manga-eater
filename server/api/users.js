const express = require('express');
const router = express.Router();
const {
  getAllUsers,  // Import the function to get all users from your database
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../db/helpers/users');

// GET all users
router.get('/', async (req, res, next) => {
  console.log(res)
  try{
      const user = await getAllUsers();
      res.send(user);
  } catch (error) {
      next(error);
  }
});
// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); // Parse the user ID from the URL

    const user = await getUserById(userId); // Call the function to get a user by ID

    if (user) {
      res.json(user); // Send the user data as a JSON response
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  } catch (error) {
    next(error); // Handle errors
  }
});

// POST a new user
router.post('/', async (req, res, next) => {
  try {
    const newUser = req.body; 
    const createdUser = await createUser(newUser); // Call the function to create a new user
    res.status(201).json(createdUser); // Respond with the created user and HTTP status 201 (Created)
  } catch (error) {
    next(error); // Handle errors
  }
});

//patch 
// PATCH (Partial Update) a user by ID
// router.patch('/:id', async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.id); 
//     const updatedUserData = req.body; 
//     const updatedUser = await updateUser(userId, updatedUserData); // Call the function to update a user by ID

//     if (updatedUser) {
//       res.json(updatedUser); // Send the updated user data as a JSON response
//     } else {
//       res.status(404).json({ message: 'User not found' }); // User not found
//     }
//   } catch (error) {
//     next(error); // Handle errors
//   }
// });


// PUT (Update) a user by ID
router.put('/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); 
    const updatedUserData = req.body; 
    const updatedUser = await updateUser(userId, updatedUserData); // Call the function to update a user by ID

    if (updatedUser) {
      res.json(updatedUser); // Send the updated user data as a JSON response
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  } catch (error) {
    next(error); // Handle errors
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id); 
    const deletedUser = await deleteUser(userId); 

    if (deletedUser) {
      res.json({ message: 'User deleted' }); // Respond with a message indicating that the user was deleted
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  } catch (error) {
    next(error); // Handle errors
  }
});

module.exports = router;



