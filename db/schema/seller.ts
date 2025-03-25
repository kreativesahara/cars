import { int, text, varchar, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';
import { user } from './user';

export const seller = mysqlTable('sellers', {
    Id: int('id').primaryKey().autoincrement()
    .references(() => user.id),
    userId: int('user_id').notNull(),
    username: text('username').notNull(),
    accountType: varchar('account_type', { length: 255 }),
    contact: varchar('contact', { length: 50 }),
    place: varchar('place', { length: 200 }).notNull(),
    image_url: varchar('image_url', { length: 255 }).notNull(),
    hasFinancing: varchar('has_financing', { length: 255 }),
    acceptsTradeIn: varchar('accepts_trade_in', { length: 255 }),
    created_at: timestamp('created_at').defaultNow().notNull(),
   
});
