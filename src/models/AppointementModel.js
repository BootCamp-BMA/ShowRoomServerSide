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
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
