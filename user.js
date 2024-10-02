//++++++++++++++++++++++++++++++++++++++++++
//Inport
//++++++++++++++++++++++++++++++++++++++++++
const { int, varchar, text, datetime, decimal, mysqlTable, mysqlSchema } = require('drizzle-orm/mysql-core');
//++++++++++++++++++++++++++++++++++++++++++
// Blog Schema
//++++++++++++++++++++++++++++++++++++++++++
module.exports.users = mysqlTable('users', {
    id: int("id").primaryKey().autoincrement(),
    first_name: varchar('first_name', { length: 255 }),
    last_name: varchar('last_name', { length: 255 }),
    phone_no: varchar('phone_no', { length: 255 }),
    email: varchar('email', { length: 255 }),
    password: varchar('password', { length: 255 }),
    status: int('status'),
    created_at: datetime('created_at'),
    updated_at: datetime('updated_at'),
});