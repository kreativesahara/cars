import { int, text, mysqlTable } from 'drizzle-orm/mysql-core';

export const car_images = mysqlTable('car_images', {
    id: int('id').primaryKey().autoincrement(),
    car_id: int('car_id').notNull(),
    image_url: text('image_url').notNull(),
});
