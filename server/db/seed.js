const client = require('./client')

const { createUser, getAllUsers } = require('./helpers/users')
const { createPost, getAllPosts } = require('./helpers/posts')
const { createAnime, getAllAnime } = require('./helpers/anime')


const { users, posts, anime } = require('./seedData')

const dropTables = async () => {
    try {
        console.log("Starting to drop tables")
        await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS anime;
        `)
        console.log("Tables dropped!")
    } catch (error) {
        console.log("Error dropping tables")
        throw error
    }
}

//Create Tables because we need a place for the data to live
const createTables = async () => {
    console.log("Building tables...")
    await client.query(`
        CREATE TABLE users (
            "userId" SERIAL PRIMARY KEY,
            username varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
        );
        CREATE TABLE types (
            type_id SERIAL PRIMARY KEY,
            type varchar(255) UNIQUE NOT NULL
        );
        CREATE TABLE posts (
            "postId" SERIAL PRIMARY KEY,
            title varchar(255) UNIQUE NOT NULL,
            body varchar(255) UNIQUE NOT NULL,
            "primaryTypeId" INTEGER REFERENCES types(type_id) NOT NULL,
            "secondaryTypeId" INTEGER REFERENCES types(type_id)
        );
        CREATE TABLE anime (
            "animeId" SERIAL PRIMARY KEY,
            "postId" INTEGER REFERENCES species("postId") NOT NULL,
            name varchar(255) NOT NULL,
            "animeId" INTEGER REFERENCES trainers("animeId"),
            is_registered BOOLEAN NOT NULL
        );
    `)
    console.log("Tables built!")
}

