 import express from 'express';
 const app = express();
 import bodyParser from 'body-parser';
 import cors from 'cors';
 import fs, { writeFile } from 'fs';
 import { fileURLToPath } from 'url';
 import { dirname } from 'path';
 import path from "path";
 const port = 3000;
 let id=0;
 var arr = [];
 var a;
 app.use(bodyParser.json());
 const allowedOrigins = ['http://127.0.0.1:5500']
 app.use(cors({origin: allowedOrigins}));

 console.log(dirname(fileURLToPath(import.meta.url)));
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
 app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', "todo.html"))
 })

function allTodos(req,res){
 fs.readFile("./files/b.txt", "utf-8", (err,data)=>{
  if(err) throw err;
  res.send(JSON.parse(data));
 })
 }

function retriveTodo(req,res){
  let reqId = req.params.id;
  
  fs.readFile("./files/b.txt", "utf-8", (err,data)=>{
    if(err) throw err;
    if(JSON.parse(data)[reqId]==undefined){
      res.status(404).send("To Do Item not found");
    }else {
    res.send(JSON.parse(data)[reqId]);
    }
})
}

function createTodos(req,res){
 arr[id] = req.body;
 a = JSON.stringify(arr);
 // convert very thing into a string refer notes
 fs.writeFile("./files/b.txt", a, (err)=>{
  if(err) throw err;
  console.log("File have been saved !!");
  res.status(201).json(req.body);
  id++;
})
}

function updateTodo(req,res){
  let reqId = req.params.id;
  if(JSON.parse(a)[reqId]==undefined){
    res.status(404).send("To Do not found");
  }else {
  arr[reqId] = req.body;
  a = JSON.stringify(arr);
  fs.writeFile("./files/b.txt", a, (err)=>{
    if(err) throw err;
    console.log("File have been updated");
  })
  res.status(200).send("item is updated");
}
}

function deleteTodo(req,res){
  let reqId = req.params.id;
  if(id>=reqId){
    arr.splice(reqId,1);
    id--;
    a = JSON.stringify(arr);
    fs.writeFile("./files/b.txt", a, (err)=>{
      if(err) throw err;
      console.log("File have been updated");
    })
    res.status(200).send("item is deleted");
  }else if(id<reqId){
    res.status(404).send("To Do not found");
  }
}

 app.get('/todos', allTodos)
 app.get('/todos/:id', retriveTodo)
 app.post('/todos', createTodos)
 app.put('/todos/:id', updateTodo)
 app.delete('/todos/:id', deleteTodo)
 app.get('/:route', (req,res)=>{
  res.status(404).send("Page Not found");
 })


app.listen(port, ()=>{
  console.log(`The server is running on port ${port}`);
  fs.readFile("./files/b.txt", "utf8", (err, data)=>{
    a = data;
    arr = JSON.parse(data);
    id = arr.length;
  })
 })

export default app;

 