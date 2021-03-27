const mongoose=require('mongoose');
const Product=require('./models/products')
mongoose.connect('mongodb://localhost:27017/farmmarket', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log("Error: ",err);
})

const seedMany=[
    {name:'Oranges',price:2.5,category:'fruit'},
    {name:'Pumpkin',price:1.5,category:'vegetable'},
    {name:'Chocolate milk',price:2,category:'dairy'},
]

Product.insertMany(seedMany).then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
});
