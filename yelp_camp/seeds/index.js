const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose')
const Campground=require('../models/Campground')
const cities=require('./cities');
const {descriptors,places}=require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console.log("Connection Error")));
db.once("open",()=>{
    console.log("Database Connected")
})

const randomelement=(arr)=>{
    return arr[Math.floor(Math.random()*arr.length)];
}

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
    const random_location=randomelement(cities);
    const price=Math.floor(Math.random()*20)+10;
    const camp=new Campground({
        title:`${randomelement(descriptors)} ${randomelement(places)}`,
        location:`${random_location.city} , ${random_location.state} `,
        image:'https://source.unsplash.com/collection/483251',
        description:'EAT,SLEEP,RELAX',
        price:price
    });
    await camp.save();
}
}

seedDB().then(()=>mongoose.connection.close());