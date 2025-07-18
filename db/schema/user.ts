import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { subscription } from "./subscription";

export const user = pgTable("users", {
    id: serial("id").primaryKey(),
    firstname: varchar("first_name", { length: 255 }).notNull(),
    lastname: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    roles: integer("roles").notNull().default(0),
    password: varchar("password", { length: 255 }).notNull(),
    refreshToken: varchar("refresh_token", { length: 500 }),
    resetToken: varchar("reset_token", { length: 500 }).unique(),
    resetTokenExpiry: timestamp("reset_token_expiry"),
    createdAt: timestamp("created_at").defaultNow(),
    expiresAt: timestamp("expires_at").defaultNow(),
});