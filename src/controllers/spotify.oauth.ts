import { app } from "../app.js";
import axios from "axios";

let refresh_token = " ";
let access_token = " ";
// app.get('/auth/spotify', 

const redirectFunction = (req,res)=>{
    const redirect_uri = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REDIRECT_URI,
      scope: 'user-read-private user-read-email user-top-read'  
    }).toString();
    res.redirect(redirect_uri);
}

// app.get('/auth/spotify/callback', 
    
const callback = async(req,res)=>{
    const code = req.query.code;

    if(!code){
        res.status(400).send(`code not returned`);
    }

    const token = await axios.post('https://accounts.spotify.com/api/token',null,{
        params:{
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
        }
    });

    access_token = token.data.access_token;
    console.log(access_token);  
    res.status(200).send(access_token)
}

export {access_token, redirectFunction, callback};