require('dotenv').config(); // Load environment variables at the top
const express = require('express');
const app = express();
const PORT = 8089;
const cookieParser = require('cookie-parser');
const { COOKIE_SECRET } = require('./secrets'); // Ensure COOKIE_SECRET is defined in .env
const { authRequired } = require('./api/utils');

// Log COOKIE_SECRET for debugging (ensure you do this only in development)
console.log('COOKIE_SECRET:', COOKIE_SECRET);

// Init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// Cookie secret
app.use(cookieParser(COOKIE_SECRET));

// CORS configuration
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5174', 
  credentials: true,               // Enable credentials (cookies, etc.)
}));

// Init body-parser
app.use(express.json()); // Simplified body parser

// Database connection
const client = require('./db/client');
client.connect();

// Auth required
app.get('/test', authRequired, (req, res) => {
  res.send('You are authorized');
});

// Router: /api
app.use('/api', require('./api'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
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





















