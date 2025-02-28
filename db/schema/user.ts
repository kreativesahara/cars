import { int, varchar, datetime, mysqlTable } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    firstname: varchar('first_name', { length: 255 }),
    lastname: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    //phone_no: varchar('phone_no', { length: 255 }),
    roles: int('roles').notNull(),
    //subscription: int('subscription_type'),
    password: varchar('password', { length: 255 }),
    refreshToken: varchar('refresh_token', { length: 255 }),
    // created_at: datetime('created_at'),
    // updated_at: datetime('updated_at')
    // createdAt: timestamp('created_at').defaultNow(),
    // updatedAt: timestamp('updated_at').defaultNow().onUpdateNow()
});
