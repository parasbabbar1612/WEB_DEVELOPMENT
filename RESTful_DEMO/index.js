const express=require('express');
const path=require('path');
const {v4:uuid}=require('uuid')
const app=express();
const method_override=require('method-override');

app.listen(3000,()=>{
    console.log("LISTENING ON PORT 3000");
})

app.use(express.urlencoded({extended:true}));
app.use(method_override('_method'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

let comments=[
    {id:uuid(),username:'user1', comment:'comment1'},
    {id:uuid(),username:'user2', comment:'comment2'},
    {id:uuid(),username:'user3', comment:'comment3'},
]

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/new',(req,res)=>{
    res.render('comments/new');
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const new_comment=comments.find(c=>c.id===id);
    //console.log(new_comment)
    res.render('comments/show',{new_comment});
})

app.post('/comments',(req,res)=>{
   console.log(req.body);
   const {user_name,user_comments}=req.body;
   comments.push({id:uuid(),username:user_name,comment:user_comments});
   res.redirect('/comments');
});

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/edit',{comment});
})

app.patch('/comments/:id',(req,res)=>{
const {id}=req.params;
const comment_text=req.body.update_comment;
const new_comment=comments.find(c=>c.id===id);
new_comment.comment=comment_text;
// console.log('PATCHING')
res.redirect('/comments');
})


app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments=comments.filter(c=>c.id!==id)
    res.redirect('/comments');
})