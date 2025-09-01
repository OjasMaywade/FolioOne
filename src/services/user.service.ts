import bcrypt from "../utils/bcrypt.js";
import userQuery from "../db/queries/user.query.js";
import { generateAccessTokenAndRefreshToken } from "./auth.service.js";

const register = async(userInput)=>{
    const {email, username, password } = userInput;

    if(!(username && password && email)) throw new Error(`Required Info: email, username, password`)

    const userExist = await userQuery.findUserByEmailOrUsername(userInput.email,userInput.username);
    
    if(userExist) throw new Error(`user already exist with provided email/username`);

    const hash = await bcrypt.hashPassword(userInput.password);

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
        
        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(data, userId);

        return {accessToken, refreshToken};
}

export default {register, login}
