const express= require("express");
const app=express();
const port=8080;
const path = require("path");
//for using uuid package we have to require it as:
const {v4 : uuidv4} = require('uuid'); //v4 is version4
//Requiring package method-override
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username : "Kishori",
        content : "I love coding"
    },
    {
        id: uuidv4(),
        username : "Keshav",
        content : "Sucess depends on : Hardwork & Smartwork"
    },
    {
        id: uuidv4(),
        username : "AdityaGoel",
        content : "Got my first internship"
    }
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
// Creating new post
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})

//Finding post using id:
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params; //Extracting id
    let post =posts.find((p)=> id ===p.id); //Finding Post
    res.render("show.ejs",{post});
})

//Updating Content
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent=req.body.content;
    let post =posts.find((p)=> id ===p.id);
    post.content=newcontent;
    res.redirect("/posts");
})

//Editing the content
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p)=> id ===p.id);
    res.render("edit.ejs",{post});
});

//Delete Route
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts =posts.filter((p)=> id !==p.id);
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})