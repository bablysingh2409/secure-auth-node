const jwt=require('jsonwebtoken');
const createError=require('./error');
require('dotenv').config();


const verifyToken=(req,res,next)=>{
    // console.log(req.cookies);
    const token=req.cookies.access_token;
    
    if(!token) {
        return next(createError(401,'you are not authenticated'));
    };
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(createError(403,"token is not valid"));
        console.log(user)
        req.user=user;
        next();
    })

}

const verifyUser=(req,res,next)=>{
   
    verifyToken(req,res,()=>{
        console.log(req.params)
       if(req.user.id==req.params.id || req.user.role=='admin'){  
        next();
       }
       else{
        return next(createError(403,"you are not authorized"));
       }
    })
}

const verifyAdmin=(req,res,next)=>{
       verifyToken(req,res,()=>{
        if(req.user.role=='admin'){
            next();
        }
        else{
            return next(createError(403,"you are not authorized"));
        }
       })
        
    
}

module.exports={verifyUser,verifyAdmin};