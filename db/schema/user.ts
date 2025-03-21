import { int, varchar, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    firstname: varchar('first_name', { length: 255 }).notNull(),
    lastname: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(), // Ensures unique emails
    // phone_no: varchar('phone_no', { length: 20 }).unique(), // Optional but useful
    roles: int('roles').notNull().default(0), // 0: Visitor, 1: Member, 2: Seller, etc.
    password: varchar('password', { length: 255 }).notNull(), // Stores hashed passwords
    refreshToken: varchar('refresh_token', { length: 500 }),
    resetToken: varchar('reset_token', { length: 500 }).unique(),
    resetTokenExpiry: timestamp('reset_token_expiry'),
    //subscription: int('subscription_type').default(0), // 0: Free, 1: Basic, 2: Premium
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at').defaultNow().onUpdateNow(), // Track last updates
});
