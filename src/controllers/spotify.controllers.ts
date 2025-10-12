import axios from "axios";
import { access_token } from "./oauth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
// let access_token = '';

const topTenTracks = asyncHandler(async(req,res)=>{
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
})

const nowPlaying = asyncHandler(async(req,res)=>{
    const nowPlaying = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });
    const deviceId = await axios.get('https://api.spotify.com/v1/me/player/devices',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    console.log(deviceId)

    console.log(nowPlaying.data)
    res.json(new ApiResponse(200, 'Now Playing',nowPlaying.data))
})

const stopPlayback = asyncHandler(async(req, res)=>{
    console.log(access_token)
    const stop = await axios.put('https://api.spotify.com/v1/me/player/pause',{}, {
            headers:{
            Authorization: `Bearer ${access_token}`
        }
    });


    const deviceId = await axios.get('https://api.spotify.com/v1/me/player/devices',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })
    console.log(deviceId)
    console.log(stop);
    res.json(new ApiResponse(200, 'Song stoped', stop))
})

export {topTenTracks, nowPlaying, stopPlayback}