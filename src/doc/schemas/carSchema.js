const CarSchema = {
    type: 'object',
    required: ['make', 'model', 'year', 'pricePerDay', 'transmission'],
    properties: {
      make: {
        type: 'string',
        description: "Car's make (manufacturer)",
        example: 'Toyota'
      },
      model: {
        type: 'string',
        description: "Car's model",
        example: 'Corolla'
      },
      year: {
        type: 'number',
        description: 'Year the car was manufactured',
        minimum: 1886,
        example: 2020
      },
      pricePerDay: {
        type: 'number',
        description: 'Rental price per day',
        minimum: 0,
        example: 100
      },
      color: {
        type: 'string',
        description: 'Color of the car',
        example: 'Red'
      },
      mileage: {
        type: 'number',
        description: 'Current mileage of the car',
        minimum: 0,
        example: 50000
      },
      fuelType: {
        type: 'string',
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'],
        description: 'Type of fuel the car uses',
        example: 'Petrol'
      },
      transmission: {
        type: 'string',
        enum: ['Manual', 'Automatic', 'Semi-Automatic'],
        description: 'Transmission type of the car',
        example: 'Automatic'
      },
      engineSize: {
        type: 'number',
        description: 'Engine size of the car (in liters)',
        example: 2.5
      },
      description: {
        type: 'string',
        description: 'Description of the car',
        maxLength: 500,
        example: 'A comfortable sedan with great fuel economy.'
      },
      isAvailable: {
        type: 'boolean',
        description: 'Availability status of the car for rental',
        example: true
      },
      dateAdded: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the car was added to the system'
      },
      features: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'List of additional features of the car',
        example: ['Air Conditioning', 'Bluetooth', 'GPS']
      },
      images: {
        type: 'array',
        items: {
          type: 'string',
          format: 'base64',
          description: 'Base64-encoded images of the car'
        },
        description: 'Images of the car, with each image size limited to a maximum size'
      },
      model3D: {
        type: 'string',
        format: 'base64',
        description: 'Base64-encoded 3D model of the car (if available)'
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the car entry was created'
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the car entry was last updated'
      }
    }
  };
  
  module.exports = CarSchema;
  