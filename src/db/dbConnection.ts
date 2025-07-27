import mongoose from "mongoose";
import dbName from "../constant.js";

const dbConnection = async()=>{
    try {
        const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}/${dbName}`)
        console.log(`DB Connected at port: ${connect}`)
    } catch (error) {
        console.log(`err:${error}`)
        throw error
    }
}

export {dbConnection};