const bcrypt = require('bcrypt');
const client = require('../client');

const SALT_ROUNDS = 10;

/**
 * Create a new user with a hashed password
 */
const createUser = async ({ username, password }) => {
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const {
            rows: [user],
        } = await client.query(
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
        const query = {
            text: 'SELECT * FROM users WHERE username = $1',
            values: [username],
        };

        const { rows } = await client.query(query);

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
        const { rows } = await client.query(`
            SELECT *
            FROM users;
        `);
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

        const query = {
            text: 'SELECT * FROM users WHERE "userId" = $1',
            values: [parsedUserId],
        };

        const { rows } = await client.query(query);

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
        // If a new password is provided, hash it
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = {
            text: 'UPDATE users SET username = $2, password = $3 WHERE "userId" = $1 RETURNING *',
            values: [userId, username, hashedPassword],
        };

        const { rows } = await client.query(query);

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
        const {
            rows: [deletedUser],
        } = await client.query(
            `
            DELETE FROM users
            WHERE "userId" = $1
            RETURNING *;
            `,
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

        // Successfully authenticated
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

// const createUser = async ({ username, password }) => {
//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         const {
//             rows: [user],
//         } = await client.query(
//             `
//             INSERT INTO users(username, password)
//             VALUES($1, $2)
//             RETURNING *;
//             `,
//             [username, hashedPassword] // Store the hashed password in the database
//         );

//         console.log('New User:', user);
//         return user;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// };


// // const bcrypt = require('bcrypt');

// // const loginUser = async ({ username, password }) => {
// //     try {
// //         const {
// //             rows: [user],
// //         } = await client.query(
// //             `SELECT * FROM users WHERE username = $1;`,
// //             [username]
// //         );

// //         if (!user) {
// //             throw new Error('Invalid username or password');
// //         }

// //         const isValidPassword = await bcrypt.compare(password, user.password);
// //         if (!isValidPassword) {
// //             throw new Error('Invalid username or password');
// //         }

// //         // Successfully authenticated
// //         console.log('User logged in:', user);
// //         return user;
// //     } catch (error) {
// //         console.error('Error during login:', error.message);
// //         throw error;
// //     }
// // };

// // const createUser = async ({ username, password }) => {
// //     try {
// //         // Hash the password
// //         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

// //         const {
// //             rows: [user],
// //         } = await client.query(
// //             `
// //             INSERT INTO users(username, password)
// //             VALUES($1, $2)
// //             RETURNING *;
// //             `,
// //             [username, hashedPassword] // Use the hashed password
// //         );

// //         console.log(user);
// //         return user;
// //     } catch (error) {
// //         throw error;
// //     }
// // };

// const getAllUsers = async () => {
//     try {
//         const { rows } = await client.query(`
//             SELECT *
//             FROM users;
//         `);
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const parsedUserId = parseInt(userId, 10);

//         if (isNaN(parsedUserId)) {
//             return null;
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
//         throw error;
//     }
// };

// const updateUser = async (userId, { username, password }) => {
//     try {
//         // Hash the new password
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         const query = {
//             text: 'UPDATE users SET username = $2, password = $3 WHERE "userId" = $1 RETURNING *',
//             values: [userId, username, hashedPassword],
//         };

//         const { rows } = await client.query(query);

//         if (rows.length === 0) {
//             return null;
//         }

//         return rows[0];
//     } catch (error) {
//         throw error;
//     }
// };

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

//         console.log(`Deleted user with ID ${userId}`);
//         return deletedUser;
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         throw error;
//     }
// };
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
//         throw error;
//     }
// };


  

// module.exports = {
//     createUser,
//     getAllUsers,
//     getUserById,
//     getUserByUsername, // Add the new function here
//     updateUser,
//     deleteUser,
//     // loginUser,
// };













// const bcrypt = require('bcrypt');
// const client = require('../client');

// const SALT_ROUNDS = 10;

// const createUser = async ({ username, password }) => {
//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         const {
//             rows: [user],
//         } = await client.query(
//             `
//             INSERT INTO users(username, password)
//             VALUES($1, $2)
//             RETURNING *;
//             `,
//             [username, hashedPassword] // Use the hashed password
//         );

//         console.log(user);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// };

// const getAllUsers = async () => {
//     try {
//         const { rows } = await client.query(`
//             SELECT *
//             FROM users;
//         `);
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// };

// const getUserById = async (userId) => {
//     try {
//         const parsedUserId = parseInt(userId, 10);

//         if (isNaN(parsedUserId)) {
//             return null;
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
//         throw error;
//     }
// };

// const updateUser = async (userId, { username, password }) => {
//     try {
//         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//         const query = {
//             text: 'UPDATE users SET username = $2, password = $3 WHERE "userId" = $1 RETURNING *',
//             values: [userId, username, hashedPassword],
//         };

//         const { rows } = await client.query(query);

//         if (rows.length === 0) {
//             return null;
//         }

//         return rows[0];
//     } catch (error) {
//         throw error;
//     }
// };

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

//         console.log(`Deleted user with ID ${userId}`);
//         return deletedUser;
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         throw error;
//     }
// };

// module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
