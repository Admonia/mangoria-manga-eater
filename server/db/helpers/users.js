const client = require('../client')
//create user
const createUser = async ({ username, password }) => {
    try {
        const {
            rows: [user],
       
        } = await client.query (
         
            `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING *;
            `,
            [username, password]
        )
        console.log(user)
        return user
    } catch (error) {
        throw error
    }
}
//command in terminal
// INSERT INTO users (username, password) 
// VALUES ('Arcana', 'Jynxedd78') 
// RETURNING *;

//get ALL users
const getAllUsers = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM users;
        `)
        return rows
    } catch (error) {
        throw error
    }
}
//get user by ID
const getUserById = async (userId) => {
    try {
      const query = {
        text: 'SELECT * FROM users WHERE "userId" = $1',
        values: [userId], // Pass the userId as a parameter
      };
  
      const { rows } = await client.query(query);
  
      if (rows.length === 0) {
        return null; // User not found
      }
  
      return rows[0]; // Return the first user found (assuming userId is unique)
    } catch (error) {
      throw error;
    }
  };
  
//   SELECT * FROM users WHERE "userId" = 1; ~Use this command in psql terminal for anime_lover db!
// update user
const updateUser = async (userId, { username, password }) => {
  try {
    const query = {
      text: 'UPDATE users SET username = $2, password = $3 WHERE "userId" = $1 RETURNING *',
      values: [userId, username, password],
    };

    const { rows } = await client.query(query);

    if (rows.length === 0) {
      return null; // User not found
    }

    return rows[0]; // Return the updated user
  } catch (error) {
    throw error;
  }
};
//use this in terminal~
// UPDATE users
// SET username = 'Arcadia', password = 'Calypso'
// WHERE "userId" = 1
// RETURNING *;
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
      return null; // Handle the case when the user doesn't exist
    }

    console.log(`Deleted user with ID ${userId}`);
    return deletedUser;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


//This command
// DELETE FROM users
// WHERE "userId" = 1;





module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };

// module.exports = { createUser, getAllUsers }