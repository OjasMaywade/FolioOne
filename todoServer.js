import 'dotenv/config';
import express from 'express';
 const app = express();
 import bodyParser from 'body-parser';
 import cors from 'cors';
 import fs, { writeFile } from 'fs';
 import { fileURLToPath } from 'url';
 import { dirname } from 'path';
 import path from "path";
 import mongoose from "mongoose";
 const port = 3000;

 //Authentication MiddleWare
 var userAuthentication = async(req,res,next) =>{
  let {username, password} = req.headers;
  let auth = await Auth.findOne({username});
  if(auth){
    if(auth.username === username && auth.password === password){
      
      next();
    }else {
      res.send("login Failed");
    }
  }else {
    res.send("User not registered");
  }
 }
  
 var a;
 //Mongoose Schema
 const todoSchema = new mongoose.Schema({
  title: String,
  description: String
 })

 const authentication = new mongoose.Schema({
  username: String,
  password: String,
  userTodo: [{type: mongoose.Schema.Types.ObjectId, ref:'Todo'}]
 })
 //Mongoose Model
 const Todo = mongoose.model('Todo',todoSchema);
 const Auth = mongoose.model('Auth', authentication)
 
 //Mongoose Connect
 mongoose.connect('mongodb+srv://ojasmaywade16:weuary2cle@cluster0.mrstiw8.mongodb.net/todos');


 app.use(bodyParser.json());

 //Cors
 const allowedOrigins = ['http://127.0.0.1:5500']
 app.use(cors({origin: allowedOrigins}));

 //Sending HTML file to the specific route
 console.log(dirname(fileURLToPath(import.meta.url)));
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
 app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', "todo.html"))
 })

 //User Sign-Up Route
 app.post('/sign-up', async (req,res)=>{
  let {username} = req.body;
  let auth = await Auth.findOne({username});
  if(auth){
    res.send("User Already Exists");
  } else{
    const auth = new Auth(req.body);
    await auth.save();
    res.send("Successfully Registered");  
  }
 })

 //User Sign-In Route
 //here we have to check the username and password both send by the user with our database
 app.post('/sign-in', userAuthentication, async(req,res)=>{
  res.send("Login Successful");
 })

//Get-All Todo Route
 app.get('/todos', userAuthentication,  async (req,res)=> {
  const todos = await Todo.find({});
   res.json(todos);
  });

  //Get-Todo by Id Route
 app.get('/todos/:id', userAuthentication, async (req,res)=>{
  let reqId = req.params.id;
  console.log(reqId);
  const todo = await Todo.findById(reqId);
console.log(todo);
    if(todo==undefined){
      res.status(404).send("To Do Item not found");
    }else {
    res.send(todo);
    }
});

//Post todo
 app.post('/todos', userAuthentication, async (req,res)=>{
  const todo = new Todo(req.body);
  await todo.save();
   console.log("File have been saved !!");
   res.status(201).json(req.body);
 })

//Update todo
 app.put('/todos/:id', userAuthentication, async (req,res)=>{
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
   if(todo){
    res.status(200).send("item is updated")
   } else{
    res.status(404).send("To Do not found");
   }
  })
  
  
// Delete Todo
 app.delete('/todos/:id', userAuthentication, async (req,res)=>{
  const todo = await Todo.findByIdAndDelete(req.params.id)
  // let reqId = req.params.id;
  if(todo){
    res.status(200).send("item is deleted");
  }else{
    res.status(404).send("To Do not found");
  }
})

//Error for rest routes
 app.get('/:route', (req,res)=>{
  res.status(404).send("Page Not found");
 })


app.listen(process.env.PORT, ()=>{
  console.log(`The server is running on port ${process.env.PORT}`);
  // fs.readFile("./files/b.txt", "utf8", (err, data)=>{
  //   a = data;
  //   arr = JSON.parse(data);
  //   id = arr.length;
  // })
 })

export default app;

 