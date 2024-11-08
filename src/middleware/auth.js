const jwt = require('jsonwebtoken')
const {secretKey}=require('../config/config.js')
const User= require('../models/userModel.js')

const auth=(roles=[])=>{
    return async (req,res,next)=>{
        try {
            const token=req.headers.authorization?.split(' ')[1];

            if(!token) 
                return res.status(401).json({message:"Access denied no token provided "})
            
            const decoded=jwt.verify(token,secretKey)
            
            req.user=decoded;

            if(roles.length && !roles.includes(req.user.role))
                return res.status(403).json({message:"permission denied"});

            const user = await User.findById(req.user.id);
            if(!user)
                return res.status(404).json({message:"user not found "});

            next();


            
        } catch (error) {
            res.status(401).json({message : "invalid or expired token "})
            
        }
    }
}

const generateToken = (user)=>{
    return jwt.sign({
        id:user._id,
        role:user.role
    },
    secretKey,
    {
        expiresIn:'1h'
    }
)
}

module.exports={auth,generateToken}