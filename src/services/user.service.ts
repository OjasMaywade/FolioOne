import bcrypt from "../utils/bcrypt.js";
import userQuery from "../db/queries/user.query.js";
import authService from "./auth.service.js";
import { generateAccessToken, verifyRefreshToken } from "../utils/jwt.js";

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
    lastname: string,
    bio: string
}

const updateProfile = async({username, firstname, lastname, bio, email, id})=>{
    if(!(username || email || firstname || lastname || bio)){
            throw new Error(`Info is required`);
        }
        let updates = {} as User;
        const getUser = await userQuery.findUserById(id);
        // await db
        // .selectFrom('user')
        // .select(['email','firstname','lastname','username'])
        // .where('id','=',id)
        // .executeTakeFirst();
    
        // const checkAndUpdateDetails = async(field, input, id, updates)=>{
            if(username){
            const check = await userQuery.findUserByEmailOrUsername(username,email)
            // await db
            // .selectFrom('user')
            // .select('id')
            // .where('username','=',username)
            // .executeTakeFirst();
            if(check && check.id != id) throw new Error(`Username is already in use by another user`);
            else updates.username = username;
        }

        // await checkAndUpdateDetails("username", username, id, updates)
        
        if(email){
            const check = await userQuery.findUserByEmailOrUsername(username,email)
            // db
            // .selectFrom('user')
            // .select(['email','id'])
            // .where('email','=',email)
            // .executeTakeFirst();
            if(check && check.id !=id) throw new Error(`email is already in use`)
                else updates.email = email;
        }
        if(firstname) updates.firstname = firstname;
        if(lastname) updates.lastname = lastname;
        if(bio) updates.bio = bio;
    
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

export default {register, login, logoutUser, updateProfile, deleteUser, refreshAccessToken}
