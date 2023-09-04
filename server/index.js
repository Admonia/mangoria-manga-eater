const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./db/client'); // Import your database client

const app = express();
const PORT = process.env.PORT || 8089; // Use the provided port or default to 8089
const client = require("./db/client")
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Database connection
client.connect();

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import and use your API routes
// const usersRouter = require('./api/users'); // Adjust the path as needed
// app.use('/api/users', usersRouter); // Mount the user-related router under /api/users
app.use('api', require('./api').default);
// app.use('api/users', require('./api/users'));
// Add more routes and middleware as needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





// const express = require('express');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 8089; // Use the provided port or default to 8089

// const client = require("./db/client");
// client.connect();
// // Middleware
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Import and use your API routes
// const usersRouter = require('./api/users'); // Adjust the path as needed
// app.use('/api/users', usersRouter); // Mount the user-related router under /api/users

// // Add more routes and middleware as needed

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



