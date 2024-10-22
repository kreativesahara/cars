import { int, varchar, decimal, json, mysqlTable, text } from 'drizzle-orm/mysql-core';

export const testImage = mysqlTable('testimage', {
    id: int('id').primaryKey().autoincrement(),
    make: varchar('make', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    image_url: text('image_url').notNull(),
});
