const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/anime', require('./anime'));

module.exports = router;