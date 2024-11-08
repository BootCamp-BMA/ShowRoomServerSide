const express =require('express')
const router= express.Router()
const authController=require('../controllers/authController.js')

router.post('/register',authController.register);
router.post('/login',authController.login)

router.get('/signup',(req,res,next)=>{
    res.render('signup')
})
router.get('/login', (req, res, next) => {
    res.render('login');
});


module.exports=router;