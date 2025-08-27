import { db } from "../db/index.db.js";
import { verifyAccessToken } from "../utils/jwt.js";

const auth = async(req,_,next)=>{
    try {
        // console.log(req.cookies)
        const {accessToken} = req.cookies;

        const verify = await verifyAccessToken(accessToken);

        // console.log(verify, accessToken)
        if(!verify){
        throw new Error(`Invalid Access Token, Please login again or use refreshtoken to get new access token: ${Error}`)
        }

        const getUser = await db
        .selectFrom('user')
        .select(['id','username','email'])
        .where('email', '=', verify.email)
        .executeTakeFirst();

        if(!getUser) throw new Error(`Use does not exist with email: ${verify.email}`)
        if(getUser){
            req.user = getUser
            next();
        }
    } catch (error) {
        console.log(error)
        throw new Error(`Authentication Faied: ${error.message}`)
    }

}

export {auth}