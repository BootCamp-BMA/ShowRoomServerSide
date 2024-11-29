const multer = require('multer');

// Middleware to validate .glb file uploads
const uploadGlbFile = (req, res, next) => {
  // Set the maximum file size for .glb files from the environment variable
  const maxGlbSize = parseInt(process.env.MODEL3D_MAX_SIZE_MB)*1024*1024 || 10 * 1024 * 1024; // Default to 10MB if not defined
  
  // Initialize multer with memory storage (stores the file in memory)
  const storage = multer.memoryStorage();

  // File filter function to allow only .glb files
  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(glb)$/)) {
      return cb(new Error('Only .glb files are allowed'), false);
    }
    cb(null, true);
  };

  // Set up multer with the storage, file filter, and file size limit
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxGlbSize, // Limit the file size
    },
    fileFilter: fileFilter,
  }).single('model'); // Expecting the file field to be named 'file'

  // Run the multer upload middleware
  upload(req, res, (err) => {
    if (err) {
      // Handle errors (either size or type issues)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: `File size exceeds the limit of ${maxGlbSize / (1024 * 1024)}MB` });
      }
      return res.status(400).json({ message: err.message });
    }
    
    // If no errors, proceed to the next middleware
    next();
  });
};

module.exports = uploadGlbFile;
