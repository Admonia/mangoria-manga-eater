const client = require('../client')

const createPost = async ({ title, body }) => {
    try {
        const {
            rows: [post],
       
        } = await client.query (
         
            `
                INSERT INTO trainers(title, body)
                VALUES($1, $2)
                RETURNING *;
            `,
            [title, body]
        )
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
            FROM trainers;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = { createPost, getAllPosts }