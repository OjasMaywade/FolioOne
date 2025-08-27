import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const generateAccessToken = async (data)=>{
    try {
        return await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY} as SignOptions)
    } catch (error) {
        throw new Error(`Error while generating Acess Token: ${error}`)
    }
}

const generateRefreshToken = async (data)=>{    
    try {
        return await jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY} as SignOptions)
    } catch (error) {
        throw new Error(`Error while generating Acess Token: ${error}`)
    }
}

const  verifyAccessToken = async (token)=>{
    try {
        return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload
    } catch (error) {
        throw new Error(`Error while verifing access token: ${error}`)
    }
}

const verifyRefreshToken = async (token)=>{
    try {
        return await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        throw new Error(`Error while verifing refresh token: ${error}`)
    }
}   

export  {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}