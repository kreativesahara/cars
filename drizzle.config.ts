import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
    schema: "./db/schema/*",
    out: "./db/migrations",
    dialect: "postgresql", 
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
