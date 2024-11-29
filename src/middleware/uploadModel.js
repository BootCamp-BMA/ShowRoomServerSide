// src/middleware/uploadModel.js

const multer = require('multer');
const path = require('path');

// Get the max file size from .env and convert it to bytes (MB -> bytes)
const MODEL3D_MAX_SIZE_MB = parseInt(process.env.MODEL3D_MAX_SIZE_MB, 10) * 1024 * 1024; // 50 MB

// Define allowed file extension for the 3D model (GLB)
const ALLOWED_EXTENSIONS = ['.glb'];

// Create storage configuration for 3D model uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // You can change this to your desired folder
    cb(null, 'uploads/models/');  // Save the uploaded files to the "uploads/models" directory
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}_${file.fieldname}${extname}`;  // Create a unique filename
    cb(null, filename);
  }
});

// File filter to accept only .glb extension
const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.includes(extname)) {
    return cb(null, true);  // Accept file
  } else {
    return cb(new Error('Invalid file type. Only .glb files are allowed'), false);  // Reject file
  }
};

// Initialize multer with the above configuration
const uploadModel = multer({
  storage,
  limits: {
    fileSize: MODEL3D_MAX_SIZE_MB  // Limit the file size to the value from .env
  },
  fileFilter
});

module.exports = uploadModel;
