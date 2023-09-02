const client = require('../client')

const createAnime = async ({ name, description }) => {
    try {
        const {
            rows: [anime],
       
        } = await client.query (
         
            `
                INSERT INTO anime(name, description)
                VALUES($1, $2)
                RETURNING *;
            `,
            [name, description]
        )
        console.log(anime)
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