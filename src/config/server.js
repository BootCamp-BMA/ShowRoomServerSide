require('dotenv').config()

const app = require('../app.js');
// const mongoose = require('mongoose'); 
// const config = require('./config'); 

// Connect to the database 


// Start the server
const PORT =process.env.PORT;
const HOST = process.env.HOST

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
