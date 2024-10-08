const bcrypt = require('bcrypt');
const client = require('../client'); // Ensure this is the correct path to your database client

const SALT_ROUNDS = 10;

/**
 * Create a new user with a hashed password
 */
const createUser = async ({ username, password }) => {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const { rows: [user] } = await client.query(
            `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING *;
            `,
            [username, hashedPassword]
        );

        console.log('New User Created:', user);
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

/**
 * Get a user by username from the database
 */
const getUserByUsername = async (username) => {
    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

/**
 * Get all users from the database
 */
const getAllUsers = async () => {
    try {
        const { rows } = await client.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

/**
 * Get a user by ID
 */
const getUserById = async (userId) => {
    try {
        const parsedUserId = parseInt(userId, 10);

        if (isNaN(parsedUserId)) {
            throw new Error(`Invalid userId: ${userId}`);
        }

        const { rows } = await client.query(
            'SELECT * FROM users WHERE "userId" = $1',
            [parsedUserId]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

/**
 * Update a user (username and password)
 */
const updateUser = async (userId, { username, password }) => {
    try {
        const queryValues = [userId];
        let queryText = 'UPDATE users SET ';

        if (username) {
            queryText += 'username = $2';
            queryValues.push(username);
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            queryText += (username ? ', ' : '') + 'password = $3';
            queryValues.push(hashedPassword);
        }

        queryText += ' WHERE "userId" = $1 RETURNING *';

        const { rows } = await client.query(queryText, queryValues);

        if (rows.length === 0) {
            return null;
        }

        console.log(`User with ID ${userId} updated successfully`);
        return rows[0];
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

/**
 * Delete a user by ID
 */
const deleteUser = async (userId) => {
    try {
        const { rows: [deletedUser] } = await client.query(
            'DELETE FROM users WHERE "userId" = $1 RETURNING *',
            [userId]
        );

        if (!deletedUser) {
            console.error(`User with ID ${userId} not found`);
            return null;
        }

        console.log(`User with ID ${userId} deleted successfully`);
        return deletedUser;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

/**
 * Verify user login with username and password
 */
const loginUser = async ({ username, password }) => {
    try {
        const user = await getUserByUsername(username);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid username or password');
        }

        console.log('User logged in:', user);
        return user;
    } catch (error) {
        console.error('Error during login:', error.message);
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
    loginUser,
};




























// const bcrypt = require('bcrypt');
// const client = require('../client');

// const SALT_ROUNDS = 10;

// /**
//  * Create a new user with a hashed password
//  */
// const createUser = async ({ username, password }) => {
//     try {
//         // Hash the password before storing it
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         const {
//             rows: [user],
//         } = await client.query(
//             `
//             INSERT INTO users(username, password)
//             VALUES($1, $2)
//             RETURNING *;
//             `,
//             [username, hashedPassword]
//         );

//         console.log('New User Created:', user);
//         return user;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// };

// /**
//  * Get a user by username from the database
//  */
// const getUserByUsername = async (username) => {
//     try {
//         const query = {
//             text: 'SELECT * FROM users WHERE username = $1',
//             values: [username],
//         };

//         const { rows } = await client.query(query);

//         if (rows.length === 0) {
//             return null;
//         }

//         return rows[0];
//     } catch (error) {
//         console.error('Error fetching user by username:', error);
//         throw error;
//     }
// };

// /**
//  * Get all users from the database
//  */
// const getAllUsers = async () => {
//     try {
//         const { rows } = await client.query(`
//             SELECT *
//             FROM users;
//         `);
//         return rows;
//     } catch (error) {
//         console.error('Error fetching all users:', error);
//         throw error;
//     }
// };

// /**
//  * Get a user by ID
//  */
// const getUserById = async (userId) => {
//     try {
//         const parsedUserId = parseInt(userId, 10);

//         if (isNaN(parsedUserId)) {
//             throw new Error(`Invalid userId: ${userId}`);
//         }

//         const query = {
//             text: 'SELECT * FROM users WHERE "userId" = $1',
//             values: [parsedUserId],
//         };

//         const { rows } = await client.query(query);

//         if (rows.length === 0) {
//             return null;
//         }

//         return rows[0];
//     } catch (error) {
//         console.error('Error fetching user by ID:', error);
//         throw error;
//     }
// };

// /**
//  * Update a user (username and password)
//  */
// const updateUser = async (userId, { username, password }) => {
//     try {
//         // If a new password is provided, hash it
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         const query = {
//             text: 'UPDATE users SET username = $2, password = $3 WHERE "userId" = $1 RETURNING *',
//             values: [userId, username, hashedPassword],
//         };

//         const { rows } = await client.query(query);

//         if (rows.length === 0) {
//             return null;
//         }

//         console.log(`User with ID ${userId} updated successfully`);
//         return rows[0];
//     } catch (error) {
//         console.error('Error updating user:', error);
//         throw error;
//     }
// };

// /**
//  * Delete a user by ID
//  */
// const deleteUser = async (userId) => {
//     try {
//         const {
//             rows: [deletedUser],
//         } = await client.query(
//             `
//             DELETE FROM users
//             WHERE "userId" = $1
//             RETURNING *;
//             `,
//             [userId]
//         );

//         if (!deletedUser) {
//             console.error(`User with ID ${userId} not found`);
//             return null;
//         }

//         console.log(`User with ID ${userId} deleted successfully`);
//         return deletedUser;
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         throw error;
//     }
// };

// /**
//  * Verify user login with username and password
//  */
// const loginUser = async ({ username, password }) => {
//     try {
//         const user = await getUserByUsername(username);

//         if (!user) {
//             throw new Error('Invalid username or password');
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             throw new Error('Invalid username or password');
//         }

//         // Successfully authenticated
//         console.log('User logged in:', user);
//         return user;
//     } catch (error) {
//         console.error('Error during login:', error.message);
//         throw error;
//     }
// };

// module.exports = {
//     createUser,
//     getAllUsers,
//     getUserById,
//     getUserByUsername,
//     updateUser,
//     deleteUser,
//     loginUser,
// };











