const multer = require('multer');

// Middleware to validate image file uploads
const uploadImageFiles = (req, res, next) => {
  // Set the maximum file size for image files from the environment variable
  const maxImageSize = parseInt(process.env.IMAGE_MAX_SIZE_MB) * 1024 * 1024 || 5 * 1024 * 1024; // Default to 5MB if not defined

  // Initialize multer with memory storage (stores the file in memory)
  const storage = multer.memoryStorage();

  // File filter function to allow only image files (JPEG, PNG, GIF, BMP)
  const fileFilter = (req, file, cb) => {
    // Check file extension
    const allowedTypes = /jpg|jpeg|png|gif|bmp/;
    const isValid = allowedTypes.test(file.mimetype) || allowedTypes.test(file.originalname);
    
    if (!isValid) {
      return cb(new Error('Only image files (jpg, jpeg, png, gif, bmp) are allowed'), false);
    }
    cb(null, true);
  };

  // Set up multer with the storage, file filter, and file size limit
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxImageSize, // Limit the file size
    },
    fileFilter: fileFilter,
  }).array('images', 5); // Expecting multiple files (field name 'images'), max 5 files per request

  // Run the multer upload middleware
  upload(req, res, (err) => {
    if (err) {
      // Handle errors (either size or type issues)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: `File size exceeds the limit of ${maxImageSize / (1024 * 1024)}MB` });
      }
      return res.status(400).json({ message: err.message });
    }
    
    // If no errors, proceed to the next middleware
    next();
  });
};

module.exports = uploadImageFiles;
