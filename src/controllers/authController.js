const User=require('../models/userModel')
const bycryptjs= require('bcryptjs')
const {generateToken} = require ('../middleware/auth.js')

module.exports.register=async(req,res,next)=>{
    try {
        const {firstName,lastName,phoneNum,email,password}=req.body;

        if(await User.findOne({ email }))
            return res.status(400).json({message:'Email already exists '});

        const user=new User({firstName,lastName,phoneNum,email,password})
        await user.save();

        const token = generateToken(user) 
        res.status(201).json({token,user:{id:user._id,email:user.email,role:user.role}});

        
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req,res,next)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findOne({email});

        if(!user || !await bycryptjs.compare(password,user.password))
            return res.status(401).json({message: 'invalid email or password'})
        
        const token = generateToken(user);
        res.json({token,user:{id:user._id,email:user.email,role:user.role}})
        
    } catch (error) {
        next(error)
    }
}
