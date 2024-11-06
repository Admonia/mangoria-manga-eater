const express = require('express');
const router = express.Router();

// Import routes
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/anime', require('./anime'));
router.use('/auth', require('./auth'));

// Export router
module.exports = router;






