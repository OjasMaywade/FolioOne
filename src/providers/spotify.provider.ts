import axios from "axios";
const redirectUrl = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: process.env.REDIRECT_URI,
      scope: 'user-read-private user-read-email user-top-read user-modify-playback-state user-read-currently-playing user-read-playback-state'  
    }).toString();

    const token = async(code)=>{
        return await axios.post('https://accounts.spotify.com/api/token',null,{
            params:{
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            },
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
            }
        })
    }

    export default {redirectUrl, token}