import { int, varchar, decimal, json, mysqlTable } from 'drizzle-orm/mysql-core';

export const cars = mysqlTable('cars', {
    id: int('id').primaryKey().autoincrement(),
    make: varchar('make', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    year: int('yom').notNull(),
    engine_capacity: varchar('engine_capacity', { length: 20 }).notNull(),
    fuel_type: varchar('fuel_type', { length: 50 }).notNull(),
    transmission: varchar('transmission', { length: 50 }).notNull(),
    driveSystem: varchar('drive_system', { length: 50 }).notNull(),
    mileage: int('mileage'),
    features: json('features').default(null),
    condition: varchar('car_condition', { length: 50 }).notNull(),
    location: varchar('view_location', { length: 255 }).notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    seller_id: int('seller_id').notNull(),
});
