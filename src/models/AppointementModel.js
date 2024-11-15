const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  appointmentDateTime: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        
        return value >= Date.now();
      },
      message: 'Appointment date and time must be in the future.'
    }
  },
  duration: {
    type: Number, 
    required: true,
    min: [1, 'Duration must be at least 1 hour.'] 
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number.']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: 500, 
    trim: true
  }
}, {
  timestamps: true 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
