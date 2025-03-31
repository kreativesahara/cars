import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const seller = pgTable("sellers", {
    id: serial("id").primaryKey(), 
    userId: integer("user_id").notNull().unique().references(() => user.id),
    username: text("username").notNull(),
    accountType: varchar("account_type", { length: 255 }),
    contact: varchar("contact", { length: 50 }),
    place: varchar("place", { length: 200 }).notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    hasFinancing: varchar("has_financing", { length: 255 }),
    acceptsTradeIn: varchar("accepts_trade_in", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
