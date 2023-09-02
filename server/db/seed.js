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
        DROP TABLE IF EXISTS anime;
        DROP TABLE IF EXISTS posts;
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
    `)
    console.log("Tables built!")
}

const createInitialUsers = async () => {
    try {
        for (const user of users) {
            await createUser(user)
        }
        console.log("created users")
    } catch (error) {
        throw error
    }
}


const createInitialPosts = async () => {
    try {
        for (const post of posts) {
            await createPost(post)
        }
        console.log("created posts")
    } catch (error) {
        throw error
    }
}


const createInitialAnime = async () => {
    try {
        for (const ani of anime) {
            await createAnime(ani);
        }
        console.log("created anime");
    } catch (error) {
        throw error;
    }
};


const rebuildDb = async () => {
    try {
        client.connect()
        await dropTables()
        await createTables()

        console.log("starting to seed...")
        await createInitialUsers()
        await createInitialPosts()
        await createInitialAnime()
        await getAllUsers()
        await getAllPosts()
        await getAllAnime()

    } catch (error) {
        console.error(error)
    } finally {

        client.end()
    }
}

rebuildDb()