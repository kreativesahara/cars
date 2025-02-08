import { int, text, mysqlTable, timestamp, foreignKey, varchar } from 'drizzle-orm/mysql-core';
import { product } from './product';

export const carImages = mysqlTable('car_images', {
    id: int('id').primaryKey().autoincrement(),
    car_id: int('car_id').notNull().references(() => product.id),
    image_url: varchar('image_url',{length:255}).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});


