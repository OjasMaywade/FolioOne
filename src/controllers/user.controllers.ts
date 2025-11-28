import userQuery from "../db/queries/user.query.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import userService from "../services/user.service.js";
import generateOtp from "../utils/generateOtp.js";

const register = asyncHandler(async(req,res)=>{
    const userInfo = req.body;
    
    const registerUser = await userService.register(userInfo);
  
    if(!registerUser) throw new Error (`Error While registering User`)

    res.status(201).send('User Registered Successfully')
})

const login = asyncHandler(async (req, res)=>{
    
    const {email, username, password} = req.body;
        
    const log = await userService.login({email, username, password});

    const options = {
        httpOnly: true,
        secure: true
        }

        res.status(200)
        .cookie("accessToken", log.accessToken, options)
        .cookie("refreshToken", log.refreshToken, options)
        .send('User Logged-in')
})


const logoutUser = asyncHandler(async(req,res)=>{
    const {id} = req.user;

    const remove = await userService.logoutUser(id);

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .send("user logged out");
    
})
interface User{
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    bio: string
}
const updateProfile = asyncHandler(async(req,res)=>{
    const {username, firstname, lastname, bio, email} = req.body;
    const {id} = req.user;

    const updateUser = await userService.updateProfile({username, firstname, lastname, bio, email, id})

    res.status(201).send(updateUser)

})

const me = asyncHandler(async(req,res)=>{
        const userInfo = await userQuery.userAllInfo(req.user.id);
        
        if(!userInfo) throw new Error(`User not found with Id: ${req.user.id}`);

    res.status(200).json(userInfo);     
})

const deleteUser = asyncHandler(async(req, res)=>{
    const {id} = req.user;

    const deleteUser = await userService.deleteUser(id);

    if(!deleteUser) throw new Error(`error faced when deleting User, Try Again`);

    res.status(200).send(`user Deleted successfully`);
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const {refreshToken} = req.cookies;
    console.log(refreshToken)

    const token = await userService.refreshAccessToken(refreshToken);
    
    const options = {
        httpOnly: true,
        secure: true
        }

    res
    .status(200)
    .cookie("accessToken",token.accessToken, options)
    .cookie("refreshToken", token.refreshToken, options)
    .send('Access token generated successfully')
})

// Reset Password Controller

const resetPassword = asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;

    const reset = await userService.resetPassword(oldPassword, newPassword, id)

    if(!reset) throw new Error (`Error while resetting Password`);

    // create a common options as it is getting repeated
    const options = {
        httpOnly: true,
        secure: true
        }

    res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken", options)
    .send(`Password reset successfully, please login again with new password`);

})

const updateProfilePic = asyncHandler(async(req, res)=>{
    const {path, filename} = req.file;
    const {id} = req.res.locals.user;

    const uploadProfilePicS3 = await userService.uploadProfilePic(path, filename, id);

    res.status(200).send(`Profile photo uploaded successfully: ${uploadProfilePicS3}`)
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