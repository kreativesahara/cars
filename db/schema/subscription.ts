import { int, varchar, decimal, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';
import { user } from './user'; // Import the user table

export const subscription = mysqlTable('subscriptions', {
    id: int('id').primaryKey().autoincrement(),
    userId: int('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    planName: varchar('plan_name', { length: 50 }).notNull(), // Basic, Pro, 
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Price in KES
    currency: varchar('currency', { length: 10 }).notNull().default('KES'),
    status: varchar('status', { length: 20 }).notNull().default('active'), // active, cancelled, expired
    startDate: timestamp('start_date').defaultNow(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});