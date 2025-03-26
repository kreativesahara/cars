import { int, varchar, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    firstname: varchar('first_name', { length: 255 }).notNull(),
    lastname: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(), // Ensures unique emails
    roles: int('roles').notNull().default(0), // 0: Visitor, 1: Member, 2: Seller, etc.
    password: varchar('password', { length: 255 }).notNull(), // Stores hashed passwords
    refreshToken: varchar('refresh_token', { length: 500 }),
    resetToken: varchar('reset_token', { length: 500 }).unique(),
    resetTokenExpiry: timestamp('reset_token_expiry'),
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at').defaultNow().onUpdateNow(), // Track last updates
    // paymentMethod: varchar('payment_method', { length: 50 }),    // E.g., 'MPesa', 'Stripe', 'PayPal'
    // subscriptionStatus: varchar('subscription_status', { length: 50 }).notNull().default('inactive'),// Values: 'inactive', 'active', 'canceled', 'expired'
    // subscriptionExpiresAt: timestamp('subscription_expires_at')
    // phone_no: varchar('phone_no', { length: 20 }).notNull().unique(), // Required for MPesa
    // subscriptionPlan: int('subscription_plan').notNull().default(0),// 0: Free, 1: Basic, 2: Pro, 3: Growth, 4: Enterprise

});
