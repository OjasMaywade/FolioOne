import { db } from "../db/index.db.js";
import bcrypt from '../utils/bcrypt.js'
import userQuery from "../db/queries/user.query.js"
import { generateAccessTokenAndRefreshToken } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import userService from "../services/user.service.js"

const register2 = async (req, res)=>{
    try {
        let userInput = req.body;
    let {username, email, password} = req.body;

    if(!email && !username && !password){
        throw new Error(`Required Info: email, username or password`)
        // console.log(`Required Info: email, username or password`)
    }
// Add username check to
    const userExists = await userQuery.findUserByEmailOrUsername(email, username);

    if(userExists){
        console.log(userExists)
        throw new Error(`User already exist with email: ${email}`)
    }

    const hash = await bcrypt.hashPassword(req.body.password);

    const created =  await userQuery.createUser(req, hash)

    if(created){
        console.log(`User Created: ${created}`)
        res.status(200).send(`user created`)
    }
    } catch (error) {
        console.log(`error: ${error}`)
        res.status(500).send(`Error: ${error.message}`)
    }
}

const register = asyncHandler(async(req,res)=>{
    const userInfo = req.body;
    
    const registerUser = await userService.register(userInfo);

    console.log(registerUser)
    if(!registerUser) throw new Error (`Error While registering User`)

        res.status(201).send('User Registered Successfully')
})

const login = async (req, res)=>{
    try {
    const {email, username, password} = req.body;
        
    if(!((email || username) && password)){
    throw new Error(`Email/username and password is required`)
    };

    const getUser = await db
    .selectFrom('user')
    .select(['id','password', 'username','email'])
    .where((eb)=> 
            eb('email','=',`${email}`).or('username','=',`${username}`))
    .executeTakeFirst();
    console.log(`getuser: ${getUser}`);

    if(!getUser){
        throw new Error(`User Does not exist with Username/email: ${username} ${email}`)
    };

    const checkPassword = await bcrypt.comparePassword(password, getUser.password);

    console.log(checkPassword)
    if(!checkPassword){
        throw new Error(`Incorrect password`)
    };

    const data = {
        id: getUser.id,
        email: getUser.email,
        username: getUser.username
    }

    const userId = {
        id: getUser.id
    }
    const options = {
    httpOnly: true,
    secure: true
    }

    if(checkPassword){
        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(data, userId)
        console.log(accessToken)
        res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .send('User Logged-in')
    }
    } catch (error) {
        console.log(error)        
        res.status(500).send(error.message)
    }
}


const logoutUser = async(req,res)=>{
    // Remove the session info from the db and cookies 
    try {
        const {id} = req.user;
    console.log(req.user, req.body)

    const remove = await userQuery.removeToken(id);

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .send("user logged out");

    } catch (error) {
        res.status(404).send(`Error while loggingout: ${error}`)
    }
    
}
interface User{
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    bio: string
}
const updateProfile = async(req,res)=>{
    const {username, firstname, lastname, bio, email} = req.body;
    const {id} = req.user;
    try {
        if(!(username || email || firstname || lastname || bio)){
        throw new Error(`Info is required`);
    }
    let updates = {} as User;
    const getUser = await db
    .selectFrom('user')
    .select(['email','firstname','lastname','username'])
    .where('id','=',id)
    .executeTakeFirst();

    if(username){
        const check = await db
        .selectFrom('user')
        .select(['username','id'])
        .where('username','=',username)
        .executeTakeFirst();
        if(check && check.id != id) throw new Error(`Username is already in use by another user`);
        else updates.username = username;
    }
    if(email){
        const check = await db
        .selectFrom('user')
        .select(['email','id'])
        .where('email','=',email)
        .executeTakeFirst();
        if(check && check.id !=id) throw new Error(`email is already in use`)
            else updates.email = email;
    }
    if(firstname) updates.firstname = firstname;
    if(lastname) updates.lastname = lastname;
    if(bio) updates.bio = bio;

    const updateUser = await userQuery.updateUserInfo(updates,id);

    if(!updateUser) throw new Error(`Error while updating userr profile`);

    res.status(201).send(updateUser)

    } catch (error) {
        res.status(400).send(error.message)    
    } 
}

const me = async(req,res)=>{
    try {
        const userInfo = await userQuery.userAllInfo(req.user.id);
        console.log(userInfo)
        if(!userInfo) throw new Error(`User not found with Id: ${req.user.id}`);

    res.status(200).json(userInfo);
    } catch (error) {
        res.status(404).send(`user not found: ${error.message}`)
    }
    
}



export {register, login, logoutUser, updateProfile, me}

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