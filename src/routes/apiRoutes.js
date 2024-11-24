//   /api
const express = require('express')
const router = express.Router()
const userRoutes=require('./userRoutes')
const authRoutes=require('./authRoutes')
const carRoutes=require('./carRoutes')
const appointementRoutes=require('./appointementRoutes')
const contactRoutes = require('./routes/contactRoutes');


router.use('/users',userRoutes)
router.use('/auth',authRoutes)
router.use('/cars',carRoutes)
router.use('/appointement',appointementRoutes)
// Add this line to include the contact routes
router.use('/contact', contactRoutes);




module.exports=router;