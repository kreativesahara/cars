import { int, varchar, decimal, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { user } from "./user"; // Assuming user model exists
import { subscription } from "./subscription"; // Assuming subscription model exists

export const payment = mysqlTable("payments", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), 
    subscriptionId: int("subscription_id").references(() => subscription.id, { onDelete: "set null" }),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).notNull().default("KES"), 
    paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // MPesa, Stripe, PayPal, etc.
    txnId: varchar("txn_id", { length: 255 }).notNull().unique(), // Unique transaction reference
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, successful, failed
    createdAt: timestamp("created_at").defaultNow().onUpdateNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
