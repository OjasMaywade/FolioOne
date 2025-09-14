import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import userQuery from "../db/queries/user.query.js"
import axios from "axios";
import spotify from "../providers/spotify.provider.js";
import google from "../providers/google.povider.js";

const providers = {
    google,
    spotify
}

const generateAccessTokenAndRefreshToken = async (userData, userId)=>{
    
    let accessToken = await generateAccessToken(userData);
    let refreshToken = await generateRefreshToken(userId);

    const insertRefreshToken = await userQuery.insertRefreshToken(refreshToken, userId.id);

    if(!insertRefreshToken) throw new Error(`Error while inserting Refresh Token`)

        console.log(insertRefreshToken);

    return {accessToken, refreshToken}
}
      
const redirect = (provider)=>{
    const redirect_uri = providers[provider].redirectUrl;
    /*'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REDIRECT_URI,
      scope: 'user-read-private user-read-email user-top-read'  
    }).toString();*/
    return redirect_uri
}

const callback = async(code, provider)=>{
    if(!code) throw new Error (`Authorization code not received from Auth Provider, try again`);

        const userToken = await providers[provider].token(code);
        /*await axios.post('https://accounts.spotify.com/api/token',null,{
            params:{
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            }
        });*/
    
        return userToken.data.access_token;
}

export default {generateAccessTokenAndRefreshToken, redirect, callback}

