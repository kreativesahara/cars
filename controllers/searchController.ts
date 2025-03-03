import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { or, like, inArray } from 'drizzle-orm/expressions';
import { product } from '../db/schema/product';
import { carImages } from '../db/schema/carImages';


export const searchCarProduct = async (req: Request, res: Response) => {
    try {
        const { make, model, location, condition} = req.query;
        console.log('Search query implementation:', make, model, location);
        const cars = await db.select()
            .from(product)
            .where(
                or(
                    like(product.make, `%${make}%`),
                    like(product.model, `%${model}%`),
                    like(product.location, `%${location}%`),
                    like(product.condition, `%${condition}%`)

                )
            );

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
    
        // Attach images to their respective cars
        const carsWithImages = cars.map(car => ({
            ...car,
            images: imageMap[car.id] || [] // Assign images or empty array if none exist
        }));

        res.json(carsWithImages);
        console.log('Searched cars:', carsWithImages);
      
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};