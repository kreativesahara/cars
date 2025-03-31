CREATE TABLE `car_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`car_id` int NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `car_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`subscription_id` int,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'KES',
	`payment_method` varchar(50) NOT NULL,
	`txn_id` varchar(255) NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`created_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updated_at` timestamp DEFAULT (now()),
	CONSTRAINT `payments_id` PRIMARY KEY(`id`),
	CONSTRAINT `payments_txn_id_unique` UNIQUE(`txn_id`)
);
--> statement-breakpoint
CREATE TABLE `cars` (
	`id` int AUTO_INCREMENT NOT NULL,
	`seller_id` int NOT NULL,
	`make` varchar(255) NOT NULL,
	`model` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`yom` int NOT NULL,
	`engine_capacity` varchar(20) NOT NULL,
	`fuel_type` varchar(50) NOT NULL,
	`transmission` varchar(50) NOT NULL,
	`drive_system` varchar(50) NOT NULL,
	`mileage` text NOT NULL,
	`features` text NOT NULL,
	`car_condition` varchar(50) NOT NULL,
	`view_location` varchar(255) NOT NULL,
	`price` text NOT NULL,
	CONSTRAINT `cars_id` PRIMARY KEY(`id`),
	CONSTRAINT `cars_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `sellers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`username` text NOT NULL,
	`account_type` varchar(255),
	`contact` varchar(50),
	`place` varchar(200) NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`has_financing` varchar(255),
	`accepts_trade_in` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sellers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`txn_id` varchar(255),
	`plan_name` varchar(50) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'KES',
	`status` varchar(20) NOT NULL DEFAULT 'pending',
	`start_date` timestamp DEFAULT (now()),
	`end_date` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `subscriptions_txn_id_unique` UNIQUE(`txn_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`roles` int NOT NULL DEFAULT 0,
	`password` varchar(255) NOT NULL,
	`refresh_token` varchar(500),
	`reset_token` varchar(500),
	`reset_token_expiry` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`expires_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`),
	CONSTRAINT `users_reset_token_unique` UNIQUE(`reset_token`)
);
--> statement-breakpoint
ALTER TABLE `car_images` ADD CONSTRAINT `car_images_car_id_cars_id_fk` FOREIGN KEY (`car_id`) REFERENCES `cars`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_subscription_id_subscriptions_id_fk` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cars` ADD CONSTRAINT `cars_seller_id_sellers_user_id_fk` FOREIGN KEY (`seller_id`) REFERENCES `sellers`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sellers` ADD CONSTRAINT `sellers_id_users_id_fk` FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;