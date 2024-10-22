//++++++++++++++++++++++++++++++++++++++++++
// Import
//++++++++++++++++++++++++++++++++++++++++++
import { int, varchar, datetime, mysqlTable } from 'drizzle-orm/mysql-core';
const ROLES_LIST = {
    visitor: 0,
    Member: 1,
    Seller: 2,
    Editor: 3,
    Admin: 4
}
//++++++++++++++++++++++++++++++++++++++++++
// User Schema
//++++++++++++++++++++++++++++++++++++++++++
export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    firstname: varchar('first_name', { length: 255 }),
    lastname: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    //phone_no: varchar('phone_no', { length: 255 }),
    role: int('role').default(ROLES_LIST.Member).notNull(),
    //subscription: int('subscription_type'),
    password: varchar('password', { length: 255 }),
    //created_at: datetime('created_at'),
    //updated_at: datetime('updated_at')
});
