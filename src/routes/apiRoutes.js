const express = require('express')
const router = express.Router()
const userRoutes=require('./userRoutes')
const authRoutes=require('./authRoutes')
const carRoutes=require('./carRoutes')


router.use('/users',userRoutes)
router.use('/auth',authRoutes)
router.use('/cars',carRoutes)




module.exports=router;