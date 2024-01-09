const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const createError = require('../middlewares/error');
const jwt=require('jsonwebtoken');
require('dotenv').config();



const createAdmin = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newAdmin = new Admin({
            email: req.body.email,
            password: hash,
        });

        await newAdmin.save();
        res.status(200).json(newAdmin);
 
    }
    catch (err) {
        next(err);
    }
}

const loginAdmin =async (req, res, next) => {
    try {
        const { email} = req.body;
        let admin =await Admin.findOne({email});

        if (!admin) return next(createError(404, 'admin not found'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, admin.password);
        if (!isPasswordCorrect) return next(createError(400, 'wrong password or email.'));

        const token= jwt.sign(
            {
                id:admin._id,
                role:admin.role
            },
            process.env.JWT_SECRET
        );

        const {password,role,...otherDetails}=admin._doc;

        res.cookie("access_token",token,{
            httpOnly:true,
            maxAge: 3600000
        }).status(200).json({...otherDetails});
    } catch (err) {
        next(err);
    }
}

module.exports={createAdmin,loginAdmin};