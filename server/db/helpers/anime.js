const client = require('../client')

const createAnime = async ({ name, description }) => {
    try {
        const {
            rows: [post],
       
        } = await client.query (
         
            `
                INSERT INTO trainers(name, description)
                VALUES($1, $2)
                RETURNING *;
            `,
            [name, description]
        )
        return anime
    } catch (error) {
        throw error
    }
}
const getAllAnime = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM anime;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = { createAnime, getAllAnime }