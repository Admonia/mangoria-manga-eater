const { Client } = require('pg');

const animeLove = 'anime_lover';
const client = new Client({
  connectionString: `postgres://localhost:5432/${animeLove}`
});

module.exports = client;








