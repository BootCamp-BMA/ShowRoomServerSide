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
    dateAdded: {
      type: Date,
      default: Date.now
    },
    features: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      validate: {
        validator: function (images) {
          const maxSize = imageMaxSize * 1024 * 1024;
          return images.every(image => Buffer.from(image, 'base64').length <= maxSize);
        },
        message: `Each image in images must be less than ${imageMaxSize}MB in size`
      },
      default: []
    },
    model3D: {
      type: String,
      validate: {
        validator: function (model) {
          if (!model) return true;

          const maxSize = model3dMaxSize * 1024 * 1024;
          return Buffer.from(model, 'base64').length <= maxSize;
        },
        message: `The 3D model must be less than ${model3dMaxSize} in size`
      },
      default: ''
    }
  },
  { timestamps: true } 
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
