const express=require('express');
const auth=require('../controllers/auth');


const router=express.Router();

router.post('/signup',auth.signup);

module.exports=router;

 