// src/utils/gridFS.js

const { MongoClient, GridFSBucket } = require('mongodb');
const { connectMongo } = require('../config/db.js'); // Import connectMongo

async function getGridFSBucket() {
    const client = await connectMongo(); // Use the connection from the DB.js
    const db = client.db(); // Get the DB instance
    return new GridFSBucket(db, { bucketName: 'files' }); // Return GridFS bucket
}

module.exports = {
    getGridFSBucket,
};
