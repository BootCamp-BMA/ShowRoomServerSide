const { ObjectId } = require('mongodb');

const validateAppointmentDateTime = (value) => {
    return value >= Date.now();
};

const appointmentSchema = {
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    carId: {
        type: ObjectId,
        ref: 'Car',
        required: true
    },
    appointmentDateTime: {
        type: Date,
        required: true,
        validate: {
            validator: validateAppointmentDateTime,
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
};

module.exports = appointmentSchema;
