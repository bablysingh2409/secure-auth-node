const express=require('express');
const {verifyUser,verifyAdmin}=require('../middlewares/verifyToken');
const {updateUser,deleteUser,getUser}=require('../controllers/user');

const router=express.Router();

//update user
router.put('/updateuser/:id',verifyUser,updateUser);

//delete user
router.delete('/deleteuser/:id',verifyUser,deleteUser);

//get user
router.get('/:id',verifyUser,getUser)


module.exports=router;