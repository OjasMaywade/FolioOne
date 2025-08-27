import { app } from "./app.js";
import { db } from "./db/index.db.js";
import  {sql} from "kysely";

;(async()=>{
    try {
    const dbConnectionTest = await sql`SELECT 1`.execute(db);
        console.log(`DB Connected: ${dbConnectionTest}`,dbConnectionTest);
        app.listen(process.env.PORT, ()=>{
            console.log(`Server running on PORT ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(`Error in Connecting with DB: ${error}`)
    }
})();
