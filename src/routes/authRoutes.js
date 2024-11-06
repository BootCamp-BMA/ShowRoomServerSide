const express =require('express')
const router= express.Router()
const authController=require('../controllers/authController.js')

router.use('/register',authController.register);
router.use('/login',authController.login)



module.exports=router;