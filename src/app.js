

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRootes=require('./routes/apiRoutes.js')
const path=require('path')
const swaggerUi=require('swagger-ui-express')
const swaggerDoc=require('./doc/swagger.json')


const {errorHandler}=require('./middleware/errorHandler');

const app = express();

app.set('view engine','pug')
app.set('views',path.join(__dirname,'./views'))


app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 



app.use('/api',apiRootes)

app.use('/',swaggerUi.serve,swaggerUi.setup(swaggerDoc));
app.all('*',(req,res,next)=>{
    try {
        res.status(404).json({success:false,message:'page not found'})
        
    } catch (error) {
        next(error)
        
    }
});


app.use(errorHandler);

module.exports = app;
