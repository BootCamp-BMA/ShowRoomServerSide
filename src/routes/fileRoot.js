const express = require('express')
const router = express.Router()
const imageUpload=require('../middleware/uploadImages')

router.get('/getFileById/:id')
router.delete('/deleteFileById/:id')
router.post('/uploadModel')
router.post('/uploadImages',imageUpload.array('images', 5))

module.exports=router