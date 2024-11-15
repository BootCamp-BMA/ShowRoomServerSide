const express = require('express');
const router = express.Router();
const {auth}= require('../middleware/auth')
const {getAppointmentById, getAppointementWhere, updateAppointment, createAppointment, deleteAppointment}=require('../controllers/appointementController')

router.get('/getById/:id',auth(['admin','user']),getAppointmentById)
router.get('/getWhere',auth(['admin','user']),getAppointementWhere)
router.put('/update',auth(['admin','user']),updateAppointment)
router.post('/create',auth(['admin','user']),createAppointment)
router.delete('/delete',auth(['admin']),deleteAppointment)






module.exports