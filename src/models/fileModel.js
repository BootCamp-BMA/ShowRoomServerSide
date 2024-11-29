//fileModel
const mongoose = require('mongoose');
const { Schema } = mongoose;

// GridFS stores files in two collections: 'files' and 'chunks'.
// The schema will only need to store metadata and references to GridFS.

const fileSchema = new Schema(
  {
    filename: { type: String, required: true },
    fileId: { type: Schema.Types.ObjectId, required: true, unique: true },
    fileSize: { type: Number, required: true },
    contentType: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: 'Car' }, // Link the file to a specific car
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
