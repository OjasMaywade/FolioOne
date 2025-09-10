import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import userQuery from "../db/queries/user.query.js"

const generateAccessTokenAndRefreshToken = async (userData, userId)=>{
    
    let accessToken = await generateAccessToken(userData);
    let refreshToken = await generateRefreshToken(userId);

    const insertRefreshToken = await userQuery.insertRefreshToken(refreshToken, userId.id);

    if(!insertRefreshToken) throw new Error(`Error while inserting Refresh Token`)

        console.log(insertRefreshToken);

    return {accessToken, refreshToken}
}

export {generateAccessTokenAndRefreshToken}

