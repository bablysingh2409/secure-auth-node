const User = require('../models/User');
const createError = require('../middlewares/error');


//update user details but only name and profile image
const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name, profileImg } = req.body;

        //checking if the user exist
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, 'user not found'));
        }

        //updating user details excluding email and phone 
        user.name = name || user.name;
        user.profileImg = profileImg || user.profileImg;

        //saving updated user
        await user.save();
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

//delete user
const deleteUser=async (req,res,next)=>{
    try {
        const userId = req.params.id;

        //deleting the user
        await User.findByIdAndDelete(userId);
        res.status(200).send('your data is deleted');
    } catch (err) {
        next(err);
    }
}

//get user
const getUser=async(req,res,next)=>{
    try{
        // console.log('params is',req.params)
        const userId=req.params.id;

        const user=await User.findById(userId);
        if(!user){
            return next(createError(404, 'user not found'));
        }
        res.status(200).json(user);
    }catch(err){
        next(err);
    }
}

//get all user data and it is only access by admin
const getAllUserData=async(req,res,next)=>{
    try{
        const allUser=await User.find();
        if(!allUser){
            return next(createError(404,'users not found'));
        }

        res.status(200).json(allUser)

    }catch(err){
        next(err);
    }
}

module.exports = { updateUser,deleteUser,getUser,getAllUserData };