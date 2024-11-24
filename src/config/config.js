// config.js
// this file manages environment-specific configuration using the dotenv package.

// Loads environment variables from a .env file into process.env. 
// This allows you to manage secrets like API keys, database URLs, etc., 
// without hardcoding them in your source code.
require('dotenv').config();

// Reads the SECRET_KEY value from the .env file
const secretKey=process.env.SECRET_KEY

// Retrieves the MongoDB connection string (URL) from the .env file.
//  This is necessary for connecting to your database.
const mongoUrl=process.env.DB_URL

// Converts the IMAGE_MAX_SIZE_MB and MODEL3D_MAX_SIZE_MB values from strings to integers.
const imageMaxSize=parseInt(process.env.IMAGE_MAX_SIZE_MB)

// Converts the MODEL3D_MAX_SIZE_MB value from a string to an integer.
const model3dMaxSize=parseInt(process.env.MODEL3D_MAX_SIZE_MB)


// Bundles up all the settings (like secretKey, mongoUrl, imageMaxSize, and model3dMaxSize) into one object
// Shares them with other files that need these settings.like "server.js"
module.exports={secretKey,mongoUrl,imageMaxSize,model3dMaxSize}