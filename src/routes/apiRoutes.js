//   /api
const express = require('express')
const router = express.Router()
const userRoutes=require('./userRoutes')
const authRoutes=require('./authRoutes')
const carRoutes=require('./carRoutes')
const appointementRoutes=require('./appointementRoutes')
const fileRoot=require('./fileRoot.js')


router.use('/users',userRoutes)
router.use('/auth',authRoutes)
router.use('/cars',carRoutes)
router.use('/appointement',appointementRoutes)
router.use('/file',fileRoot) 




module.exports=router;