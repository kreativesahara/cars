import { int, varchar, mysqlTable, text, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { seller } from './seller';

export const product = mysqlTable('cars', {
    id: int('id').primaryKey().autoincrement(),
    seller_id: int('seller_id').notNull().references
        (() => seller.userId),
    make: varchar('make', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    year: int('yom').notNull(),

    engine_capacity: varchar('engine_capacity', { length: 20 }).notNull(),
    fuel_type: varchar('fuel_type', { length: 50 }).notNull(),
    transmission: varchar('transmission', { length: 50 }).notNull(),
    driveSystem: varchar('drive_system', { length: 50 }).notNull(),
    mileage: text('mileage').notNull(),
    // color: varchar('color', { length: 50 }).notNull(),
    features: text('features').notNull(),
    condition: varchar('car_condition', { length: 50 }).notNull(),
    location: varchar('view_location', { length: 255 }).notNull(),
    price: text('price').notNull(),

    // createdAt: timestamp('created_at').defaultNow().notNull(),
    // expiresAt: timestamp('expires_at').notNull(),

    // isActive: boolean('is_active').default(true).notNull(),
    // isSold: boolean('is_sold').default(false).notNull(),
    
});
