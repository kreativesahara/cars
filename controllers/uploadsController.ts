import { Request, Response } from 'express';
import  db  from '../db/dbConfig'; 
import { product } from '../db/schema/product';
import { productImage } from '../db/schema/productImage';
import multer, { Multer } from 'multer';
import { eq } from 'drizzle-orm';

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Get all products
export const getAllUploads = async (req: Request, res: Response): Promise<Response> => {
    console.log('Fetching all products');
    const result = await db.select().from(product);
    if (!result.length) return res.status(204).json({ message: 'No products found.' });
    return res.json(result);
};

// Get single product
export const getUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId: any = req.params.id;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    const singleProduct = await db.select().from(product).where(eq(product.id, productId));

    if (!singleProduct.length) { // Check if the array is empty
        return res.status(204).json({ message: 'No product found.' });
    }

    return res.json(singleProduct[0]); // Return the first (and presumably only) product
};


// Create product with images
export const createUpload = async (req: any, res: any): Promise<any> => {
    upload.single('image')
    const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, seller_id =53 } = req.body;

    if (!make || !model || !year || !engine_capacity || !fuel_type || !transmission || !driveSystem || !mileage || !features || !condition || !location || !price || !seller_id) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

   //const images = req.files as Express.Multer.File[];

    try {
        const result = await db.insert(product).values({
            make,
            model,
            year,
            engine_capacity,
            fuel_type,
            transmission,
            driveSystem,
            mileage,
            features,
            condition,
            location,
            price,
            seller_id,
        })
        .$returningId();

        console.log('Inserted product ID:', result);
        //console.log(images);
        // Check if productId was retrieved successfully
        if (!result) {
            return res.status(500).json({ message: 'Failed to retrieve inserted product ID.' });
        }

        // if (images && images.length > 0) {
        //     const imagePromises = images.map(async (img: Express.Multer.File) => {
        //         await db.insert(productImage).values({
        //             car_id: result[0].id,
        //             image_url: img.path,
        //         });
        //     });

        //     await Promise.all(imagePromises);
        // }else{
        //     console.log('No images uploaded');
        // }

        return res.status(201).json({ message: 'Product created successfully.',  result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update product
export const updateUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.body.id;
    const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, seller_id } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
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

    try {
        console.log(`Updating Product with ID: ${productId}`);
        const vehicle = await db.select().from(product).where(eq(product.id, productId));
        if (!vehicle) {
            return res.status(404).json({ message: `No Product found with ID ${productId}.` });
        }

        const [updatedProduct] = await db.update(product).set(updatedFields).where(eq(product.id, productId));
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(`Error updating Product with ID ${productId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete product
export const deleteUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.body.id;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        console.log(`Deleting Product with ID: ${productId}`);
        const vehicle = await db.select().from(product).where(eq(product.id, productId));

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
