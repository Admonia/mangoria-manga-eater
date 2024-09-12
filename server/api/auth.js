const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../db/helpers/users');
const { JWT_SECRET } = require('../secrets');

const SALT_ROUNDS = 10;


// Registration route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    console.log('Hashed password:', hashedPassword); // Log the hashed password

    const user = await createUser({ username, password: hashedPassword });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    // Send the token as a cookie
    res.cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// // Login route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     // Retrieve user from the database
//     const user = await getUserByUsername(username);
    
//     // Log the retrieved user object to verify it contains the expected fields
//     console.log('User retrieved from DB:', user);
    
//     if (!user) {
//       console.log('User not found');
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     console.log('Stored password hash:', user.password);
//     console.log('Password received in login request:', password);

//     // Compare the provided password with the stored hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log('Password valid:', isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
//     console.log('Generated token:', token);

//     // Set the token in a cookie
//     res.cookie('token', token, {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     // Return the user data without the password
//     const { password: _, ...userWithoutPassword } = user;
//     res.status(200).json({ user: userWithoutPassword });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });




// // Login route
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

    // Debugging logs
    console.log('Stored password hash:', user.password);
    console.log('Password received in login request:', password);

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Generate a JWT token
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

// Logout route
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token', {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    });

    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
























// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { createUser, getUserByUsername } = require('../db/helpers/users');
// const { JWT_SECRET } = require('../secrets');

// const SALT_ROUNDS = 10;

// // Registration route
// router.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     const existingUser = await getUserByUsername(username);
//     if (existingUser) {
//       return res.status(409).json({ error: 'Username already taken.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     console.log('Hashed password during registration:', hashedPassword);

//     const user = await createUser({ username, password: hashedPassword });
//     console.log('User created with stored hash:', user.password);

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//     res.cookie('token', token, {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     const { password: _, ...userWithoutPassword } = user;
//     res.status(201).json({ user: userWithoutPassword });
//   } catch (error) {
//     console.error('Registration error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     const user = await getUserByUsername(username);
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     const storedHash = user.password;
//     console.log('Stored password hash:', storedHash);
//     console.log('Password received in login request:', password);

//     const isPasswordValid = await bcrypt.compare(password, storedHash);
//     console.log('Password valid:', isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//     res.cookie('token', token, {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     const { password: _, ...userWithoutPassword } = user;
//     res.status(200).json({ user: userWithoutPassword });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Logout route
// router.post('/logout', (req, res) => {
//   try {
//     res.clearCookie('token', {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     res.status(200).json({ message: 'Logged out successfully.' });
//   } catch (error) {
//     console.error('Logout error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;






















