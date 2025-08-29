import { db } from "../index.db.js";

const userAllInfo = async (id)=>{
    try {
        return await db.selectFrom('user').select(['email','firstname','lastname','id','profilepic','username']).where('id','=', id).executeTakeFirst()
    } catch (error) {
        throw new Error(`Error while quering db: ${error.message}`)
    }
    
}

export {userAllInfo}