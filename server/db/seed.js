const client = require('./client');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser, // Import the updateUser function
} = require('./helpers/users');
const { createPost, getAllPosts } = require('./helpers/posts');
const { createAnime, getAllAnime } = require('./helpers/anime');

const { users, posts, anime } = require('./seedData');

const dropTables = async () => {
  try {
    console.log('Starting to drop tables');
    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS anime;
        DROP TABLE IF EXISTS posts;
        `);
    console.log('Tables dropped!');
  } catch (error) {
    console.log('Error dropping tables');
    throw error;
  }
};

// Create Tables because we need a place for the data to live
const createTables = async () => {
  console.log('Building tables...');
  await client.query(`
        CREATE TABLE users (
            "userId" SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL
        );

        CREATE TABLE anime (
            "animeId" SERIAL PRIMARY KEY,
            name varchar(255) NOT NULL,
            description varchar(512) NOT NULL
        );

        CREATE TABLE posts (
            "postId" SERIAL PRIMARY KEY,
            title varchar(255) NOT NULL,
            body varchar(512) NOT NULL
        );
    `);
  console.log('Tables built!');
};

const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUser(user);
    }
    console.log('Created users');
  } catch (error) {
    throw error;
  }
};

const createInitialPosts = async () => {
  try {
    for (const post of posts) {
      await createPost(post);
    }
    console.log('Created posts');
  } catch (error) {
    throw error;
  }
};

const createInitialAnime = async () => {
  try {
    for (const ani of anime) {
      await createAnime(ani);
    }
    console.log('Created anime');
  } catch (error) {
    throw error;
  }
};

// Function to update a user's information
const updateInitialUser = async (userIdToUpdate, updatedUserData) => {
  try {
    await updateUser(userIdToUpdate, updatedUserData);
    console.log('Updated user with ID', userIdToUpdate);
  } catch (error) {
    throw error;
  }
};

// Function to create a new user
const createNewUser = async (userData) => {
  try {
    await createUser(userData);
    console.log('Created a new user');
  } catch (error) {
    throw error;
  }
};

const rebuildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();

    console.log('Starting to seed...');
    await createInitialUsers();
    await createInitialPosts();
    await createInitialAnime();

    // Example: Update the user with ID 1
    const userIdToUpdate = 1; // Replace with the actual user ID you want to update
    const updatedUserData = {
      username: 'JynxgoesBOOM', // Replace with the new username
      password: 'ViandCaitlin4eva', // Replace with the new password
    };
    await updateInitialUser(userIdToUpdate, updatedUserData);

    // Example: Create a new user
    const newUser = {
      username: 'Arcana', // Replace with the new username
      password: 'Lovelybones444', // Replace with the new password
    };
    await createNewUser(newUser);

    await getAllUsers();
    await getAllPosts();
    await getAllAnime();
    await getUserById();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

rebuildDb();








// const client = require('./client')

// const { createUser, getAllUsers, getUserById, updateUser } = require('./helpers/users')
// const { createPost, getAllPosts } = require('./helpers/posts')
// const { createAnime, getAllAnime } = require('./helpers/anime')


// const { users, posts, anime } = require('./seedData')

// const dropTables = async () => {
//     try {
//         console.log("Starting to drop tables")
//         await client.query(`
//         DROP TABLE IF EXISTS users;
//         DROP TABLE IF EXISTS anime;
//         DROP TABLE IF EXISTS posts;
//         `)
//         console.log("Tables dropped!")
//     } catch (error) {
//         console.log("Error dropping tables")
//         throw error
//     }
// }

// //Create Tables because we need a place for the data to live
// const createTables = async () => {
//     console.log("Building tables...")
//     await client.query(`
//         CREATE TABLE users (
//             "userId" SERIAL PRIMARY KEY,
//             username varchar(255) UNIQUE NOT NULL,
//             password varchar(255) NOT NULL
//         );


//         CREATE TABLE anime (
//             "animeId" SERIAL PRIMARY KEY,
//             name varchar(255) NOT NULL,
//             description varchar(512) NOT NULL
//         );
        

//         CREATE TABLE posts (
//             "postId" SERIAL PRIMARY KEY,
//             title varchar(255) NOT NULL,
//             body varchar(512) NOT NULL
//         );
//     `)
//     console.log("Tables built!")
// }

// const createInitialUsers = async () => {
//     try {
//         for (const user of users) {
//             await createUser(user)
//         }
//         console.log("created users")
//     } catch (error) {
//         throw error
//     }
// }


// const createInitialPosts = async () => {
//     try {
//         for (const post of posts) {
//             await createPost(post)
//         }
//         console.log("created posts")
//     } catch (error) {
//         throw error
//     }
// }


// const createInitialAnime = async () => {
//     try {
//         for (const ani of anime) {
//             await createAnime(ani);
//         }
//         console.log("created anime");
//     } catch (error) {
//         throw error;
//     }
// };


// const rebuildDb = async () => {
//     try {
//         client.connect()
//         await dropTables()
//         await createTables()

//         console.log("starting to seed...")
//         await createInitialUsers()
//         await createInitialPosts()
//         await createInitialAnime()
//         await getAllUsers()
//         await getAllPosts()
//         await getAllAnime()
//         await getUserById()
//         await updateUser()
    

//     } catch (error) {
//         console.error(error)
//     } finally {

//         client.end()
//     }
// }

// rebuildDb()