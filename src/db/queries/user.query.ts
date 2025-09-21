import { id } from "zod/v4/locales";
import { db } from "../index.db.js";

const userAllInfo = async (id: number)=>{
    try {
        return await db.selectFrom('user').select(['email','firstname','lastname','id','profilepic','username']).where('id','=', id).executeTakeFirst()
    } catch (error) {
        throw new Error(`Error while quering db: ${error.message}`)
    }
}

const insertRefreshToken = async(refreshToken, userId)=>{
    return await db
    .updateTable('user')
    .set({
        refreshtoken: refreshToken
    })
    .where('id','=',userId)
    .executeTakeFirst();
}

const findUserById = async(id)=>{
    return await db
    .selectFrom('user')
    .select(['username','email','firstname','lastname','id'])
    .where('id','=',id)
    .executeTakeFirst()
}

const createUser = async(userInput, hash)=>{
    return await db
    .insertInto('user')
    .values({
        firstname: userInput.firstname,
        lastname: userInput.lastname,
        username: userInput.username,
        email: userInput.email,
        password: hash
    })
    .returning(['id'])
    .executeTakeFirst();
}

const findUserByEmailOrUsername = async(email: string,username: string)=>{
   return await db
    .selectFrom('user')
    .select('id')
    .where((eb)=>
        eb('email', '=',email).or('username','=',username)
)
    .executeTakeFirst(); 
}

 const getUserDetails = async(email,username)=>{
    return await db
        .selectFrom('user')
        .select(['id','password','username','email'])
        .where((eb)=> 
                eb('email','=',`${email}`).or('username','=',`${username}`))
        .executeTakeFirst();
}

const getUserPassword = async(id)=>{
    return await db
        .selectFrom('user')
        .select('password')
        .where("id","=", id)
        .executeTakeFirst();
}

const removeToken = async(id:number)=>{
return await db
    .updateTable('user')
    .set({
        refreshtoken: ''
    })
    .where('id','=', id)
    .executeTakeFirst();
}

const updateUserInfo = async(updates, id)=>{
return await db
    .updateTable('user')    
    .set(updates)
    .where('id','=',id)
    .executeTakeFirst();
}

const deleteUser = async(id)=>{
    return await db
    .deleteFrom('user')
    .where('id','=',id)
    .executeTakeFirst()
}

const resetPassword = async(newPasswordHashed,id)=>{
    return await db
    .updateTable('user')
    .set({
        password: newPasswordHashed,
        refreshtoken: ''
    })
    .where("id","=",id)
    .executeTakeFirst();
}

const setUserProfilePic = async(profilePicUrl, id)=>{
    return await db
    .updateTable('user')
    .set({
        profilepic: profilePicUrl
    })
    .where("id","=",id)
    .executeTakeFirst();
}

const getProfilePicUrl = async(id)=>{
    return await db
    .selectFrom('user')
    .select('profilepic')
    .where("id","=",id)
    .executeTakeFirst();
}

export default 
{   userAllInfo, 
    insertRefreshToken,
    createUser, 
    findUserByEmailOrUsername, 
    removeToken, 
    updateUserInfo,
    findUserById,
    getUserDetails,
    deleteUser,
    getUserPassword,
    resetPassword,
    setUserProfilePic,
    getProfilePicUrl
}