const express = require('express');
const app = express();
const PORT = 8089;
const cookieParser = require('cookie-parser');
const { COOKIE_SECRET } = require('./secrets');
const { authRequired } = require('./api/utils');

// Init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// Cookie secret
app.use(cookieParser(COOKIE_SECRET));

// Auth required
app.get('/test', authRequired, (req, res, next) => {
  res.send('You are authorized');
});

// Init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Init cors
const cors = require('cors');
app.use(cors());

// Database connection
const client = require('./db/client');
client.connect();

// Use dotenv for environment variables
require('dotenv').config();

// Router: /api
app.use('/api', require('./api'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    // Close the database connection before exiting
    await client.end();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error closing database connection:', error);
    process.exit(1);
  }
});














// const express = require('express');
// const app = express();
// const PORT = 8089;
// const cookieParser = require('cookie-parser');
// const { COOKIE_SECRET } = require('./secrets');
// const { authRequired } = require('./api/utils');

// // Use dotenv for environment variables
// require('dotenv').config();

// // Init morgan
// const morgan = require('morgan');
// app.use(morgan('dev'));

// // Cookie secret
// app.use(cookieParser(COOKIE_SECRET));

// // Init body-parser
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// // Init cors
// const cors = require('cors');
// app.use(cors());

// // Database connection
// const client = require('./db/client');
// client.connect();

// // Auth required
// app.get('/test', authRequired, (req, res) => {
//   res.send('You are authorized');
// });

// // Router: /api
// app.use('/api', require('./api'));

// // Default route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Handle graceful shutdown
// process.on('SIGINT', async () => {
//   try {
//     // Close the database connection before exiting
//     await client.end();
//     console.log('Database connection closed.');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error closing database connection:', error);
//     process.exit(1);
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// });

// // Listen for requests
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });













// const express = require('express');
// const app = express();
// const PORT = 8089;
// const cookieParser = require('cookie-parser');
// const { COOKIE_SECRET } = require('./secrets');
// const { authRequired } = require('./api/utils');

// // Init morgan
// const morgan = require('morgan');
// app.use(morgan('dev'));

// // Cookie secret
// app.use(cookieParser(COOKIE_SECRET));

// // Auth required
// app.get('/test', authRequired, (req, res, next) => {
//   res.send('You are authorized');
// });

// // Init body-parser
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// // Init cors
// const cors = require('cors');
// app.use(cors());

// const client = require('./db/client');

// // Use dotenv for environment variables
// require('dotenv').config();

// // Database connection
// client.connect();

// // Router: /api
// app.use('/api', require('./api'));

// // Default route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Listen for requests
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// // Handle graceful shutdown
// process.on('SIGINT', async () => {
//   try {
//     // Close the database connection before exiting
//     await client.end();
//     console.log('Database connection closed.');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error closing database connection:', error);
//     process.exit(1);
//   }
// });





// const express = require('express');
// const app = express();
// const PORT = 8089;
// const cookieParser = require('cookie-parser')
// const { COOKIE_SECRET } = require('./secrets')
// const { authRequired } = require('./api/utils')
// // init morgan
// const morgan = require('morgan');
// app.use(morgan('dev'));

// //cookie secret
// app.use(cookieParser(COOKIE_SECRET))

// //auth required
// app.get('/test', authRequired, (req, res, next) => {
//     res.send('You are authorized')
//   })  

// // init body-parser
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// // init cors
// const cors = require('cors');
// app.use(cors());

// const client = require('./db/client');
// client.connect();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// // Router: /api
// app.use('/api', require('./api'));


// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

