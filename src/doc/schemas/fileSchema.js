const FileSchema = {
    type: 'object',
    required: ['filename', 'contentType', 'length'],
    properties: {
      _id: {
        type: 'string',
        format: 'uuid',
        description: 'Unique identifier for the file (MongoDB ObjectId)',
        example: '674a0e2ba6d43acf276ba40f'
      },
      filename: {
        type: 'string',
        description: 'The name of the uploaded file.',
        example: 'car_image_01.jpg'
      },
      contentType: {
        type: 'string',
        description: 'The MIME type of the file.',
        example: 'image/jpeg'
      },
      length: {
        type: 'integer',
        description: 'The size of the file in bytes.',
        example: 204800,
        minimum: 0
      },
      uploadDate: {
        type: 'string',
        format: 'date-time',
        description: 'The timestamp when the file was uploaded.',
        example: '2024-11-29T18:55:39.946Z'
      },
      metadata: {
        type: 'object',
        description: 'Additional metadata associated with the file, such as references to other objects like car IDs.',
        example: {
          carId: '674a0e2ba6d43acf276ba40f',
          description: 'Image of the car',
          location: 'front_view'
        },
        additionalProperties: true
      }
    }
  };
  
  module.exports = FileSchema;
  