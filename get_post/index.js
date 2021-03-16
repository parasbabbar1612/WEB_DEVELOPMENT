const express=require('express');
const app=express();

app.use(express.urlencoded({extended:true}));

app.listen(3000,()=>{
    console.log("LISTENING GET POST REQUESTS");
})

app.get('/getpost',(req,res)=>{
    res.send("GET REQUEST");
})

app.post('/getpost',(req,res)=>{
    console.log(req.body)
    const {first_p,last_p}=req.body;
    res.send( ` Posted information is ${first_p} ${last_p}`);
})

