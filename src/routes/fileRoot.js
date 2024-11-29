const express = require('express')
const router = express.Router()
const imageUpload=require('../middleware/uploadImages')
const modelUpload=require('../middleware/uploadModel')
const {deletFileById,getFileById,uploadModel, uploadImages} = require('../controllers/fileController')

// router.get('/getFileById/:id',getFileById)
// router.delete('/deleteFileById/:id',deletFileById)
// router.post('/uploadModel',modelUpload.single('model3d'),uploadModel)
// router.post('/uploadImages',imageUpload.array('images', 5),uploadImages)

module.exports=router