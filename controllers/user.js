const User = require('../models/User');
const createError = require('../middlewares/error')


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
        res.status(200).send('your data is updated');
    } catch (err) {
        next();
    }
}

const deleteUser=async (req,res,next)=>{
    try {
        const userId = req.params.id;

        //deleting the user
        await User.findByIdAndDelete(userId);
        res.status(200).send('your data is deleted');
    } catch (err) {
        next();
    }
}

module.exports = { updateUser,deleteUser };