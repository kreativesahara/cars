import { decimal, int, varchar, text, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';

export const payment = mysqlTable("payments", {
    id: int("id").primaryKey().autoincrement(),
    userId: int("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), 
    subscriptionId: int("subscription_id").references(() => subscription.id, { onDelete: "set null" }),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 }).notNull().default("KES"), 
    paymentMethod: varchar("payment_method", { length: 50 }).notNull(), // MPesa, Stripe, PayPal, etc.
    txnId: varchar("txn_id", { length: 255 }).notNull().unique(), // Unique transaction reference
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, successful, failed
    createdAt: timestamp("created_at").defaultNow().onUpdateNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const subscription = mysqlTable('subscriptions', {
    id: int('id').primaryKey().autoincrement(),
    userId: int('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    txnId: varchar("txn_id", { length: 255 }).unique(), // Unique transaction reference
    planName: varchar('plan_name', { length: 50 }).notNull(), // Basic, Pro, 
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Price in KES
    currency: varchar('currency', { length: 10 }).notNull().default('KES'),
    status: varchar('status', { length: 20 }).notNull().default('pending'), // pending,active, cancelled, expired
    startDate: timestamp('start_date').defaultNow(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

export const seller = mysqlTable('sellers', {
    Id: int('id').primaryKey().autoincrement()
        .references(() => user.id),
    userId: int('user_id').notNull(),
    username: text('username').notNull(),
    accountType: varchar('account_type', { length: 255 }),
    contact: varchar('contact', { length: 50 }),
    place: varchar('place', { length: 200 }).notNull(),
    image_url: varchar('image_url', { length: 255 }).notNull(),
    hasFinancing: varchar('has_financing', { length: 255 }),
    acceptsTradeIn: varchar('accepts_trade_in', { length: 255 }),
    created_at: timestamp('created_at').defaultNow().notNull(),

});

export const user:any = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    // subscriptionId: int('subscription_id').references(() => subscription.id, { onDelete: 'set null' }),
    firstname: varchar('first_name', { length: 255 }).notNull(),
    lastname: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    // phoneId: varchar('phone_id', { length: 20 }).notNull().unique(),
    roles: int('roles').notNull().default(0),
    password: varchar('password', { length: 255 }).notNull(),
    refreshToken: varchar('refresh_token', { length: 500 }),
    resetToken: varchar('reset_token', { length: 500 }).unique(),
    resetTokenExpiry: timestamp('reset_token_expiry'),
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at').defaultNow().onUpdateNow(), 
});


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

export const carImages = mysqlTable('car_images', {
    id: int('id').primaryKey().autoincrement(),
    car_id: int('car_id').notNull().references
    (() => product.id),
    image_url: varchar('image_url',{length:255}).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
});


