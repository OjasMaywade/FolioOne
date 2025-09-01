import bcrypt from "../utils/bcrypt.js";
import userQuery from "../db/queries/user.query.js";
import { generateAccessTokenAndRefreshToken } from "./auth.service.js";

const register = async(userInput)=>{
    const userExist = await userQuery.findUserByEmailOrUsername(userInput.email,userInput.username);
    
    if(userExist) throw new Error(`user already exist with provided email/username`);

    const hash = await bcrypt.hashPassword(userInput.password);

    const createUser = await userQuery.createUser(userInput, hash);

    console.log(createUser)
    const userCreated = await userQuery.findUserById(createUser.insertId);

    console.log(userCreated)
    if(!userCreated) throw new Error('Error Occured while registering the user, Please try again');

    return userCreated;
}

export default {register}
