const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../db/helpers/users');
const { JWT_SECRET } = require('../secrets');

const SALT_ROUNDS = 10;

// POST user registration with duplicate username check
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ error: 'Username already taken.' });
        }

        const newUser = { username, password }; // Create user object without hashing here
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
        console.log('Login attempt with username:', username);

        const user = await getUserByUsername(username);
        if (!user) {
            console.log('User not found for username:', username);
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            sameSite: 'strict',
            httpOnly: true,
            signed: true,
        });

        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error('Login error:', error.message);
        next(error);
    }
});

module.exports = router;























// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByUsername } = require('../db/helpers/users');
// const { JWT_SECRET } = require('../secrets');

// const SALT_ROUNDS = 10;

// // POST user registration with duplicate username check
// router.post('/register', async (req, res, next) => {
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
//     const newUser = { username, password: hashedPassword };

//     const createdUser = await createUser(newUser);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     console.error('Error in registration route:', error.message);
//     next(error);
//   }
// });

// // POST user login
// router.post('/login', async (req, res, next) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     console.log('Login attempt with username:', username); // Log incoming request data

//     const user = await getUserByUsername(username);
//     if (!user) {
//       console.log('User not found:', username);
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log('Password valid:', isPasswordValid); // Log comparison result

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
//     next(error);
//   }
// });

// // Additional routes (GET, PUT, DELETE) remain unchanged...

// module.exports = router;





















// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { createUser, getUserByUsername } = require('../db/helpers/users');
// const { JWT_SECRET } = require('../secrets'); // Ensure JWT_SECRET is defined in .env

// const SALT_ROUNDS = 10;

// // Check if JWT_SECRET is defined
// if (!JWT_SECRET) {
//   console.error('JWT_SECRET is not defined. Please check your .env file.');
//   process.exit(1); // Exit if critical variable is missing
// }

// // Registration route
// router.post('/register', async (req, res) => {
//   let { username, password } = req.body;

//   // Trim whitespace from username and password
//   username = username.trim();
//   password = password.trim();

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     const existingUser = await getUserByUsername(username);
//     if (existingUser) {
//       return res.status(409).json({ error: 'Username already taken.' });
//     }

//     // Hash the password before saving to the database
//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     console.log('Hashed password:', hashedPassword); // Log the hashed password for debugging

//     const user = await createUser({ username, password: hashedPassword });

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//     // Send the token as a cookie
//     res.cookie('token', token, {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     // Exclude password from response
//     const { password: _, ...userWithoutPassword } = user;
//     res.status(201).json({ user: userWithoutPassword });
//   } catch (error) {
//     console.error('Registration error:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   let { username, password } = req.body;

//   // Trim whitespace from username and password
//   username = username.trim();
//   password = password.trim();

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username and password are required.' });
//   }

//   try {
//     // Find user by username
//     const user = await getUserByUsername(username);
    
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     // Debugging logs
//     console.log('Stored password hash:', user.password);
//     console.log('Password received in login request:', password);

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
    
//     console.log('Password valid:', isPasswordValid);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid username or password.' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

//     res.cookie('token', token, {
//       sameSite: 'strict',
//       httpOnly: true,
//       signed: true,
//     });

//     // Send response (omit password)
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












