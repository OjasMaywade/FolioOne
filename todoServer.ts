import express from 'express';
 const app = express();
 import bodyParser from 'body-parser';
 import cors from 'cors';
 import fs, { writeFile } from 'fs';
 import { fileURLToPath } from 'url';
 import { dirname } from 'path';
 import path from "path";
 import mongoose from "mongoose";
 import z, { any } from "zod";
import { RequestHandler } from 'express';
import { Octokit } from 'octokit';
import querystring from 'query-string';
import session from 'express-session';

app.use(session({
  secret: 'a87b3a5d72!@#$%^&*()xmncbqwe0198!@#super-secure-key',
  resave: false,
  saveUninitialized: true
}));


function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
console.log(process.env.GITHUB_ACCESS_TOKEN);
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})
 interface login{
  username: string;
  password: string;
 }
 

 //Authentication MiddleWare
 var userAuthentication: RequestHandler = async (req,res,next) =>{
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

 const userSchema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    required: true,
    minLength: [8, 'password is to short, password length should be 8 to 14 character'],
    maxLength: 14
},
  todo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
 })
 //Mongoose Model
 const Todo = mongoose.model('Todo',todoSchema);
 const Auth = mongoose.model('Auth', userSchema)
 
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
  let {username}:login = req.body;
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
  let reqId: string = req.params.id;
  console.log(reqId);
  const todo = await Todo.findById(reqId);
console.log(todo);
    if(todo==undefined){
      res.status(404).send("To Do Item not found");
    }else {
    res.send(todo);
    }
});

//zod
let titleInputProps = z.object({
  title: z.string().min(1),
  description: z.number().min(1),
})
//Post todo
 app.post('/todos', userAuthentication, async (req,res)=>{
  const parsedInput = titleInputProps.safeParse(req.body);
  console.log(parsedInput)
  const todo = new Todo(req.body);
  await todo.save();
   console.log("File have been saved !!");
   res.status(201).json(req.body);
 })

//Update todo 'node18', or 'nod
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
 /*app.get('/:route', (req,res)=>{
  res.status(404).send("Page Not found");
 })*/

 //Github routes

 app.get('/github', async (req,res)=>{
  const userinfo = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  res.send(userinfo);
 })

 app.get('/github/:repo', async(req,res)=>{
  const repoInfo = await octokit.request('GET /repos/OjasMaywade/Dice-Game', {
    owner: 'OjasMaywade',
    repo: 'Dice-Game',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  res.send(repoInfo)
 })

 app.get('/github/:repo/issues', async(req,res)=>{
  const issueInfo = await octokit.request('POST /repos/OjasMaywade/Dice-Game/issues', {
    owner: 'OjasMaywade',
    repo: 'Dice-Game',
    title: 'Found a bug',
    body: 'I\'m having a problem with this.',
    assignees: [
      'OjasMaywade'
    ],
    labels: [
      'bug'
    ],
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  res.send(issueInfo)
 })

 // Spotify API
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
//let redirectUrl = 'http://127.0.0.1:3000/callback';
let url = 'https://accounts.spotify.com/api/token';

app.get('/login',(req,res)=>{
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      client_id: client_id,
      response_type: 'code',
      redirect_uri: process.env.REDIRECT_URI,
      state: state,
      scope: scope     
    }));
})

app.get('/callback', async (req, res)=> {

  const code = typeof req.query.code === 'string' ? req.query.code : '';
  let state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
   const params = new URLSearchParams();
  params.append('code', code);
  params.append('redirect_uri', process.env.REDIRECT_URI || '');
  params.append('grant_type', 'authorization_code');
    //const params = new URLSearchParams(paramsObj);

    let authOptions = {
  method:"POST",
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(`${client_id}:${client_secret}`).toString('base64')),
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params,
  }
    let apiResponse = await fetch(url, authOptions);

   /* if (!apiResponse.ok) {
      throw new Error(`HTTP ${apiResponse.status} - ${apiResponse.statusText}`);
    }*/
    console.log(apiResponse)
    let data = await apiResponse.json();
    console.log('Access Token:', data.access_token);
    var accessToken = data.access_token;
    return data.access_token;
  }
});


// let access_token = async () => {
  
//     let apiResponse = await fetch(url, authOptions);

//    /* if (!apiResponse.ok) {
//       throw new Error(`HTTP ${apiResponse.status} - ${apiResponse.statusText}`);
//     }*/
//     console.log(apiResponse)
//     let data = await apiResponse.json();
//     console.log('Access Token:', data.access_token);
//    // var accessToken = data.access_token;
//     return data.access_token;
// };
 
// console.log(`token: ${accessToken}`)

// app.get('/spotify', async (req,res)=>{
//   //let accessToken = await access_token();
//   console.log(`token: ${accessToken}`)
//   let getTracks = await fetch('https://api.spotify.com/v1/me/top/tracks',{
//     method:'GET',
//     headers: {Authorization:`Bearer ${accessToken}`}
//   })
//   let tracks = await getTracks.json();
//   res.send(tracks)
// }
// )

app.listen(process.env.PORT, ()=>{
  console.log(`The server is running on port ${process.env.PORT}`);
  // fs.readFile("./files/b.txt", "utf8", (err, data)=>{
  //   a = data;
  //   arr = JSON.parse(data);
  //   id = arr.length;
  // })
 })

export default app;



 