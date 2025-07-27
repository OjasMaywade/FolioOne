import { createPool } from "mysql2";
import { DB } from "../types/db.type.js";
import { Kysely, MysqlDialect } from "kysely";

const dialect = new MysqlDialect({
    pool: createPool({
        database: 'portfolio',
        host: 'localhost',
        user: 'root',
        password: '1912thusDec',
        port: 3306   
    })
})

export const db = new Kysely<DB>({
    dialect
})