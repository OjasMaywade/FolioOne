import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true, limit: "16kb"}));

//app.use('/api',indexRouter)
import spotifyOauthRouter from "./routes/oauth.routes.js"
import spotifyRouter from "./routes/spotify.routes.js"
// import userRouter from "./routes/user.routes.js"
import indexRouter from "./routes/index.route.js"

app.use("/api/v1", indexRouter)
// app.use("/api/v1/auth", spotifyOauthRouter)
// app.use("/api/v1/spotify", spotifyRouter)
// app.use("/api/v1/user", userRouter)
// app.use("/api/v1/blog")
// app.use("/api/v1/todo")
// app.use("/api/v1/finance")
// app.use("/api/v1/resume")


export {app};