const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose')
const Campground=require('./models/Campground')
const method_override=require('method-override');
const ejs_mate=require('ejs-mate')
const AppError=require('./utils/AppError');
const catchAsync=require('./utils/catchAsync');
const { error } = require('console');
const {CampgroundSchema}=require('./schemas');


app.use(express.urlencoded({extended:true}));
app.use(method_override('_method'))

app.engine('ejs',ejs_mate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

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

app.listen(3000,()=>{
    console.log('APP STARTED');
})


app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/campgrounds',async (req,res)=>{
    const campgrounds= await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
})

app.get('/campgrounds/new',(req,res)=>{
    res.render('campgrounds/new');
})

app.get('/campgrounds/:id',catchAsync(async (req,res)=>{
    const {id}=req.params;
    const camp= await Campground.findById(id);
    res.render('campgrounds/show',{camp});
}))

function validateSchema(req,res,next){
    const {error}=CampgroundSchema.validate(req.body)
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new AppError(msg,400);
    }
    else{
        next()
    }
}

app.put('/campgrounds/:id',validateSchema,catchAsync(async (req,res)=>{
    const {id}=req.params;
    const camp=await Campground.findByIdAndUpdate(id,req.body,{new:true});
    res.redirect(`/campgrounds/${camp._id}`);
}))

app.delete('/campgrounds/:id',catchAsync(async (req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

app.get('/campgrounds/:id/edit',catchAsync(async (req,res)=>{
    const {id}=req.params;
    const camp= await Campground.findById(id);
    res.render('campgrounds/edit',{camp});
}))

app.post('/campgrounds',validateSchema,catchAsync(async (req,res)=>{
    const camp=new Campground(req.body); 
    await camp.save();
    res.redirect(`campgrounds/${camp._id}`);
}))

app.all('*',(req,res,next)=>{
    next(new AppError('PAGE NOT FOUND!',404));
})

app.use((err,req,res,next)=>{
    const {status=500}=err;
    if(!err.message) err.message="SOMETHING WENT WRONG!!";
    res.status(status).render('Error',{err});
})