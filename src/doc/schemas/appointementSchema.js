const AppointmentSchema = {
    type: 'object',
    required: ['userId', 'carId', 'appointmentDateTime', 'duration', 'price'],
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
        description: "Reference to the user who made the appointment (user's ObjectId)"
      },
      carId: {
        type: 'string',
        format: 'uuid',
        description: "Reference to the car for the appointment (car's ObjectId)"
      },
      appointmentDateTime: {
        type: 'string',
        format: 'date-time',
        description: 'Scheduled date and time for the appointment',
        example: '2024-11-16T10:00:00Z'
      },
      duration: {
        type: 'number',
        description: 'Duration of the appointment in hours',
        minimum: 1,
        example: 2
      },
      price: {
        type: 'number',
        description: 'Price associated with the appointment',
        minimum: 0,
        example: 50.0
      },
      status: {
        type: 'string',
        enum: ['pending', 'confirmed', 'canceled', 'completed'],
        description: "Status of the appointment (default is 'pending')",
        example: 'pending'
      },
      notes: {
        type: 'string',
        description: 'Additional notes for the appointment (optional)',
        maxLength: 500
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the appointment was created'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the appointment was last updated'
      }
    }
  };
  
  module.exports = AppointmentSchema;
  