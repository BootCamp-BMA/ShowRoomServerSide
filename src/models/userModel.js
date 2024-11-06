const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    phoneNum:{
        type:String,
        required:true,
        unique:true
    },
    phoneNum2:{
        type:String,
        default:null
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true

    },
    photo:{
        type:String,
        default:null
    },
    role:{
        type:String,
        enum:['guest','admin','user'],
        default:'user'
    }
},{
    timestamps:true
})

UserSchema.pre('save',async(next)=>{
    

})