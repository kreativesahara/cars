import { integer, serial, pgTable, timestamp, foreignKey, varchar } from 'drizzle-orm/pg-core';
import { product } from './product';


export const carImages = pgTable("car_images", {
    id: serial("id").primaryKey(),// PostgreSQL uses default instead of autoincrement
    carId: integer("car_id")
        .notNull()
        .references(() => product.id, { onDelete: "cascade" }), // PostgreSQL supports cascade
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
