const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true})
.then(()=>{
    console.log('Connected...')
})
.catch((err)=>{
    console.log("Error: ",err);
})

const movieschema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        min:[0,'Rating Must be positive']
    }
});

const movies=mongoose.model('Movie',movieschema);

//const godfather=new movies({title:'Godfather',year:1972,rating:9.2});

movies.insertMany([
    {title:'',rating:9}
]).then((data)=>{
    console.log("Success");
    console.log(data);
})
.catch((err)=>{
    console.log(err);
})

movies.findOneAndUpdate({title:'Godfather1'},{rating:-1.0},{runValidators:true});

//The above line produces error