const mongoose = require('mongoose');
const { imageMaxSize, model3dMaxSize } = require('../config/config.js');

const carSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true,
      min: 1886
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 0
    },
    color: {
      type: String,
      trim: true,
      default: ''
    },
    mileage: {
      type: Number,
      min: 0,
      default: 0
    },
    fuelType: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'],
      default: 'Other'
    },
    transmission: {
      type: String,
      enum: ['Manual', 'Automatic', 'Semi-Automatic'],
      required: true
    },
    engineSize: {
      type: Number,
      min: 0
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    features: {
      type: [String],
      default: []
    },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',  // Assuming you're storing images in GridFS
    }],
    model3D: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',  // Store the ID of the 3D model in GridFS
      default: null
    }
  },
  { timestamps: true }
);

carSchema.pre('remove', async function(next) {
  try {
    // If the car has a model3D, delete the associated file
    if (this.model3D) {
      await removeFileById(this.model3D);
      console.log(`Deleted model3D file with ID: ${this.model3D}`);
    }

    // If the car has images, delete all the associated image files
    if (this.images && this.images.length > 0) {
      for (let imageId of this.images) {
        await removeFileById(imageId);
        console.log(`Deleted image file with ID: ${imageId}`);
      }
    }

    // Clean up associated appointments when a car is removed
    await Appointment.deleteMany({ carId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
