import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema.ts", // Adjust path based on your project structure
    out: "./drizzle",  // Directory for migrations
    driver: "mysql2",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL, // Your MySQL connection URL
    },
});
