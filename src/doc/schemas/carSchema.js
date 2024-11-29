const CarSchema = {
  type: 'object',
  required: ['make', 'model', 'year', 'pricePerDay', 'transmission'],
  properties: {
    _id: {
      type: 'string',
      format: 'uuid',
      description: 'Unique identifier for the car (MongoDB ObjectId)',
      example: '674a0e2ba6d43acf276ba40f'
    },
    make: {
      type: 'string',
      description: 'The manufacturer or brand of the car.',
      example: 'Tesla'
    },
    model: {
      type: 'string',
      description: 'The model name of the car.',
      example: 'Cybertruck'
    },
    year: {
      type: 'integer',
      description: 'The year the car was manufactured.',
      example: 2022,
      minimum: 1886
    },
    pricePerDay: {
      type: 'number',
      description: 'The price per day for renting the car.',
      example: 100.00,
      minimum: 0
    },
    color: {
      type: 'string',
      description: 'The color of the car.',
      example: 'Silver'
    },
    mileage: {
      type: 'integer',
      description: 'The mileage of the car in kilometers.',
      example: 15000,
      minimum: 0
    },
    fuelType: {
      type: 'string',
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'],
      description: 'The type of fuel the car uses.',
      example: 'Electric'
    },
    transmission: {
      type: 'string',
      enum: ['Manual', 'Automatic', 'Semi-Automatic'],
      description: 'The transmission type of the car.',
      example: 'Automatic'
    },
    engineSize: {
      type: 'number',
      description: 'The engine size of the car, in liters.',
      example: 0.0,  // Electric cars might have 0 engine size
      minimum: 0
    },
    description: {
      type: 'string',
      description: 'A short description of the car.',
      example: 'A futuristic electric truck with advanced autopilot features.',
      maxLength: 500
    },
    isAvailable: {
      type: 'boolean',
      description: 'Indicates whether the car is available for rent.',
      example: true
    },
    features: {
      type: 'array',
      items: {
        type: 'string',
        example: 'Autopilot'
      },
      description: 'A list of features available with the car.',
      default: []
    },
    images: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uuid',
        description: 'ObjectId reference to the image files stored in GridFS.',
        example: '674a0e6ca6d43acf276ba417'
      },
      description: 'An array of image references associated with the car.',
      default: []
    },
    model3D: {
      type: 'string',
      format: 'uuid',
      description: 'ObjectId reference to the 3D model of the car stored in GridFS.',
      example: '674a0e47a6d43acf276ba412',
      default: null
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp when the car was created in the database.',
      example: '2024-11-29T18:55:39.946Z'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Timestamp when the car was last updated.',
      example: '2024-11-29T18:55:39.946Z'
    }
  }
};

module.exports = CarSchema;
