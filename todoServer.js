var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import mongoose from "mongoose";
import z from "zod";
const port = 3000;
//Authentication MiddleWare
var userAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.headers;
    let auth = yield Auth.findOne({ username });
    if (auth) {
        if (auth.username === username && auth.password === password) {
            next();
        }
        else {
            res.send("login Failed");
        }
    }
    else {
        res.send("User not registered");
    }
});
var a;
//Mongoose Schema
const todoSchema = new mongoose.Schema({
    title: String,
    description: String
});
const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        required: true,
        minLength: [8, 'password is to short, password length should be 8 to 14 character'],
        maxLength: 14
    },
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});
//Mongoose Model
const Todo = mongoose.model('Todo', todoSchema);
const Auth = mongoose.model('Auth', userSchema);
//Mongoose Connect
mongoose.connect('mongodb+srv://ojasmaywade16:weuary2cle@cluster0.mrstiw8.mongodb.net/todos');
app.use(bodyParser.json());
//Cors
const allowedOrigins = ['http://127.0.0.1:5500'];
app.use(cors({ origin: allowedOrigins }));
//Sending HTML file to the specific route
console.log(dirname(fileURLToPath(import.meta.url)));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', "todo.html"));
});
//User Sign-Up Route
app.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username } = req.body;
    let auth = yield Auth.findOne({ username });
    if (auth) {
        res.send("User Already Exists");
    }
    else {
        const auth = new Auth(req.body);
        yield auth.save();
        res.send("Successfully Registered");
    }
}));
//User Sign-In Route
//here we have to check the username and password both send by the user with our database
app.post('/sign-in', userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Login Successful");
}));
//Get-All Todo Route
app.get('/todos', userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Todo.find({});
    res.json(todos);
}));
//Get-Todo by Id Route
app.get('/todos/:id', userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reqId = req.params.id;
    console.log(reqId);
    const todo = yield Todo.findById(reqId);
    console.log(todo);
    if (todo == undefined) {
        res.status(404).send("To Do Item not found");
    }
    else {
        res.send(todo);
    }
}));
//zod
let titleInputProps = z.object({
    title: z.string().min(1),
    description: z.number().min(1),
});
//Post todo
app.post('/todos', userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = titleInputProps.safeParse(req.body);
    console.log(parsedInput);
    const todo = new Todo(req.body);
    yield todo.save();
    console.log("File have been saved !!");
    res.status(201).json(req.body);
}));
//Update todo 'node18', or 'nod
app.put('/todos/:id', userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (todo) {
        res.status(200).send("item is updated");
    }
    else {
        res.status(404).send("To Do not found");
    }
}));
// Delete Todo
app.delete('/todos/:id', userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield Todo.findByIdAndDelete(req.params.id);
    // let reqId = req.params.id;
    if (todo) {
        res.status(200).send("item is deleted");
    }
    else {
        res.status(404).send("To Do not found");
    }
}));
//Error for rest routes
app.get('/:route', (req, res) => {
    res.status(404).send("Page Not found");
});
app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
    // fs.readFile("./files/b.txt", "utf8", (err, data)=>{
    //   a = data;
    //   arr = JSON.parse(data);
    //   id = arr.length;
    // })
});
export default app;
