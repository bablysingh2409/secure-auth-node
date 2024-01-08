const express=require('express');
const {verifyUser}=require('../middlewares/verifyToken');
const {updateUser}=require('../controllers/user');

const router=express.Router();

router.put('/updateuser/:id',verifyUser,updateUser);

module.exports=router;