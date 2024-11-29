//uploadImages
// src/middleware/upload.js

const multer = require('multer');
const path = require('path');

// Get the max image size from .env and convert it to bytes (MB -> bytes)
const IMAGE_MAX_SIZE_MB = parseInt(process.env.IMAGE_MAX_SIZE_MB, 10) * 1024 * 1024; // 7 MB

// Define allowed file extensions
const ALLOWED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.gif', '.tiff', '.bmp'];

// Create storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads/');  
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    const filename = `${Date.now()}_${file.fieldname}${extname}`;  
  }
});


const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.includes(extname)) {
    return cb(null, true);  
  } else {
    return cb(new Error('Invalid file type'), false);  
  }
};


const upload = multer({
  storage,
  limits: {
    fileSize: IMAGE_MAX_SIZE_MB  // Limit the file size to the value from .env
  },
  fileFilter
});

module.exports = upload;
