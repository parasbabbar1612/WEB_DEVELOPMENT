const express=require('express');
const app=express();
const AppError=require('./Apperror');

app.listen(3000,()=>{
    console.log("APP STARTED");
})

const match_password=(req,res,next)=>{
    const {password}=req.query;
    if(password=="Paras"){
        next();
    }
    throw new AppError('ERROR',401);
}

app.get('/chelsea',match_password,(req,res)=>{
    res.send("WELCOME TO THE HOME OF CHELSEA FC");
})

app.get('/error',(req,res)=>{
    newyork.high();
})

app.use((err,req,res,next)=>{
  const {status=500,message='Something went wrong'}=err;
  res.status(status).send(message);
})
