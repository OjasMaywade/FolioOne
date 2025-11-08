import { createPool } from "mysql2";
import { DB } from "./schema.db.js";
import { Kysely, MysqlDialect } from "kysely";

const dialect = new MysqlDialect({
    pool: createPool({
        database: process.env.DATABASE,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: 3306  
    })
})

export const db = new Kysely<DB>({
    dialect
})