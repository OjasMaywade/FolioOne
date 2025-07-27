import express from "express";
import cors from "cors"
import indexRouter from "./routes/index.route.js";
const app = express();

app.use(cors());

//app.use('/api',indexRouter)



export {app};