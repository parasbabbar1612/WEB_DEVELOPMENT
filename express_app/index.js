const { response } = require("express");
const express=require("express");
const app=express();

app.listen(3000,()=>{
    console.log("Listening");
})

app.get('/',(req,res)=>{
   res.send("Welcome to web development");
})

app.get('/r/:subpath',(req,res)=>{
    const {subpath}=req.params;
    res.send(`<h1> Browsing ${subpath}`);
})

app.get('/test',(req,res)=>{
    res.send("Routing path=test");
})

app.get('/search',(req,res)=>{
    console.log(req.query);
    const {q}=req.query;
    if(!q) res.send(`<h1>NOTHING FOUND!</h1>`); 
    else res.send(`<h1>Search results for ${q}</h1>`);
})

app.get('*',(req,res)=>{
    res.send("INVALID PATH");
})

