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























