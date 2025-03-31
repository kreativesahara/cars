import { relations } from "drizzle-orm/relations";
import { cars, carImages, subscriptions, payments, users } from "./schema";

export const carImagesRelations = relations(carImages, ({one}) => ({
	car: one(cars, {
		fields: [carImages.carId],
		references: [cars.id]
	}),
}));

export const carsRelations = relations(cars, ({many}) => ({
	carImages: many(carImages),
}));

export const paymentsRelations = relations(payments, ({one}) => ({
	subscription: one(subscriptions, {
		fields: [payments.subscriptionId],
		references: [subscriptions.id]
	}),
	user: one(users, {
		fields: [payments.userId],
		references: [users.id]
	}),
}));

export const subscriptionsRelations = relations(subscriptions, ({one, many}) => ({
	payments: many(payments),
	user: one(users, {
		fields: [subscriptions.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	payments: many(payments),
	subscriptions: many(subscriptions),
}));