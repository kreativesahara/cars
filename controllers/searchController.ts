import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { and, or, like, eq } from 'drizzle-orm/expressions';
import { product } from '../db/schema/product';


export const searchCarProduct = async (req: Request, res: Response) => {
    try {
        const { make, model, location } = req.query;
        console.log('Search query implementation:', make, model, location);
        const cars = await db.select()
            .from(product)
            .where(
                or(
                    like(product.make, `%${make}%`),
                    like(product.model, `%${model}%`),
                    like(product.location, `%${location}%`)
                )
            );
        res.json(cars);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};