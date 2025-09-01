import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import userQuery from "../db/queries/user.query.js"

const generateAccessTokenAndRefreshToken = async (userData, userId)=>{
    
    let accessToken = await generateAccessToken(userData);
    let refreshToken = await generateRefreshToken(userId);

    userQuery.insertRefreshToken(refreshToken, userId);

    return {accessToken, refreshToken}
}

export {generateAccessTokenAndRefreshToken}

