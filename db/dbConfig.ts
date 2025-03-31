import { Pool } from "pg";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();
//++++++++++++++++++++++++++++++++++++++++++
// DB Connection
//++++++++++++++++++++++++++++++++++++++++++
const connection = new Pool({
    connectionString: process.env.DATABASE_URL, // Use the PostgreSQL connection string from Supabase
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Use SSL if needed
});
//++++++++++++++++++++++++++++++++++++++++++
// DB Connection Test
//++++++++++++++++++++++++++++++++++++++++++
connection.connect((err: any) => {
    if (err) {
        console.log('There Is Error In DB Connection:' + err);
    }
    else {
        console.log('DB Connected Successfully')
    }
})

const db = drizzle(connection)
///export default connection;
export default db;
