import bcrypt from "../utils/bcrypt.js";
import userQuery from "../db/queries/user.query.js";
import authService from "./auth.service.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";
import awsS3 from "../utils/awsS3.js";
import fs from "fs";

const register = async(userInput)=>{
    const {email, username, password } = userInput;

    if(!(username && password && email)) throw new Error(`Required Info: email, username, password`)

    const userExist = await userQuery.findUserByEmailOrUsername(email, username);
    
    if(userExist) throw new Error(`user already exist with provided email/username`);

    const hash = await bcrypt.hashPassword(password);

    const createUser = await userQuery.createUser(userInput, hash);

    if(!createUser) throw new Error('Error Occured while registering the user, Please try again');

    return createUser;
}

const login = async({email, username, password})=>{
    
    if(!((email || username) && password)){ 
    throw new Error(`Email/username and password is required`)
    };

    const getUser = await userQuery.getUserDetails(email, username);
    
        if(!getUser){
            throw new Error(`User Does not exist with Username/email: ${username} ${email}`)
        };
    
        const checkPassword = await bcrypt.comparePassword(password, getUser.password);
    
        if(!checkPassword){
            throw new Error(`Incorrect password`)
        };
    
        const data = {
            id: getUser.id,
            email: email || getUser.email,
            username: username || getUser.username
        }
    
        const userId = {
            id: getUser.id
        }
        
        const {accessToken, refreshToken} = await authService.generateAccessTokenAndRefreshToken(data, userId);

        return {accessToken, refreshToken};
}

const logoutUser = async(id)=>{
    const findById = await userQuery.findUserById(id);

    if(!findById) throw new Error(`User not available`);

    const remove = await userQuery.removeToken(id);

    if(!findById) throw new Error(`Error while logging Out`);

    return remove;
}
interface User{
    username: string,
    email: string,
    firstname: string,
    lastname: string
}

const updateProfile = async({username, firstname, lastname, email, id})=>{
    if(!(username || email || firstname || lastname)){
            throw new Error(`Info is required`);
        }
        let updates = {} as User;
        const getUser = await userQuery.findUserById(id);
    
        // const checkAndUpdateDetails = async(field, input, id, updates)=>{
            if(username){
            const check = await userQuery.findUserByEmailOrUsername(username,email)
            if(check && check.id != id) throw new Error(`Username is already in use by another user`);
            else updates.username = username;
        }

        // await checkAndUpdateDetails("username", username, id, updates)
        
        if(email){
            const check = await userQuery.findUserByEmailOrUsername(username,email)
            if(check && check.id !=id) throw new Error(`email is already in use`)
                else updates.email = email;
        }
        if(firstname) updates.firstname = firstname;
        if(lastname) updates.lastname = lastname;
        // if(bio) updates.bio = bio;
    
        const updateUser = await userQuery.updateUserInfo(updates,id);
    
        if(!updateUser) throw new Error(`Error while updating userr profile`);

        return updateUser;
}

const deleteUser = async(id)=>{
    if(!id) throw new Error('User ID not found');

    const deleteUser = await userQuery.deleteUser(id);

    if(!deleteUser) throw new Error (`Error while deleting user from DB`);

    return deleteUser
}

const refreshAccessToken = async(oRefreshToken)=>{
    const verified = await verifyRefreshToken(oRefreshToken);

    const getUser = await userQuery.findUserById(verified.id);

    // check if refreshtoken provided matches with the db refreshtoken
    
    if(!verified) throw new Error(`Refresh Token expired, please login again`);

    const data = {
            id: getUser.id,
            email: getUser.email,
            username: getUser.username
        }

        const userId = {
            id: getUser.id
        }

    return await authService.generateAccessTokenAndRefreshToken(data, userId);
}

const resetPassword = async(oldPassword, newPassword, id)=>{
    if(!id) throw new Error (`Internal Error, Authenticated User ID not returned`);

    if(!(oldPassword && newPassword)) throw new Error (`Please provide both the new and old password`);

    // remove empty space from the input and then check

    const getPassword = await userQuery.getUserPassword(id);

    if(!getPassword) throw new Error (`Can't find password for user with ID:${id}`)

    const comparePass = await bcrypt.comparePassword(oldPassword, getPassword.password);

    if(!comparePass) throw new Error(`Incorrect password, Please provide the correct password`);

    if(oldPassword == newPassword) throw new Error (`old password matches with new password`);

    const newPasswordHashed = await bcrypt.hashPassword(newPassword);

    const setPassword = await userQuery.resetPassword(newPasswordHashed, id);

    if(!setPassword) throw new Error (`Internal Error while saving the password: ${setPassword}`)
    
    return setPassword;

}

const uploadProfilePic = async (path, filename, id)=>{

    if(!(path && filename)) throw new Error (`path and filename is required, error while upload`);

    const data = fs.readFileSync(path);

    const uploadToS3 = await awsS3.uploadFile(data, filename);

    if(!uploadToS3) throw new Error (`Error in Uplaoding :${uploadToS3}`)
    
    const url = await userQuery.getProfilePicUrl(id);

    if(url.image_key){
        const deleteObjectS3 = await awsS3.deleteFile(url.image_key);

        if(!deleteObjectS3) throw new Error(`Issue while deleting old image from S3: ${deleteObjectS3}`);
        console.log(deleteObjectS3)
        console.log(`Image deleted: ${deleteObjectS3}`);
    }
    //const deleteObjectS3 = await awsS3.deleteFile(key);

    const deleteFile = fs.unlink(path, (err)=>{
        if(err) throw new Error(`Error while deleting file from Server : ${err.message}`);
        console.log(`${path} was deleted`);
    });

    console.log(uploadToS3)

    // const getUrl = await awsS3.getObjectUrl(filename);
    // console.log(`url: ${getUrl}`)
    const profilePicUrl = process.env.URL + filename; 
    const addUrlToDb = await userQuery.setUserProfilePic(profilePicUrl, id, filename)

    if(!addUrlToDb) throw new Error (`Error while adding url to db`);

    return addUrlToDb;
}

export default 
{
    register, 
    login, 
    logoutUser, 
    updateProfile, 
    deleteUser, 
    refreshAccessToken,
    resetPassword,
    uploadProfilePic
}
