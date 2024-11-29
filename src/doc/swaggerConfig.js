// docs/swaggerConfig.js
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
const UserSchema = require('./schemas/userSchema'); 
const CarSchema = require('./schemas/carSchema');
const AppointmentSchema=require('./schemas/appointementSchema.js')
const FileSchema = require('./schemas/fileSchema.js')





// Define the basic project info
const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Show Room API Documentation',
      description: 'This is the documentation about what this server can do and how to handle information of this showroom.',
      contact: {
        name: 'IDTW 2 Group 1',
        email: 'mbouchareb@gmail.com',
        url: 'https://github.com/BootCamp-BMA/ShowRoomServerSide',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://show-room-server-979c93442bc5.herokuapp.com/', 
      },

    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas:{
        User:UserSchema,
        Car:CarSchema,
        Appointment:AppointmentSchema,
        File:FileSchema

      }
    },
  },
  apis: [path.join(__dirname, '../routes/**/*.js')], 

};


const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
