import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { product } from '../db/schema/product';
import { carImages } from '../db/schema/carImages';
import multer from 'multer';
import { eq, inArray } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';
import { seller } from '../db/schema/seller';


// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const uploadPath = 'uploads/';
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
        // Extract the extension
        let fileExtension = path.extname(file.originalname);

        // Fallback to MIME type if no extension is found
        if (!fileExtension) {
            switch (file.mimetype) {
                case 'image/jpeg':
                    fileExtension = '.jpg';
                    break;
                case 'image/png':
                    fileExtension = '.png';
                    break;
                case 'image/gif':
                    fileExtension = '.gif';
                    break;
                default:
                    return cb(new Error('File does not have a valid extension or recognized MIME type'));
            }
        }

        // Generate a unique filename using timestamp and original name with extension
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, uniqueSuffix + fileExtension);
    }

});

// File filter to accept only images
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed'), false); // Reject the file
    }
};

// Initialize Multer with disk storage
const upload: any = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter,
});

// // Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cars = await db.select().from(product);
        if (!cars.length) return res.status(204).json({ message: 'No products found.' });

        const carIds = cars.map(car => car.id);
        const images = await db.select().from(carImages).where(inArray(carImages.car_id, carIds));

        const carsWithImages = cars.map(car => ({
            ...car,
            images: images
                .filter(img => img.car_id === car.id)
                .map(img => img.image_url)
        }));

        return res.json(carsWithImages);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


//Get single product
export const getProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productId: any = req.params.id;
        console.log('ProductId:', productId);

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        // Retrieve car details from the carDetail table
        const singleProduct = await db
            .select()
            .from(product)
            .where(eq(product.id, Number(productId)));

        if (!singleProduct.length) {
            return res.status(204).json({ message: 'No product found.' });
        }

        const viewProduct = singleProduct[0];
        console.log('ViewProduct:', viewProduct);
        // Retrieve associated images from the carImages table
        const images = await db
            .select()
            .from(carImages)
            .where(eq(carImages.car_id, viewProduct.id));
        const imageUrls = images.map(img => img.image_url);
        console.log('Imagesurl:', imageUrls);

        const productSeller = await db
            .select()
            .from(seller)
            .where(eq(seller.userId, viewProduct.seller_id))
        console.log('product seller', productSeller[0])
        // Merge car details with its images and return
        return res.json({ ...viewProduct, images: imageUrls, productSeller});
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const createProduct = async (req: any, res: any): Promise<any> => {
    upload.array('images')(req, res, async (err: any) => {
        if (err) {
            console.error('Error from client:', err);
            return res.status(500).json({ message: 'Image upload error.' });
        }

        const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, seller_id } = req.body;
        const images: any = req.files;

        // Validate required fields
        if (!make || !model || !year || !engine_capacity || !fuel_type || !transmission || !driveSystem || !mileage || !features || !condition || !location || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        try {
            // Insert car details and return the generated car_id
            const [carDetails] = await db
                .insert(product)
                .values({
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
                    seller_id
                })
                .$returningId(); // Ensure it returns the ID

            // Ensure car_id exists
            if (!carDetails || !carDetails?.id) {
                console.error('Failed to retrieve car_id after inserting car details.');
                return res.status(500).json({ message: 'Car details insertion failed.' });
            }

            const car_id = carDetails.id;
            console.log('Car_id:', car_id);

            // Prepare image URLs
            const imageUrls = images.map((img: any) => {
                let imageUrl = `${req.protocol}://${req.get('host')}/${img.path}`;
                return imageUrl.replace(/\\/g, '/');
            });

            // Insert images into the CarImages table
            const newcarImages = imageUrls.map((url: string) => ({
                car_id,
                image_url: url
            }));

            const imageInsertResult = await db.insert(carImages).values(newcarImages);

            if (!imageInsertResult) {
                console.error('Error inserting car images:', imageInsertResult);
                return res.status(500).json({ message: 'Failed to insert car images.' });
            }

            return res.status(201).json({
                message: 'Product created successfully.',
                carDetails,
                carImages: imageInsertResult
            });
        } catch (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });
};



// Update product
export const updateUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.body.id;
    console.log('ProductId:', productId);
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
