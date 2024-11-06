const User=require('../models/userModel.js')
const {generateToken} = require ('../middleware/auth.js')
const bycryptjs= require('bcryptjs')

module.exports.register=async(req,res,next)=>{
    try {
        const {firstName,lastName,phoneNum,email,password}=req.body;

        if(await User.findOne({ email }))
            return res.status(400).json({message:'Email already exists '});

        const user=new User({fistName,lastName,phoneNum,email,password})
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

module.exports.updateProfile =async (req,res,next)=>{
    try{
        const updates=req.body;
        const user = await User.findByIdAndUpdate(req.user.id,updates,{new:true}).select('-password');
        if(!user)
            return res.status(404).json({message: 'user not found '})
        res.status(200).json(user);
    }

    catch(error){
        next(error)
    }
}

module.exports.getUsersWhere=async(req,res,next)=>{
    try {
        const {condition={},sort={},select='',limit=1,skip=0}=req.body;

        const results=await User
                                .find(condition)
                                .sort(sort)
                                .limit(parseInt(limit))
                                .select(select)
                                .skip(parseInt(skip));

        res.json(results)
        
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUsers=async (req,res,next)=>{
    try {
        const id = req.body.id;
        const {ids=[]}=req.body;

        if(ids.length === 0 && id){
            const user= await User.findByIdAndDelete(id);
            if(!user) 
                return res.status(404).json({message:'use not found '});
            return res.json(200).json({message:'delete success '});
        }

        const result= await User.deleteMany({   _id:{$in:ids}   });
        if (result.deletedCount===0) {
            return res.status(404).json({message:'no user found'})
        }
        res.status(200).json({message:`${result.deletedCount} users are deleted sucessfully `})
        
    } catch (error) {
        next(error)
    }
}