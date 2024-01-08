const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError = require('../middlewares/error');
const jwt=require('jsonwebtoken');
require('dotenv').config();



const authentication = {
    signup: async (req, res, next) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                email: req.body.email,
                phone: req.body.phone,
                name: req.body.name,
                profileImg: req.body.profileImg,
                password: hash,
            });

            await newUser.save();
            res.status(200).json(newUser);

        }
        catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, phone} = req.body;
            let user;
            if (email) user =await User.findOne({email});
            else  user =await User.findOne({phone});
            if (!user) return next(createError(404, 'user not found'));

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordCorrect) return next(createError(400, 'wrong password or email/phoneNo.'));

            const token= jwt.sign(
                {
                    id:user._id,
                    role:user.role
                },
                process.env.JWT_SECRET
            );

            const {password,role,...otherDetails}=user._doc;

            res.cookie("access_token",token,{
                httpOnly:true,
                maxAge: 3600000
            }).status(200).json({...otherDetails});
        } catch (err) {
            next(err);
        }
    }
}
module.exports = authentication;