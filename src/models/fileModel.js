const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed, // Store any metadata related to the file (like car ID, etc.)
    },
  },
  { collection: 'uploads.files' } // Link to the 'uploads.files' collection
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
