const express=require('express');
const path=require('path');
const app=express();

app.listen(3000,()=>{
    console.log('LISTENING');
})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

const random_value=Math.floor(Math.random()*10)+1;

app.get('/',(req,res)=>{
    res.render('home',{rand:random_value});
})

app.get('/arrcheck',(req,res)=>{
    let vals=[1,2,3,4,5];
    res.render('arrs',{arr:vals});
})



