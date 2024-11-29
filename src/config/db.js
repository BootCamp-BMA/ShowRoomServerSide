                                                                                                                    // src/config/db.js
//config/db.js
require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const mongoURI = process.env.MONGO_URI; 


const connectMongo = async () => {
    try {
        // Connect using Mongoose
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB with Mongoose");


        const client = new MongoClient(mongoURI);
        await client.connect();
        console.log("Connected to MongoDB client for GridFS");

        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
}

module.exports = {
    connectMongo,
};



