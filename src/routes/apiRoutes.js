const express = require('express')
const router = express.Router()
const userRootes=require('./userRoutes')
const authRootes=require('./authRoutes')


router.use('/auth',userRootes)
router.use('/user',authRootes)



module.exports=router;