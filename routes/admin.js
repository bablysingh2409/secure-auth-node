const express=require('express');
const {createAdmin,loginAdmin}=require('../controllers/admin');
const {getAllUserData}=require('../controllers/user');
const {verifyAdmin}=require('../middlewares/verifyToken');

const router=express.Router();

//create admin
router.post('/createadmin',createAdmin);

//login admin
router.post('/login',loginAdmin);

//get all user data and only admin is allowed to access
router.get('/userdata',verifyAdmin,getAllUserData);



module.exports=router;