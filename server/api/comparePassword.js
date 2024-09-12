const bcrypt = require('bcrypt');

// Example password
const plainPassword = 'testuser3456789101112131415161718192021222324';

// Hash the password (this should be done during user registration)
const hashedPassword = '$2b$10$bi/Rfol5x8PCg6gSvVJj9u/AfS0r88QrCmnbcIahTEnGkn8fL94Rm'; // Example hash from DB

// Compare the plain password with the hashed password
bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
  if (err) {
    console.error('Comparison Error:', err);
  } else {
    console.log('Password Match:', result); // Should be true if passwords match
  }
});






