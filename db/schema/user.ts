//++++++++++++++++++++++++++++++++++++++++++
// Import
//++++++++++++++++++++++++++++++++++++++++++
import { int, varchar, datetime, mysqlTable } from 'drizzle-orm/mysql-core';

//++++++++++++++++++++++++++++++++++++++++++
// User Schema
//++++++++++++++++++++++++++++++++++++++++++
export const users = mysqlTable('users', {
    user_id: int('id').primaryKey().autoincrement(),
    firstname: varchar('first_name', { length: 255 }),
    lastname: varchar('last_name', { length: 255 }),
    // phone_no: varchar('phone_no', { length: 255 }),
    email: varchar('email', { length: 255 }),
    password: varchar('password', { length: 255 }),
    // status: int('status'),
    // created_at: datetime('created_at'),
    // updated_at: datetime('updated_at'),
});
