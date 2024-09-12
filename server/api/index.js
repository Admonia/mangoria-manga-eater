const express = require('express');
const router = express.Router();

// Import routes
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/anime', require('./anime'));
router.use('/auth', require('./auth'));

// Export router
module.exports = router;






// const express = require('express');
// const router = express.Router();

// //get /api/health
// router.get('/health', (re,res,next) => {
//     res.send('OK');
// });

// // Example in auth.js
// // router.post('/register', (req, res, next) => {
// //     console.log('Entering /register route');
// //     // Your registration logic here
// //   });
  
// //Router: api/users

// router.use('/users', require('./users'));
// router.use('/posts', require('./posts'));
// router.use('/anime', require('./anime'));
// router.use('/auth', require('./auth'))

// // export default router;
// module.exports = router;