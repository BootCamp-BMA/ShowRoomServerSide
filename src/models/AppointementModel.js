const { ObjectId } = require('mongodb');
const { connectMongo } = require('../config/db'); // Assuming MongoDB connection logic

const COLLECTION_NAME = 'appointments';

const validateAppointmentDateTime = (value) => {
  const appointmentTimestamp = new Date(value).getTime();
  return !isNaN(appointmentTimestamp) && appointmentTimestamp > Date.now();
};

const AppointmentModel = {
  async findWhere(condition = {}, sort = {}, limit = 10, skip = 0) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);

    // Fetch data based on condition, sort, limit, and skip
    const appointments = await collection
      .find(condition)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();

    return appointments;
  },
  // Create a new appointment
  async create(appointmentData) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);

    // Default value for 'status' is 'pending' if not provided
    appointmentData.status = appointmentData.status || 'pending';

    // Validate the status field against the enum
    if (!STATUS_ENUM.includes(appointmentData.status)) {
      throw new Error(`Invalid status value. Allowed values are: ${STATUS_ENUM.join(', ')}`);
    }


    appointmentData.createdAt = new Date();
    appointmentData.updatedAt = new Date();

    const result = await collection.insertOne(appointmentData);
    return result; // Return the inserted appointment document
  },

  // Find an appointment by ID
  async findById(appointmentId) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);
    return collection.findOne({ _id: new ObjectId(appointmentId) });
  },

  // Update an appointment by ID
  async update(appointmentId, updateData) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);

    // If status is provided, validate it against the enum
    if (updateData.status && !STATUS_ENUM.includes(updateData.status)) {
      throw new Error(`Invalid status value. Allowed values are: ${STATUS_ENUM.join(', ')}`);
    }

    // Update the updatedAt field
    updateData.updatedAt = new Date();

    const result = await collection.updateOne(
      { _id: new ObjectId(appointmentId) },
      { $set: updateData }
    );
    return result.modifiedCount > 0;
  },

  // Delete an appointment by ID
  async delete(appointmentId) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);
    const result = await collection.deleteOne({ _id: new ObjectId(appointmentId) });
    return result.deletedCount > 0;
  },

  async deleteMany(appointmentIds) {
    const db = await connectMongo();
    const collection = db.collection(COLLECTION_NAME);
  
    // Ensure appointmentIds is an array (if it's not, convert it into one)
    if (!Array.isArray(appointmentIds)) {
      appointmentIds = [appointmentIds];
    }
  
    // If appointmentIds is empty, return early or throw an error
    if (appointmentIds.length === 0) {
      throw new Error('No appointment IDs provided');
    }
  
    // Remove any duplicate IDs
    const uniqueAppointmentIds = [...new Set(appointmentIds)];
  
    // Map over the IDs to convert to ObjectId
    const result = await collection.deleteMany({
      _id: { $in: uniqueAppointmentIds.map(id => new ObjectId(id)) }
    });
  
    return result.deletedCount;
  }
  
}

module.exports = AppointmentModel;
