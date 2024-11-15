const express = require('express')
const router = express.Router();
const apiRootes=require('./apiRoutes.js')

const swaggerUi=require('swagger-ui-express')
const swaggerSpec = require('../doc/swaggerConfig.js');  
const {errorHandler}=require('../middleware/errorHandler.js');


router.get('/',(req,res,next)=>{
    try {
        res.render('HomePage.pug')
        
    } catch (error) {
        next(error)
    }
})



router.use('/api',apiRootes)
router.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));


router.all('*',(req,res,next)=>{
    try {
        res.status(404).json({success:false,message:'page not found'})
        
    } catch (error) {
        next(error)
        
    }
});

router.use(errorHandler);


module.exports=router