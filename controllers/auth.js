const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createError=require('../middlewares/error')


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
    }
}
module.exports=authentication;