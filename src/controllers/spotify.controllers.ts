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
    
    console.log(stop);
    res.json(new ApiResponse(200, 'Song stoped', stop))
})

const startPlaying = asyncHandler(async(req, res)=>{

    const {trackNo} = req.params;

    const topTracks = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });
    const start = await axios.put('https://api.spotify.com/v1/me/player/play',
        {uris: [topTracks.data.items[trackNo].uri],
            position_ms: 0
        },
        {
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });

    console.log(start);
    res.status(200).json(topTracks.data.items[0].album)
})

const followed = asyncHandler(async(req, res)=>{
    const list = await axios.get('https://api.spotify.com/v1/me/following?type=artist',{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });
    console.log(list.data);
    res.status(200).json(new ApiResponse(200, 'List of artist followed', list.data));
})

export {topTenTracks, nowPlaying, startPlaying, stopPlayback, followed}