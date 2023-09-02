const client = require('../client')

const createPost = async ({ title, body }) => {
    try {
        const {
            rows: [post],
       
        } = await client.query (
         
            `
                INSERT INTO posts(title, body)
                VALUES($1, $2)
                RETURNING *;
            `,
            [title, body]
        )
        console.log(post)
        return post
    } catch (error) {
        throw error
    }
}
const getAllPosts = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM posts;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = { createPost, getAllPosts }