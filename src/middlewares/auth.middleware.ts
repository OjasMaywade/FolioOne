import userQuery from "../db/queries/user.query.js";
import { verifyAccessToken } from "../utils/jwt.js";

const auth = async(req,res,next)=>{
    try {
        const accessToken = req.cookies?.accessToken;

        if(!accessToken) throw new Error(`Token unavailable`)

        const verify = await verifyAccessToken(accessToken);

        if(!verify){
        throw new Error(`Invalid Access Token, Please login again or use refreshtoken to get new access token: ${Error}`)
        }

        const getUser = await userQuery.findUserById(verify.id);

        if(!getUser) throw new Error(`Use does not exist with email: ${verify.email}`)
        
            res.locals.user = getUser;
            req.user = getUser;
            next();
        
    } catch (error) {
        console.log(error)
        throw new Error(`Authentication Faied: ${error.message}`)
    }

}

export {auth}