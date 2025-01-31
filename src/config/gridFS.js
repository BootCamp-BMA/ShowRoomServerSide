const { getGridFSBucket } = require('../config/db');
const { Readable } = require('stream');
const { ObjectId } = require('mongodb');


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

module.exports.removeFileById = async (fileId) => {
  try {
    const bucket = await getGridFSBucket(); // Get the bucket instance
    const objectId = new ObjectId(fileId);

    return new Promise((resolve, reject) => {
      bucket.delete(objectId, (err) => {
        if (err) {
          console.error(`Error deleting file with ID ${fileId}:`, err.message);
          return reject(err); // Reject the promise on error
        }
        console.log(`File with ID ${fileId} deleted successfully`);
        resolve(); // Resolve the promise on success
      });
    });
  } catch (error) {
    console.error(`Failed to delete file: ${error.message}`);
    throw error;
  }
};