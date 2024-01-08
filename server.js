const express=require('express');
const mongoose=require('mongoose');
const auth=require('./routes/auth');

const app=express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/secureAuthNode', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/auth',auth);


app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errMsg=err.message|| "something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errMsg,
        stack:err.stack
    })
})


app.listen(5800,()=>{
    console.log("server is running on port 5800");
})

 