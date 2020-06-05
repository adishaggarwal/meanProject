const express = require('express');
const app=express();
app.use(express.json());
const mongoose=require('./database/mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const bcrypt=require('bcryptjs');
const passport=require('passport');
const cors=require('cors');
app.use(cors());

const rtsIndex=require('./routes/index.router');
app.use('/api',rtsIndex);



const List=require('./database/models/list');
const Task=require('./database/models/task');
const User=require('./database/models/User');
require('./config/passportConfig');

//CORS 
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})

app.use(passport.initialize());
const jwtHelper=require('./config/jwtHelper');

app.get('/check',(req,res)=>{
    User.find()
    .then((users)=>{
        res.send(users);
})
.catch((error)=>console.log(error)); 
}); 

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
        //validation passed
        console.log("backend");
        console.log(req.body);
                    const newUser=new User({
                        name,
                        email,
                        password
                    });

                    //hash password
                    bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;

                        //set password to hashed
                        newUser.password=hash;
                        //save user
                        newUser.save() 
                        .then((user)=> res.send(user)
                        )
                        .catch(err=>console.log(err));
                    }))
                
            });

           




//List Create,update,readone,readall,delete
//Task Create,update,readone,readall,delete

app.get('/lists',(req,res)=>{
    List.find({})
    .then(lists =>res.send(lists))
    .catch((error)=>console.log(error));
}); 

app.post('/lists',(req,res)=>{
    (new List({'title':req.body.title}))
    .save()
    .then((list) =>res.send(list))
    .catch((error)=>console.log(error));
});

app.get('/lists/:listId',(req,res)=>{
    List.find({_id:req.params.listId})
    .then((list) =>res.send(list))
    .catch((error)=>console.log(error));
});

app.patch('/lists/:listId',(req,res)=>{
    List.updateOne({_id:req.params.listId},{$set:req.body})
    .then((list) =>res.send(list))
    .catch((error)=>console.log(error));
}); 

app.delete('/lists/:listId',(req,res)=>{
    const deleteTasks=(list)=>{
        Task.deleteMany({_listId:list._id})
        .then(()=>list)
        .catch((error)=>console.log(error));
    }
   const list= List.findByIdAndDelete({_id:req.params.listId})
    .then((list) =>deleteTasks(list))
    .catch((error)=>console.log(error));
    res.send(list);
}); 

// http://localhost:3000/lists/:listId/tasks/:taskId

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({_listId:req.params.listId})
    .then((tasks) =>res.send(tasks))
    .catch((error)=>console.log(error));
}); 

app.post('/lists/:listId/tasks',(req,res)=>{
    new Task({'title':req.body.title, '_listId':req.params.listId})
    .save()
    .then((tasks) =>res.send(tasks))
    .catch((error)=>console.log(error));
}); 

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOne({_listId:req.params.listId, _id:req.params.taskId})
    .then((task) =>res.send(task))
    .catch((error)=>console.log(error));
}); 

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.updateOne({_listId:req.params.listId,_id:req.params.taskId},{$set:req.body})
    .then((task) =>res.send(task))
    .catch((error)=>console.log(error));
});

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.findOneAndDelete({_listId:req.params.listId,_id:req.params.taskId})
    .then((task) =>res.send(task))
    .catch((error)=>console.log(error));
}); 

app.listen(3000,()=> 
    console.log("connected aa ji hor koi sewa??")
)