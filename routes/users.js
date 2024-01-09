const express=require('express');
const {verifyUser}=require('../middlewares/verifyToken');
const {updateUser,deleteUser,getUser}=require('../controllers/user');

const router=express.Router();

//update user
//both user and admin are allowed to update user data
router.put('/updateuser/:id',verifyUser,updateUser);

//delete user
//both user and admin are allowed to delete user data
router.delete('/deleteuser/:id',verifyUser,deleteUser);

//get user
//both user and admin are allowed to get user data
router.get('getuser/:id',verifyUser,getUser);




module.exports=router;