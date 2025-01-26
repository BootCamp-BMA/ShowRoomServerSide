const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb'); // For working with MongoDB ObjectId
const { connectMongo } = require('../config/db'); // Assuming your MongoDB connection logic is in 'mongo.js'

const COLLECTION_NAME = 'users';

const UserModel = {
  // Create a new user
  async create(userData) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);
  
    // Hash the password before saving
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
  
    userData.createdAt = new Date();
    userData.updatedAt = new Date();
  
    const result = await collection.insertOne(userData);
    return result; // Return the inserted user document
  }
  ,

  // Find a user by ID
  async findById(userId) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne({ _id: new ObjectId(userId) }); 
  },

  // Find a user by email
  async findByEmail(email) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne({ email });
  },

  // Update a user
  async update(userId, updateData) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    updateData.updatedAt = new Date();

    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
    return result.modifiedCount > 0;
  },

  // Delete a user and related data
  async delete(userId) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);

    // Convert userId to ObjectId
    const userObjectId = new ObjectId(userId);



    return collection.deleteOne({ _id: userObjectId });
}

};

module.exports = UserModel;
