const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const password = 'testpassword34567891011121314'; // Password to test

// Generate hash
bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
  if (err) {
    console.error('Error creating hash:', err);
    return;
  }
  
  console.log('Generated hash:', hash);

  // Compare hash
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error('Error comparing password:', err);
      return;
    }
    console.log('Password valid:', result);
  });
});

