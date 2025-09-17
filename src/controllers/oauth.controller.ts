import userService from "../services/user.service.js";
import authService from "../services/auth.service.js"
import { asyncHandler } from "../utils/asyncHandler.js";

let refresh_token = " ";
let access_token = " ";
// app.get('/auth/spotify', 

// shift code to service, db queries, utils
const redirectFunction = (req,res)=>{
    const {provider} = req.params;
    console.log(provider)
    const redirect_uri = authService.redirect(provider);
    res.redirect(redirect_uri);
}

// app.get('/auth/spotify/callback', 
    
const callback = asyncHandler(async(req,res)=>{
    const code = req.query.code;
    const {provider} = req.params;

    access_token =  await authService.callback(code, provider);
    
    console.log(access_token);  
    res.status(200).send(access_token)
})

export {access_token, redirectFunction, callback};