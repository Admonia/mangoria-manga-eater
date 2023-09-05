const client = require('./client');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser, 
  deleteUser,
} = require('./helpers/users');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('./helpers/posts');
const { createAnime, getAllAnime } = require('./helpers/anime');

const { users, posts, anime } = require('./seedData');

const dropTables = async () => {
  try {
    console.log('Starting to drop tables');
    await client.query(`
    DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS anime;
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
            "userId" INTEGER REFERENCES users("userId"),
            "animeId" INTEGER REFERENCES anime("animeId"),
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
    const updatedUser = await updateUser(userIdToUpdate, updatedUserData);
    if (updatedUser) {
      console.log('Updated user with ID', userIdToUpdate);
    } else {
      console.error('User with ID', userIdToUpdate, 'not found. Failed to Update!');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

const updateInitialPost = async (userId, postId, updatedPostData) => {
  try {
    // First, retrieve the user by userId
    const user = await getUserById(userId);

    if (!user) {
      console.error('User with ID', userId, 'not found. Failed to update Post!!!!');
      return null;
    }

    // Check if the postId exists and retrieve the post by postId
    const post = await getPostById(postId);

    if (!post) {
      console.error('Post with ID', postId, 'not found.');
      return null;
    }

    // Now you can update the post using the retrieved user and post data
    const updatedPost = await updatePost(userId, postId, updatedPostData);

    if (!updatedPost) {
      console.error('Failed to update post.');
      return null;
    }

    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};


// const updateInitialUser = async (userIdToUpdate, updatedUserData) => {
//   try {
//     await updateUser(userIdToUpdate, updatedUserData);
//     console.log('Updated user with ID', userIdToUpdate);
//   } catch (error) {
//     throw error;
//   }
// };

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


  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

rebuildDb();








