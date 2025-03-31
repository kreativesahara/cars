import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    schema: "./db/schema.ts",   // Adjust the path to your schema file as needed
    out: "./db/migrations",     // Directory for generated migrations
    dialect: "mysql",           // Use the mysql2 driver for MySQL
    dbCredentials: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD || "", // Ensure password is not undefined
        database: process.env.DB_NAME,
        port: 3306,
        queueLimit: 0 || null,
        ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false, // Use SSL if specified
        waitForConnections: true,
        connectionLimit: 10,


    },
});



