import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { and, like, eq, gte, lte, inArray } from 'drizzle-orm/expressions';
import { product } from '../db/schema/product';
import { carImages } from '../db/schema/carImages';

export const filterCarProducts = async (req: Request, res: Response) => {
    try {
        const {
            make, model, location, yearFrom, yearTo, priceMin, priceMax, fuel_type,
            transmission, mileageRange, condition, driveSystem, engine_capacity, features
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
        if (priceMin) filters.push(gte(product.price, priceMin.toString()));
        if (priceMax) filters.push(lte(product.price, priceMax.toString()));
        if (mileageRange) filters.push(eq(product.mileage, mileageRange.toString()));

        if (features) {
            const featureArr = (features as string).split(',').map(f => f.trim());
            featureArr.forEach(f => filters.push(like(product.features, `%${f}%`)));
        }

        // Fetch filtered cars
        const cars = await db.select().from(product).where(and(...filters));

        if (cars.length === 0) {
            return res.json([]); // Return empty array if no cars match
        }

        // Fetch images only for the cars that matched
        const carIds = cars.map(car => car.id);
        const images = await db
            .select({ car_id: carImages.car_id, image_url: carImages.image_url })
            .from(carImages)
            .where(inArray(carImages.car_id, carIds));

        // Group images by car_id
        const imageMap = images.reduce((acc, { car_id, image_url }) => {
            if (!acc[car_id]) acc[car_id] = [];
            acc[car_id].push({ image_url });
            return acc;
        }, {} as Record<number, { image_url: string }[]>);
        console.log('imageMap:', imageMap);
        // Attach images to their respective cars
        const carsWithImages = cars.map(car => ({
            ...car,
            images: imageMap[car.id] || [] // Assign images or empty array if none exist
        }));

        res.json(carsWithImages);
        console.log('Filtered cars:', carsWithImages);
    } catch (error) {
        console.error('Filter error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
