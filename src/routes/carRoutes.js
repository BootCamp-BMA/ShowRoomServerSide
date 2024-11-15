const express = require('express')
const router=express.Router();
const {createCar,getCarById,getWhere, updateCar, deleteCars}=require('../controllers/carController.js')
const {auth} = require('../middleware/auth.js')



router.get('/getById/:id',getCarById);
router.get('/getWhere',getWhere);
router.post('/create',auth(['admin']),createCar)
router.put('/update/:id',auth(['admin']),updateCar)
router.delete('/deleteIds',auth(['admin']),deleteCars)


module.exports=router;






