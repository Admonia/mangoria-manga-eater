const express = require('express');
const app = express();
const PORT = 8089;

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// init body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// init cors
const cors = require('cors');
app.use(cors());

const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Router: /api
app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const client = require('./db/client'); // Import your database client

// const PORT = process.env.PORT || 8089; // Use the provided port or default to 8089
// const client = require("./db/client")
// client.connect();
// // Middleware
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(cors());

// // Database connection
// // client.connect();

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Import and use your API routes
// // const usersRouter = require('./api/users'); // Adjust the path as needed
// // app.use('/api/users', usersRouter); // Mount the user-related router under /api/users
// app.use('api', require('./api').default);
// // app.use('api/users', require('./api/users'));
// // Add more routes and middleware as needed

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




