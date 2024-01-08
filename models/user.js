const mongoose=require('mongoose');


const UserSchema=new mongoose.Schema({
    email:{
       type:String,
       unique:true,
       required:true
    },
    phone:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profileImg:String,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
});

module.exports=mongoose.model('User',UserSchema);