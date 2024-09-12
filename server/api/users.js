const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByUsername } = require('../db/helpers/users');
const { JWT_SECRET } = require('../secrets'); // Assuming JWT_SECRET is stored here

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

// POST user login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    // Find user by username
    const user = await getUserByUsername(username);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // If password is valid, proceed to generate a JWT token or session
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    });

    // Send response (omit password)
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error.message);
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
// const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByUsername } = require('../db/helpers/users');
// const bcrypt = require('bcrypt');

// const SALT_ROUNDS = 10;

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
//     const userId = parseInt(req.params.id, 10);
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
// router.post('/', async (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     // Hash the password before creating a new user
//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     const newUser = { ...req.body, password: hashedPassword };

//     const createdUser = await createUser(newUser);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     console.error('Error in POST route:', error.message);
//     next(error);
//   }
// });

// // POST user registration with duplicate username check
// router.post('/register', async (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     // Check if the username already exists
//     const existingUser = await getUserByUsername(username);
//     if (existingUser) {
//       return res.status(409).json({ error: 'Username already taken.' });
//     }

//     // Hash the password before creating a new user
//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     const newUser = { username, password: hashedPassword };

//     const createdUser = await createUser(newUser);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     console.error('Error in registration route:', error.message);
//     next(error);
//   }
// });

// // PUT (Update) a user by ID
// router.put('/:id', async (req, res, next) => {
//   const userId = parseInt(req.params.id, 10);
//   const updatedUserData = req.body;

//   if (updatedUserData.password) {
//     try {
//       updatedUserData.password = await bcrypt.hash(updatedUserData.password, SALT_ROUNDS);
//     } catch (error) {
//       console.error('Error hashing password during update:', error.message);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   try {
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
//   const userId = parseInt(req.params.id, 10);

//   try {
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

















