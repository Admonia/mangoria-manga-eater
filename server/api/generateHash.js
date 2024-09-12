// generateHash.js
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const password = 'password123'; // Known password

bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
  if (err) {
    console.error('Error creating hash:', err);
  } else {
    console.log('Generated hash:', hash);
  }
});


