const express = require('express')
const router = express.Router()

router.get('/getFileById/:id')
router.delete('/deleteFileById/:id')
router.post('/uploadModel')
router.post('/uploadImages')

module.exports=router