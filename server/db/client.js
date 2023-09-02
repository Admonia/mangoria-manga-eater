// Require Client from pg
const { Client } = require('pg')

//Establishing connect to database (like how we do with http://)
const animeLove = 'anime_lover'
const client = new Client(`postgres://localhost:5432/${animeLove}`)

//Export for use in other files
module.exports = client