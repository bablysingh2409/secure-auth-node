const express=require('express');
const {createAdmin,loginAdmin}=require('../controllers/admin');

const router=express.Router();

router.post('/createadmin',createAdmin);
router.post('/login',loginAdmin);



module.exports=router;