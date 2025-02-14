import { int, text, varchar, datetime, mysqlTable } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const seller = mysqlTable('sellers', {
    Id: int('id').primaryKey().autoincrement()
    .references(() => user.id),
    userId: int('user_id').notNull(),
    username: text('username').notNull(),
    accountType: varchar('account_type', { length: 255 }),
    contact: varchar('contact', { length: 50 }),
    //phone_no: varchar('phone_no', { length: 255 }),
    place: varchar('place', { length: 200 }).notNull(),
    // subscription: int('subscription_type'),
    hasFinancing: varchar('has_financing', { length: 255 }),
    acceptsTradeIn: varchar('accepts_trade_in', { length: 255 }),
    //created_at: datetime('created_at'),
});
