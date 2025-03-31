import { pgTable, serial, integer, varchar, decimal, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user"; // Assuming user model exists
import { subscription } from "./subscription"; // Assuming subscription model exists

export const payment = pgTable("payments", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    subscriptionId: integer("subscription_id").references(() => subscription.id, { onDelete: "set null" }),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).notNull().default("KES"),
    paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // MPesa, Stripe, PayPal, etc.
    txnId: varchar("txn_id", { length: 255 }).notNull().unique(), // Unique transaction reference
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, successful, failed
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(), // Automatically set to current timestamp on update
});
