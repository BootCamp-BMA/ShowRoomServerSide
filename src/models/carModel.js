const { ObjectId } = require('mongodb'); // For working with MongoDB ObjectId
const { connectMongo } = require('../config/db.js'); // Assuming your MongoDB connection logic is in 'mongo.js'
const { removeFileById } = require('../config/gridFS.js'); // Function to delete files from GridFS
const Appointment = require('../models/AppointementModel.js'); // Appointment model

const COLLECTION_NAME = 'cars';

const CarModel = {
  // Create a new car
  async create(carData) {
    try {
      const db = await connectMongo();
      const collection = db.collection(COLLECTION_NAME);

      carData.createdAt = new Date();
      carData.updatedAt = new Date();

      const result = await collection.insertOne(carData);
      return result.ops[0]; // Return the created car
    } catch (error) {
      throw new Error(`Error creating car: ${error.message}`);
    }
  },

  // Find a car by ID
  async findById(carId) {
    try {
      const db = await connectMongo();
      const collection = db.collection(COLLECTION_NAME);
      const car = await collection.findOne({ _id: new ObjectId(carId) });
      if (!car) {
        throw new Error(`Car with ID ${carId} not found`);
      }
      return car;
    } catch (error) {
      throw new Error(`Error finding car: ${error.message}`);
    }
  },

  // Update a car
  async update(carId, updateData) {
    try {
      const db = await connectMongo();
      const collection = db.collection(COLLECTION_NAME);

      updateData.updatedAt = new Date();

      const result = await collection.updateOne(
        { _id: new ObjectId(carId) },
        { $set: updateData }
      );
      if (result.modifiedCount > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Error updating car: ${error.message}`);
    }
  },

  // Delete a car and its related data
  async delete(carId) {
    try {
      const db = await connectMongo();
      const collection = db.collection(COLLECTION_NAME);

      const car = await this.findById(carId);
      if (!car) {
        throw new Error(`Car with ID ${carId} not found`);
      }

      // Remove associated files (images and 3D model)
      if (car.model3D) {
        await removeFileById(car.model3D);
        console.log(`Deleted model3D file with ID: ${car.model3D}`);
      }

      if (car.images && car.images.length > 0) {
        for (let imageId of car.images) {
          await removeFileById(imageId);
          console.log(`Deleted image file with ID: ${imageId}`);
        }
      }

      // Remove associated appointments
      await Appointment.deleteMany({ carId: new ObjectId(carId) });

      // Delete the car itself
      const result = await collection.deleteOne({ _id: new ObjectId(carId) });
      if (result.deletedCount > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Error deleting car: ${error.message}`);
    }
  },

  // Validate and enforce custom constraints
  validateCarData(carData) {
    const errors = [];

    // Year validation
    if (carData.year < 1886) {
      errors.push('Year must be 1886 or later');
    }

    // Description length
    if (carData.description && carData.description.length > 500) {
      errors.push('Description must be 500 characters or less');
    }

    // Fuel type and transmission validation
    const validFuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'];
    if (!validFuelTypes.includes(carData.fuelType)) {
      errors.push('Invalid fuel type');
    }

    const validTransmissions = ['Manual', 'Automatic', 'Semi-Automatic'];
    if (!validTransmissions.includes(carData.transmission)) {
      errors.push('Invalid transmission type');
    }

    // Handle validation errors
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  },
};

module.exports = CarModel;
