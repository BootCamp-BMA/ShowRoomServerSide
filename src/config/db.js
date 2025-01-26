require('dotenv').config();
const { MongoClient, GridFSBucket } = require('mongodb');

// Load environment variables
const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let dbInstance;
let gridFSBucket;

// MongoDB client instance
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectMongo = async () => {
  if (!dbInstance) {
    try {
      console.log('... waiting to connect to MongoDB');

      // Connect to MongoDB using MongoClient
      await client.connect();
      dbInstance = client.db(dbName);
      console.log('Connected to MongoDB successfully');

      // Set up GridFSBucket
      gridFSBucket = new GridFSBucket(dbInstance, { bucketName: 'uploads' });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  return dbInstance;
};

// Function to get GridFSBucket
const getGridFSBucket = async () => {
  if (!gridFSBucket) {
    await connectMongo();
  }
  return gridFSBucket;
};

module.exports = {
  connectMongo,
  getGridFSBucket,
  MongoClient,
};
