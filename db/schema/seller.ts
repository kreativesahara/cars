import { int, varchar, datetime, mysqlTable } from 'drizzle-orm/mysql-core';

export const seller = mysqlTable('sellers', {
    userId: int('user_id').primaryKey().autoincrement(),
    username: varchar('username', { length: 255 }),
    accountType: varchar('account_type', { length: 255 }),
    contact: varchar('contact', { length: 50 }),
    //phone_no: varchar('phone_no', { length: 255 }),
    place: int('place').notNull(),
    // subscription: int('subscription_type'),
    hasFinancing: varchar('has_financing', { length: 255 }),
    acceptsTradeIn: varchar('accepts_trade_in', { length: 255 }),
    //created_at: datetime('created_at'),
});
