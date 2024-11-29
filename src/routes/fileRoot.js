const express = require('express')
const router = express.Router()
const imageUpload=require('../middleware/uploadImages')
const modelUpload=require('../middleware/uploadModel')
const {uploadModel,getFileById,uploadImages,deleteFileById} = require('../controllers/fileController')

router.post('/uploadModelToCar/:id',modelUpload,uploadModel)
router.get('/getById/:id',getFileById)

router.post('/uploadImagesToCar/:id',imageUpload,uploadImages)
// router.delete('/deleteById/:id', deleteFileById);

// router.get('/getFileById/:id',getFileById)
// router.delete('/deleteFileById/:id',deletFileById)
// router.post('/uploadModel',modelUpload.single('model3d'),uploadModel)
// router.post('/uploadImages',imageUpload.array('images', 5),uploadImages) 

module.exports=router 