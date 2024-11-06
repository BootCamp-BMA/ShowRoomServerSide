// src/app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {errorHandler}=require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Routes

// Error handling middleware
app.get('/',(req,res,next)=>{
    try {
        res.send('hello ayoub megdoud  postman ya5dem kima l axios tester tconnecter les route ta3 server kima hadi ay route ')
    } catch (error) {
        next(error)
    }
});
app.all('*',(req,res,next)=>{
    try {
        res.status(404).json({success:false,message:'page not found'})
        
    } catch (error) {
        next(error)
        
    }
});

app.use(errorHandler);

module.exports = app;
