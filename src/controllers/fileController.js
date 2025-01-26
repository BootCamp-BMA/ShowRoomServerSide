const { getGridFSBucket, connectMongo } = require('../config/db');  // MongoDB connection config
const { Readable } = require('stream');
const { ObjectId } = require('mongodb');
const { uploadFiles } = require('../config/gridFS');  // Upload function


module.exports.getFileById = async (req, res) => {
  try {
    const fileId = req.params.id;

    // Connect to MongoDB
    const db = await connectMongo();
    const gridFSBucket = await getGridFSBucket();

    // Find the file metadata in GridFS
    const file = await db.collection('uploads.files').findOne({ _id: new ObjectId(fileId) });

    if (!file) {
      return res.status(404).json({ message: 'File not found' }); 
    }

    // Set headers for the file
    res.set({
      'Content-Type': 'model/gltf-binary',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
    });

    // Stream the file content
    const downloadStream = gridFSBucket.openDownloadStream(new ObjectId(fileId));
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      console.error('Error during download:', err);
      res.status(500).json({ message: 'Error streaming file' });
    });

    downloadStream.on('end', () => {
      console.log('File streamed successfully');
    });
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.uploadModel = async (req, res, next) => {
  try {
    const carId = req.params.id;

    // Connect to MongoDB
    const db = await connectMongo();
    const carsCollection = db.collection('cars');  // Cars collection

    const car = await carsCollection.findOne({ _id: new ObjectId(carId) });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file provided for upload' });
    }

    const file = req.file;
    const fileStream = file.buffer;
    const filename = file.originalname;
    const metadata = { carId };  // Associate file with car ID

    // Upload file to GridFS
    const fileId = await uploadFiles(fileStream, filename, metadata);

    // Update car with model3D file ID
    await carsCollection.updateOne(
      { _id: new ObjectId(carId) },
      { $set: { model3D: fileId } }
    );

    res.status(200).json({ message: '3D model file uploaded successfully', fileId });
  } catch (error) {
    next(error);
  }
};

module.exports.uploadImages = async (req, res, next) => {
  try {
    const carId = req.params.id;

    // Connect to MongoDB
    const db = await connectMongo();
    const carsCollection = db.collection('cars');  // Cars collection

    const car = await carsCollection.findOne({ _id: new ObjectId(carId) });

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files provided for upload' });
    }

    const fileIds = [];

    // Upload each image file
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const fileStream = file.buffer;
      const filename = file.originalname;
      const metadata = { carId };  // Associate file with car ID

      const fileId = await uploadFiles(fileStream, filename, metadata);
      fileIds.push(fileId);
    }

    // Update car with image file IDs
    await carsCollection.updateOne(
      { _id: new ObjectId(carId) },
      { $push: { images: { $each: fileIds } } }  // Add images to the images array
    );

    res.status(200).json({
      message: 'Images uploaded successfully',
      fileIds,  // Return array of image file IDs
    });
  } catch (error) {
    next(error);
  }
};
