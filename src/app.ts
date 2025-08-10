import express from "express";
import cors from "cors"
const app = express();

app.use(cors());

//app.use('/api',indexRouter)
import spotifyOauthRouter from "./routes/oauth.routes.js"
import spotifyRouter from "./routes/spotify.routes.js"

app.use("/api/v1/auth", spotifyOauthRouter)
app.use("/api/v1/spotify", spotifyRouter)


export {app};