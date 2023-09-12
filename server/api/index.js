const express = require('express');
const router = express.Router();

//get /api/health
router.get('/health', (re,res,next) => {
    res.send('OK');
});

//Router: api/users

router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/anime', require('./anime'));
router.use('/auth', require('./auth'))

// export default router;
module.exports = router;