const client = require('../client')

const createUser = async ({ username, password }) => {
    try {
        const {
            rows: [user],
       
        } = await client.query (
         
            `
                INSERT INTO trainers(username, password)
                VALUES($1, $2)
                RETURNING *;
            `,
            [username, password]
        )
        return user
    } catch (error) {
        throw error
    }
}
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

module.exports = { createUser, getAllUsers }