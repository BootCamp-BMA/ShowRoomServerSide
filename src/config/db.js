// db.js
// This file is responsible for establishing a connection with the MongoDB database using mongoose

//  Imports the mongoose library, which is a MongoDB Object Data Modeling (ODM) library for Node.js.
//  It simplifies interactions with the database.
const mongoose=require('mongoose')

//  Import the configuration file, which contains the MongoDB connection string.
//  This URL specifies the database connection details.
const {mongoUrl}=require('./config')


// Defines an asynchronous function connectMongo to establish the database connection. 
// The async keyword is used because the connection process involves asynchronous operations.
const connectMongo=async()=>{
    console.log('... connecting mongo ');
    try {
        // Attempts to connect to the database using the provided URL.
        mongoose.connect(mongoUrl)

        // Success: Logs "connected mongo success" if the connection is successful.
        console.log('-> connected mongo success ');
        

        // Failure: Logs the error message and exits the process with status code 1.
        //  This ensures the app doesn’t continue running without a database connection.
    } catch (error) {
        console.error('Error connecting mongo ',error)  
        process.exit(1); 
    }
    
}
// Exports the connectMongo function so it can be used elsewhere in the project, such as server.js
module.exports={connectMongo}