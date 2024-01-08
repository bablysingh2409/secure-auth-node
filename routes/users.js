const express=require('express');
const {verifyUser}=require('../middlewares/verifyToken');
const {updateUser,deleteUser}=require('../controllers/user');

const router=express.Router();

router.put('/updateuser/:id',verifyUser,updateUser);
router.delete('/deleteuser/:id',verifyUser,deleteUser);

module.exports=router;