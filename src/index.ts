import {app} from "./app.js";
import {dbConnection} from "./db/dbConnection.js";
import { db } from "./db/db.js";
import  {sql} from "kysely";

// (async ()=>{
//     try {
//         await dbConnection();
//         app.listen(process.env.PORT, ()=>{
//         console.log(`Server running on Port ${process.env.PORT}`)
// })
//     } catch (error) {
//         console.log(`connectionError:${error}`)
//         throw error
//     }
// })();

;(async()=>{
    try {
    const dbConnectionTest = await sql`SELECT 1`.execute(db)
        console.log(`DB Connected: ${dbConnectionTest}`,dbConnectionTest)
    } catch (error) {
        console.log(`Error in Connecting with DB: ${error}`)
    }
})()
