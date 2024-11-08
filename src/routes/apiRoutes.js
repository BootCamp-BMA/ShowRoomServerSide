const express = require('express')
const router = express.Router()
const userRootes=require('./userRoutes')
const authRootes=require('./authRoutes')


router.use('/users',userRootes)
router.use('/auth',authRootes)




module.exports=router;