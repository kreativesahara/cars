import { int, text, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';

export const productImages = mysqlTable('car_images', {
    id: int('id').primaryKey().autoincrement(),
    car_id: int('car_id').notNull(),
    image_url: text('image_url').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});
