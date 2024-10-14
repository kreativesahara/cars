import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { product } from '../db/schema/product';
import db from '../db/dbConfig'

const getAllProducts: (req: any, res: any) => Promise<Request> = async (req: any, res: any): Promise<any> => {
    console.log('hello from products controller');
    const result: any = await db.select().from(product)
    if (!result) return res.status(204).json({ 'message': 'No product found.' });
    res.json(result);
}
const getProduct = async (req:Request, res:Response): Promise<any> => {
    const productId: any = req.params.id;

    if (!productId) {
        return res.status(400).json({ 'message': 'Product ID is required.' });
    }
    const singleProduct: any = await db
        .select()
        .from(product)
        .where(eq(product.id, productId));
    if (!singleProduct) {
        return res.status(204).json({ 'message': 'No product found.' });
    }
 
    res.json(singleProduct);
}
const createProduct: (req: any, res: any) => Promise<any> = async (req:any, res: any): Promise<any> => {
    const {make, model, year, engine_capacity, fuel_type,    transmission, driveSystem, mileage, features, condition,     location, price, seller_id=1} = req.body;

    if (!make || !features || !seller_id || !mileage || !model || !year || !engine_capacity || !fuel_type || !transmission || !driveSystem || !price || !condition || !location 
    ) {    
         return res.status(400).json({ 'message': 'some inputs are required' });  
    }

    try {
        const result = await db.insert(product).values({
            make, model, year, engine_capacity, fuel_type,
            transmission, driveSystem, mileage, features,       condition, location, price, seller_id,
            // photo: photo,
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateSingleProduct = async (req:Request, res:Response) => {
    const productId:any = req.body.id;
    const {make, model, year, engine_capacity,fuel_type,transmission, driveSystem, mileage, features, condition,location, price, seller_id=1} = req.body;

    if (!productId) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    if (!features && !seller_id && !mileage && !model && !year && !engine_capacity && !fuel_type && !transmission && !driveSystem && !price && !condition && !location) {
        return res.status(400).json({ "message": "No fields to update." });
    }
    try {
        console.log(`Updating Product with ID: ${productId}`);
        const vehicle = await db
            .select()
            .from(product)
            .where(eq(product.id, productId));
        if (!vehicle) {
            return res.status(404).json({ message: `No Product found with ID ${productId}.` });
        }

        const updatedFields: any = {};

        if (make) updatedFields.make = make;
        if (model) updatedFields.model = model;
        if (year) updatedFields.year = year;
        if (engine_capacity) updatedFields.engine_capacity = engine_capacity;
        if (fuel_type) updatedFields.fuel_type = fuel_type;
        if (transmission) updatedFields.transmission = transmission;
        if (driveSystem) updatedFields.driveSystem = driveSystem;
        if (mileage) updatedFields.mileage = mileage;
        if (features) updatedFields.features = features;
        if (condition) updatedFields.condition = condition;
        if (location) updatedFields.location = location;
        if (price) updatedFields.price = price;
        if (seller_id) updatedFields.seller_id = seller_id;
        // Add other fields if necessary

        const [updatedTest] = await db
            .update(product)
            .set(updatedFields)
            .where(eq(product.id, productId));

        return res.status(200).json(updatedTest);
    } catch (error) {
        console.error(`Error updating Product with ID ${productId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
    
const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const productId: any = req.body.id;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        console.log(`Deleting Product with ID: ${productId}`);
        const vehicle = await db
            .select()
            .from(product)
            .where(eq(product.id, productId));

        if (!vehicle) {
            return res.status(404).json({ message: `No Product found with ID ${productId}.` });
        }

        await db.delete(product).where(eq(product.id, productId));

        return res.status(200).json({ message: `Product with ID ${productId} has been deleted.` });
    } catch (error) {
        console.error(`Error deleting Product with ID ${productId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export {
    getAllProducts,
    createProduct,
    updateSingleProduct,
    deleteProduct,
    getProduct
}
