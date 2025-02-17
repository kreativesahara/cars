import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { and, like, eq, gte, lte } from 'drizzle-orm/expressions';
import { product } from '../db/schema/product';

export const filterCarProducts = async (req: Request, res: Response) => {
    try {
        const {
            make, model,location,yearFrom,yearTo,priceMin,priceMax,fuel_type,
            transmission,mileageRange,condition,driveSystem,engine_capacity,
            features,
        } = req.query;

        const filters = [];

        if (make) filters.push(like(product.make, `%${make}%`));
        if (model) filters.push(like(product.model, `%${model}%`));
        if (location) filters.push(like(product.location, `%${location}%`));
        if (fuel_type) filters.push(eq(product.fuel_type, fuel_type.toString()));
        if (transmission) filters.push(eq(product.transmission, transmission.toString()));
        if (condition) filters.push(eq(product.condition, condition.toString()));
        if (driveSystem) filters.push(eq(product.driveSystem, driveSystem.toString()));
        if (engine_capacity) filters.push(eq(product.engine_capacity, engine_capacity.toString()));
        if (yearFrom) filters.push(gte(product.year, Number(yearFrom)));
        if (yearTo) filters.push(lte(product.year, Number(yearTo)));
        if (priceMin) filters.push(lte(product.price, priceMin.toString()));
        if (priceMax) filters.push(gte(product.price, priceMax.toString()));
        if (mileageRange) filters.push(eq(product.mileage, mileageRange.toString()));
        if (features) {
            // Assume features is a comma-separated string
            const featureArr = (features as string).split(',').map(f => f.trim());
            featureArr.forEach(f => filters.push(like(product.features, `%${f}%`)));
        }

        const cars = await db.select().from(product).where(and(...filters));
        res.json(cars);
    } catch (error) {
        console.error('Filter error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
