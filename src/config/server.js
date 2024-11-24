// server.js
// This file initializes the server, connects to the database,
// and sets up the application to listen for incoming requests.

// Loads environment variables from the .env file
require('dotenv').config()


// Imports the main application that defined in app.js
// This file contains the Express application setup (e.g., routes, middlewares).
const app = require('../app.js');


// Imports the database connection functions from db.js
const {connectMongo} = require('./db.js'); 



// Connect to the database 
connectMongo()

// Start the server
const PORT =process.env.PORT;
const HOST = process.env.HOST

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
