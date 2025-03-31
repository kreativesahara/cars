import { pgTable, unique, serial, integer, varchar, text, foreignKey, timestamp, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const cars = pgTable("cars", {
	id: serial().primaryKey().notNull(),
	sellerId: integer("seller_id").notNull(),
	make: varchar({ length: 255 }).notNull(),
	model: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	yom: integer().notNull(),
	engineCapacity: varchar("engine_capacity", { length: 20 }).notNull(),
	fuelType: varchar("fuel_type", { length: 50 }).notNull(),
	transmission: varchar({ length: 50 }).notNull(),
	driveSystem: varchar("drive_system", { length: 50 }).notNull(),
	mileage: text().notNull(),
	features: text().notNull(),
	carCondition: varchar("car_condition", { length: 50 }).notNull(),
	viewLocation: varchar("view_location", { length: 255 }).notNull(),
	price: text().notNull(),
}, (table) => [
	unique("cars_slug_unique").on(table.slug),
]);

export const carImages = pgTable("car_images", {
	id: serial().primaryKey().notNull(),
	carId: integer("car_id").notNull(),
	imageUrl: varchar("image_url", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.carId],
			foreignColumns: [cars.id],
			name: "car_images_car_id_cars_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	roles: integer().default(0).notNull(),
	password: varchar({ length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 500 }),
	resetToken: varchar("reset_token", { length: 500 }),
	resetTokenExpiry: timestamp("reset_token_expiry", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
	unique("users_reset_token_unique").on(table.resetToken),
]);

export const payments = pgTable("payments", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	subscriptionId: integer("subscription_id"),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).default('KES').notNull(),
	paymentMethod: varchar("payment_method", { length: 50 }).notNull(),
	txnId: varchar("txn_id", { length: 255 }).notNull(),
	status: varchar({ length: 20 }).default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.subscriptionId],
			foreignColumns: [subscriptions.id],
			name: "payments_subscription_id_subscriptions_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "payments_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("payments_txn_id_unique").on(table.txnId),
]);

export const subscriptions = pgTable("subscriptions", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	txnId: varchar("txn_id", { length: 255 }),
	planName: varchar("plan_name", { length: 50 }).notNull(),
	amount: numeric({ precision: 10, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).default('KES').notNull(),
	status: varchar({ length: 20 }).default('pending').notNull(),
	startDate: timestamp("start_date", { mode: 'string' }).defaultNow(),
	endDate: timestamp("end_date", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "subscriptions_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("subscriptions_txn_id_unique").on(table.txnId),
]);

export const sellers = pgTable("sellers", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	username: text().notNull(),
	accountType: varchar("account_type", { length: 255 }),
	contact: varchar({ length: 50 }),
	place: varchar({ length: 200 }).notNull(),
	imageUrl: varchar("image_url", { length: 255 }).notNull(),
	hasFinancing: varchar("has_financing", { length: 255 }),
	acceptsTradeIn: varchar("accepts_trade_in", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
