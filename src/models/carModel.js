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
      ref: 'GridFSFile',  // Assuming you're storing images in GridFS
    }],
    model3D: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GridFSFile',  // Store the ID of the 3D model in GridFS
      default: null
    }
  },
  { timestamps: true }
);

carSchema.pre('remove', async function(next) {
    try {
      // Clean up associated appointments when a car is removed
      await Appointment.deleteMany({ carId: this._id });
      next();
    } catch (err) {
      next(err);
    }
  });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
