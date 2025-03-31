import { pgTable, serial, integer, varchar, text } from "drizzle-orm/pg-core";
import { seller } from "./seller"; // Assuming seller model exists

export const product = pgTable("cars", {
    id: serial("id").primaryKey(),
    sellerId: integer("seller_id").notNull().references(() => seller.userId, { onDelete: "cascade" }),
    make: varchar("make", { length: 255 }).notNull(),
    model: varchar("model", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    year: integer("yom").notNull(),
    engineCapacity: varchar("engine_capacity", { length: 20 }).notNull(),
    fuelType: varchar("fuel_type", { length: 50 }).notNull(),
    transmission: varchar("transmission", { length: 50 }).notNull(),
    driveSystem: varchar("drive_system", { length: 50 }).notNull(),
    mileage: text("mileage").notNull(),
    features: text("features").notNull(),
    condition: varchar("car_condition", { length: 50 }).notNull(),
    location: varchar("view_location", { length: 255 }).notNull(),
    price: text("price").notNull(),
});
