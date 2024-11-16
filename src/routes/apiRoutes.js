//   /api
const express = require('express')
const router = express.Router()
const userRoutes=require('./userRoutes')
const authRoutes=require('./authRoutes')
const carRoutes=require('./carRoutes')
const appointementRoutes=require('./appointementRoutes')


router.use('/users',userRoutes)
router.use('/auth',authRoutes)
router.use('/cars',carRoutes)
router.use('/appointement',appointementRoutes)




module.exports=router;