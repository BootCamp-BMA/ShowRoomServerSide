// src/config/gridFS.js



const { getGridFSBucket } = require('../config/db');
const { Readable } = require('stream');
const { ObjectId } = require('mongodb')

module.exports.uploadFiles = async (fileStream, filename, metadata) => {
    const bucket = await getGridFSBucket();

    return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename, { metadata });

        const bufferStream = new Readable();
        bufferStream.push(fileStream);  // Push file buffer into the stream
        bufferStream.push(null);  // End the stream

        bufferStream.pipe(uploadStream);  // Pipe the file buffer into the upload stream

        uploadStream.on('finish', () => {
            resolve(uploadStream.id);  // Return the file ID once uploaded
        });

        uploadStream.on('error', (err) => {
            reject(err);  // Reject on error
        });
    });
};


module.exports.getFileById = async (fileId) => {
  const bucket = await getGridFSBucket();

  return new Promise((resolve, reject) => {
      try {
          const downloadStream = bucket.openDownloadStream(new ObjectId(fileId));
          resolve(downloadStream);
      } catch (err) {
          reject(err);
      }
  });
};

const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Assuming you have a default MongoDB connection set up using Mongoose
const db = mongoose.connection;

module.exports.deleteFileById=async (fileId) =>{
  try {
    // Check if the MongoDB connection is available
    if (!db || !db.collection) {
      throw new Error('Database connection not established');
    }

    // Initialize GridFSBucket with the correct database
    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    // Perform the file deletion
    bucket.delete(new mongoose.Types.ObjectId(fileId), (err) => {
      if (err) {
        console.error(`Error deleting file with ID ${fileId}:`, err);
        throw new Error(`Error deleting file with ID ${fileId}`);
      }
      console.log(`File with ID ${fileId} deleted successfully`);
    });
  } catch (error) {
    console.error('Error in deleteFileById:', error.message);
    throw error;
  }
}






