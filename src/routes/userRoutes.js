const express = require('express');
const router=express.Router();
const userController = require('../controllers/userController'); 
const { auth } = require('../middleware/auth');

router.post('/register',userController.register)
router.post('/login',userController.login);

router.get('/users',auth(['admin']),userController.getUsersWhere);
router.put('/updateUser',auth(['user','admin']),userController.updateProfile)

router.delete('/delete',auth(['admin']),userController.deleteUsers)




module.exports=router;