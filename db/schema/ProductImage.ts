import { int, text, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { product } from './product';

export const productImage = mysqlTable('car_images', {
    id: int('id').primaryKey().autoincrement(),
    car_id: int('car_id').notNull().references(() => product.id),
    image_url: text('image_url').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});
