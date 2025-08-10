import axios from "axios";
// import { access_token } from "./spotify.oauth.js";
let access_token = '';

const topTenTracks = async(req,res)=>{
    const aboutMe = await axios.get('https://api.spotify.com/v1/me',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });
    const topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });

    const aboutMeDetails = aboutMe.data;
    const topTracksU = topTracks.data.items;
    console.log(aboutMeDetails)
    console.log(topTracksU)
    res.json(topTracksU)
}

export {topTenTracks}