const express = require('express')
const router = express.Router()
const imageUpload=require('../middleware/uploadImages')
const modelUpload=require('../middleware/uploadModel')

router.get('/getFileById/:id')
router.delete('/deleteFileById/:id')
router.post('/uploadModel',modelUpload.single('model3d'))
router.post('/uploadImages',imageUpload.array('images', 5))

module.exports=router