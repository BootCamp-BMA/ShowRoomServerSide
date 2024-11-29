const multer = require('multer');
require('dotenv').config();

const MAX_GLBSIZE = process.env.MAX_GLBSIZE * 1024 * 1024;  // Maximum .glb file size (in bytes)

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop().toLowerCase();

        // Check for .glb file type
        if (fileExtension !== 'glb') {
            return cb(new Error(`Unsupported file type. Only .glb files are allowed.`));
        }

        // Check for file size limit
        if (file.size > MAX_GLBSIZE) {
            return cb(new Error(`File ${file.originalname} exceeds the size limit of ${process.env.MAX_GLBSIZE}MB.`));
        }

        cb(null, true);
    },
}).single('model');  // Only accept a single file with the field name 'model'

module.exports.handleUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ message: 'File upload failed', error: err.message });
        }

        // Ensure that only one file is uploaded and it's a .glb file
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // If all checks pass, proceed to the next middleware
        next();
    });
};
