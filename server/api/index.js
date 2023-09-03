const express = require('express');
const router = express.Router();

// const express = require('express');
const app = express();

// Import and use your route files
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

// Add more routes as needed

const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // GET /api/health
// router.get('/health', (req, res, next) => {
//     res.send('OK');
// });



router.use('/users', require('./users'));

// // router.use('/posts', require('./posts'));

// // router.use('/anime', require('./anime'));

module.exports = router;