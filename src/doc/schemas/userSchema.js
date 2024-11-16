// src/schemas/swaggerUserSchema.js

const UserSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'phoneNum', 'email', 'password'],
    properties: {
      firstName: {
        type: 'string',
        description: "User's first name",
      },
      lastName: {
        type: 'string',
        description: "User's last name",
      },
      phoneNum: {
        type: 'string',
        description: 'Primary phone number',
      },
      phoneNum2: {
        type: 'string',
        description: 'Secondary phone number (optional)',
      },
      email: {
        type: 'string',
        description: "User's email address",
      },
      password: {
        type: 'string',
        description: "User's password (hashed)",
      },
      photo: {
        type: 'string',
        description: 'Profile photo (base64-encoded string)',
      },
      role: {
        type: 'string',
        enum: ['guest', 'admin', 'user'],
        description: "Role of the user (default is 'user')",
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the user was created',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date and time when the user profile was last updated',
      },
    },
  };
  
  module.exports = UserSchema;
  