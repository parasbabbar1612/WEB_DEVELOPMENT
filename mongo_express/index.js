const express=require('express');
const app=express();
const path=require('path')
const Product=require('./models/products')
const method_override=require('method-override');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(method_override('_method'));

app.listen(3000,()=>{
    console.log("APP STARTED");
})

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmmarket', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log("Error: ",err);
})

const categories=['vegetable','fruit','dairy']

app.get('/index',async (req,res)=>{
    const {category}=req.query;
    if(category){
        const result=await Product.find({category:category});
        res.render('products/index',{result,category});
    }
    else{
        const result=await Product.find({});
        res.render('products/index',{result,category:'All'});
    }
    res.render('products/index',{result});
})

app.get('/index/new',(req,res)=>{
    res.render('products/new',{categories});
})

app.get('/index/new',(req,res)=>{
    res.render('products/new');
})

app.get('/index/:id',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render('products/product',{product});
})

app.put('/index/:id',async (req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body);
    res.redirect(`/index/${product._id}`);
})

app.delete('/index/:id',async (req,res)=>{
    const {id}=req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/index')}
)

app.get('/index/:id/edit',async (req,res)=>{
    const {id}=req.params;
    //console.log(id);
    const product=await Product.findById(id);
    res.render('products/edit',{product,categories});
})

app.post('/index',async (req,res)=>{
    const new_product=new Product(req.body); 
    await new_product.save();
    console.log(new_product);
    res.redirect(`index/${new_product._id}`);
})
