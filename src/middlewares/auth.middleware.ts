import userQuery from "../db/queries/user.query.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const auth = asyncHandler(async(req,res,next)=>{
        const accessToken = req.cookies?.accessToken; // this was throwing error in before try and catch and was not handled
        console.log(accessToken)
        if(!accessToken) throw new Error(`Token unavailable`)

        const verify = await verifyAccessToken(accessToken);

        if(!verify){
        throw new Error(`Invalid Access Token, Please login again or use refreshtoken to get new access token: ${Error}`)
        }

        const getUser = await userQuery.findUserById(verify.id);

        if(!getUser) throw new Error(`Use does not exist with id: ${verify.id}`);
        
            res.locals.user = getUser;
            req.user = getUser;
            next();
        
    } 
    /*catch (error) {
        console.log(error)
        throw new Error(`Authentication Faied: ${error.message}`)
    }*/
)

export {auth}