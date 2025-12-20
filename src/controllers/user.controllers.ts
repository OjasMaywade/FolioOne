import userQuery from "../db/queries/user.query.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import userService from "../services/user.service.js";
import generateOtp from "../utils/generateOtp.js";
import { ApiResponse } from "../utils/apiResponse.js";
import options from "../constant.js";

const register = asyncHandler(async(req,res)=>{
    const userInfo = req.validated;
    
    const registerUser = await userService.register(userInfo);
  
    if(!registerUser) throw new Error (`Error While registering User`)

// Can pass user registration data like email, username,etc back to client
    res.json(new ApiResponse(201, 'User Registered Successfully'))
})

const login = asyncHandler(async (req, res)=>{
    
    const {email, username, password} = req.validated;
        
    const log = await userService.login({email, username, password});

    //log-in check at controller level
    res
    .cookie("accessToken", log.accessToken, options)
    .cookie("refreshToken", log.refreshToken, options)
    .json(new ApiResponse(200, 'User Logged-in'));
})


const logoutUser = asyncHandler(async(req,res)=>{
    const {id} = req.user;

    const remove = await userService.logoutUser(id);

    res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "user logged out"));
    
})

const updateProfile = asyncHandler(async(req,res)=>{
    const {username, firstname, lastname, email} = req.validated;
    const {id} = req.user;

    const updateUser = await userService.updateProfile({username, firstname, lastname, email, id})

    //response validation received from service level

    res.json(new ApiResponse(201,"User Profile Successfully updated"))

})

const me = asyncHandler(async(req,res)=>{
    //add service logic on this controller or not to ?
        const userInfo = await userQuery.userAllInfo(req.user.id);
        
        if(!userInfo) throw new Error(`User not found with Id: ${req.user.id}`);

    res.json(new ApiResponse(200, "Successfully Fetched User",userInfo));
})

const deleteUser = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const deleteUser = await userService.deleteUser(id);

    if(!deleteUser) throw new Error(`error faced when deleting User, Try Again`);

    res.json(new ApiResponse(200, 'user Deleted successfully'));
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
// do we need to add more checks to this like cookie validation etc
    const {refreshToken} = req.cookies;

    const token = await userService.refreshAccessToken(refreshToken);

    res
    .cookie("accessToken",token.accessToken, options)
    .cookie("refreshToken", token.refreshToken, options)
    .json(new ApiResponse(201, 'Access token generated successfully'));
})

// Reset Password Controller

const resetPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.validated;
    const {id} = req.user;

    const reset = await userService.resetPassword(oldPassword, newPassword, id)

    if(!reset) throw new Error (`Error while resetting Password`);

    // create a common options as it is getting repeated - Done

    res
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, 'Password reset successfully, please login again with new password'));

})

const updateProfilePic = asyncHandler(async(req, res)=>{
// I can add more input validation for path and filename too.
    const {path, filename} = req.file;
    const {id} = req.user;

    const uploadProfilePicS3 = await userService.uploadProfilePic(path, filename, id);

    res.json(new ApiResponse(200, `Profile photo uploaded successfully: ${uploadProfilePicS3}`));
})

const verifyEmail = asyncHandler(async(req, res)=>{
    console.log(generateOtp(6));
})

export default
{ 
    register, 
    login, 
    logoutUser, 
    updateProfile, 
    me, 
    deleteUser,
    refreshAccessToken,
    resetPassword,
    updateProfilePic,
    verifyEmail
}

 /* Register
    1. User click on sign-up
    2. user given option to create profile with details like username, email, password, etc (include info necessary for login)
    3. this info will be send through body
    4. take the info from body into variables
    5. search the db with given details to find existing user
    6. if not found then create the user
    7. and store the data in db
    8. send back the necessary info back to user    
    */

/* Login:
1. user send email/username and password through header or body
2. we will verify the username/email and password
3. then if the user is available and password is correct then generate a access and refresh token
4. save the refresh token in db
5. send the access and refresh t
 through cookies
*/

/* updateProfile
    1. here useR can update his/
    profile info like: email, bio, username, first and last name 
    2. then check for the update
    de the user
    3. and make update in db 
    4. return the changes and de
    s with success message

*/