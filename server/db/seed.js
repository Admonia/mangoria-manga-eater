const client = require('./client');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByUsername,
} = require('./helpers/users');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('./helpers/posts');
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
    console.error('Error dropping tables:', error);
    throw error;
  }
};

const createTables = async () => {
  try {
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
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

const createInitialUsers = async () => {
  try {
    console.log('Creating initial users...');
    for (const user of users) {
      await createUser(user);
    }
    console.log('Created users');
  } catch (error) {
    console.error('Error creating initial users:', error);
    throw error;
  }
};

const createInitialAnime = async () => {
  try {
    console.log('Creating initial anime...');
    for (const ani of anime) {
      await createAnime(ani);
    }
    console.log('Created anime');
  } catch (error) {
    console.error('Error creating initial anime:', error);
    throw error;
  }
};

const createInitialPosts = async () => {
  try {
    console.log('Creating initial posts...');
    for (const post of posts) {
      await createPost(post);
    }
    console.log('Created posts');
  } catch (error) {
    console.error('Error creating initial posts:', error);
    throw error;
  }
};

const rebuildDb = async () => {
  try {
    client.connect();

    // Drop and create tables
    await dropTables();
    await createTables();

    // Seed data
    await createInitialUsers();
    await createInitialAnime();
    await createInitialPosts();

    console.log('Database rebuilt successfully!');
  } catch (error) {
    console.error('Error rebuilding database:', error);
  } finally {
    client.end();
  }
};

rebuildDb();








