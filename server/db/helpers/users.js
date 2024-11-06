const bcrypt = require('bcrypt');
const client = require('../client'); // Ensure this path is correct

const SALT_ROUNDS = 10;

/**
 * Create a new user with a hashed password
 */
const createUser = async ({ username, password }) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        console.log('User registration in progress for username:', username); // Log username instead of password

        const { rows: [user] } = await client.query(
            `INSERT INTO users (username, password)
             VALUES ($1, $2)
             RETURNING *;`,
            [username, hashedPassword]
        );

        console.log('New User Created:', user.username); // Log only the username
        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error('Unable to create user'); // Standardized error response
    }
};

/**
 * Get a user by username from the database
 */
const getUserByUsername = async (username) => {
    if (!username) {
        throw new Error('Username is required');
    }

    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error('Error fetching user by username:', error.message);
        throw new Error('Unable to fetch user'); // Standardized error response
    }
};

/**
 * Get all users from the database
 */
const getAllUsers = async () => {
    try {
        const { rows } = await client.query('SELECT * FROM users;');
        console.log('Fetched all users:', rows.map(user => user.username)); // Log only usernames for privacy
        return rows;
    } catch (error) {
        console.error('Error fetching all users:', error.message);
        throw new Error('Unable to fetch users'); // Standardized error response
    }
};

/**
 * Verify user login with username and password
 */
const loginUser = async ({ username, password }) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            console.log('Login attempt for non-existent user:', username);
            throw new Error('Invalid username or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log('Login attempt for username:', username, 'Password valid:', isValidPassword); // Log username and result

        if (!isValidPassword) {
            throw new Error('Invalid username or password');
        }

        console.log('User logged in:', user.username); // Log only the username
        return user;
    } catch (error) {
        console.error('Error during login:', error.message);
        throw new Error('Login failed'); // Standardized error response
    }
};

module.exports = {
    createUser,
    getUserByUsername,
    getAllUsers, // Exporting the getAllUsers function
    loginUser,
    // other functions...
};


























