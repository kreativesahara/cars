import { int, varchar, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';
import { subscription } from './subscription';

export const user:any = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    // subscriptionId: int('subscription_id').references(() => subscription.id, { onDelete: 'set null' }),
    firstname: varchar('first_name', { length: 255 }).notNull(),
    lastname: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    // phoneId: varchar('phone_id', { length: 20 }).notNull().unique(),
    roles: int('roles').notNull().default(0),
    password: varchar('password', { length: 255 }).notNull(),
    refreshToken: varchar('refresh_token', { length: 500 }),
    resetToken: varchar('reset_token', { length: 500 }).unique(),
    resetTokenExpiry: timestamp('reset_token_expiry'),
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at').defaultNow().onUpdateNow(), 

});
