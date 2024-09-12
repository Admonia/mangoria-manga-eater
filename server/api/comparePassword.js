const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const password = 'testpassword34567891011121314151617'; // The password to test

// Generate a hash
bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
  if (err) {
    console.error('Error creating hash:', err);
    return;
  }
  console.log('Generated hash:', hash);

  // Simulate user login with the same password
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error('Error comparing password:', err);
      return;
    }
    console.log('Password valid:', result); // Should print true
  });
});





