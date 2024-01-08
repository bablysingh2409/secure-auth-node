const jwt=require('jsonwebtoken');
const createError=require('./error');

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) {
        return next(createError(401,'you are not authenticated'));
    };
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(createError(403,"token is not valid"));
        req.user=user;
        next();
    })

}

const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
       if(req.user.id==req.params.id || req.user.role=='admin'){
        next();
       }
       else{
        return next(createError(403,"you are not authorized"));
       }
    })
}

module.exports={verifyUser};