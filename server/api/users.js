const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByUsername } = require('../db/helpers/users');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// GET user by username
router.get('/username/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// POST a new user (for general user creation)
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Hash the password before creating a new user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = { ...req.body, password: hashedPassword };

    const createdUser = await createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error in POST route:', error.message);
    next(error);
  }
});

// POST user registration with duplicate username check
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Check if the username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }

    // Hash the password before creating a new user
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = { username, password: hashedPassword };

    const createdUser = await createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error('Error in registration route:', error.message);
    next(error);
  }
});

// PUT (Update) a user by ID
router.put('/:id', async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUserData = req.body;

  if (updatedUserData.password) {
    try {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, SALT_ROUNDS);
    } catch (error) {
      console.error('Error hashing password during update:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  try {
    const updatedUser = await updateUser(userId, updatedUserData);

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await deleteUser(userId);

    if (deletedUser) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {
//   getAllUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
//   getUserByUsername,
// } = require('../db/helpers/users');

// const SALT_ROUNDS = 10;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // Middleware to hash password before creating or updating user
// const hashPasswordMiddleware = async (req, res, next) => {
//   const { password } = req.body;

//   if (password) {
//     try {
//       const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//       req.body.password = hashedPassword;
//       next();
//     } catch (error) {
//       console.error('Error hashing password:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     next();
//   }
// };

// // GET all users
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await getAllUsers();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET user by ID
// router.get('/:id', async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const user = await getUserById(userId);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// // GET user by username
// router.get('/username/:username', async (req, res, next) => {
//   try {
//     const { username } = req.params;
//     const user = await getUserByUsername(username);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// // POST a new user (for general user creation)
// router.post('/', hashPasswordMiddleware, async (req, res, next) => {
//   try {
//     const newUser = req.body;
//     const createdUser = await createUser(newUser);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     console.error('Error in POST route:', error);
//     next(error);
//   }
// });

// // POST user registration with duplicate username check
// router.post('/register', hashPasswordMiddleware, async (req, res, next) => {
//   try {
//     const { username } = req.body;

//     // Check if the username already exists
//     const existingUser = await getUserByUsername(username);
//     if (existingUser) {
//       return res.status(400).json({ error: 'Username already taken' });
//     }

//     const newUser = req.body;
//     const createdUser = await createUser(newUser);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     console.error('Error in registration route:', error);
//     next(error);
//   }
// });

// // POST user Login
// router.post('/login', async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     console.log('Login attempt:', { username, password });

//     const user = await getUserByUsername(username);
//     console.log('User found:', user);

//     if (!user) {
//       console.log('No user found with this username');
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     console.log('Password match:', passwordMatch);

//     if (!passwordMatch) {
//       console.log('Password does not match');
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
//     console.log('JWT token generated:', token);

//     // Send cookie with JWT token
//     res.cookie('token', token, {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     // Send response without the password
//     const { password: _, ...userWithoutPassword } = user;
//     res.status(200).json({ user: userWithoutPassword, token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'An error occurred during login' });
//   }
// });

// // PUT (Update) a user by ID
// router.put('/:id', hashPasswordMiddleware, async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const updatedUserData = req.body;
//     const updatedUser = await updateUser(userId, updatedUserData);

//     if (updatedUser) {
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE a user by ID
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const deletedUser = await deleteUser(userId);

//     if (deletedUser) {
//       res.json({ message: 'User deleted' });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;















