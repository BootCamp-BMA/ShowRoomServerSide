require('dotenv').config()

const app = require('../app.js');

const {connectMongo} = require('./db.js'); 



// Connect to the database 
connectMongo()

// Start the server
const PORT =process.env.PORT;
const HOST = process.env.HOST

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
