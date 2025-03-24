import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { product } from '../db/schema/product';
import { carImages } from '../db/schema/carImages';
import multer from 'multer';
import { eq, inArray } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';
import { seller } from '../db/schema/seller';
import slugify from "slugify";

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


export const getProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { slug } = req.params;
        console.log('Slug:', slug);

        if (!slug) {
            return res.status(400).json({ message: 'Product slug is required.' });
        }

        // Retrieve car details from the carDetail table
        const singleProduct = await db.select().from(product).where(eq(product.slug, slug)).limit(1);

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

const generateSlug = (make: string, model: string, year: number) => {
    return `${make}-${model}-${year}-${Math.random().toString(36).substring(2, 8)}`
        .toLowerCase()
        .replace(/\s+/g, '-');
};

export const createProduct = async (req: Request, res: Response): Promise<any> => {
    upload.array('images')(req, res, async (err: any) => {
        if (err) {
            console.error('Error from client:', err);
            return res.status(500).json({ message: 'Image upload error.' });
        }

        const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, seller_id } = req.body;
        const images: any = req.files;

        if (!make || !model || !year || !engine_capacity || !fuel_type || !transmission || !driveSystem || !mileage || !features || !condition || !location || !price || !seller_id) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const slug = generateSlug(make, model, year);
        console.log(slug)

        try {
            const [carDetails] = await db.insert(product).values({
                make,
                model,
                year,
                slug,
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

            if (!carDetails || !carDetails.id) {
                console.error('Failed to retrieve car_id after inserting car details.');
                return res.status(500).json({ message: 'Car details insertion failed.' });
            }

            const car_id = carDetails.id;
            const imageUrls = images.map((img: any) => `${req.protocol}://${req.get('host')}/${img.path}`.replace(/\\/g, '/'));
            const newcarImages = imageUrls.map((url: string) => ({ car_id, image_url: url }));
            await db.insert(carImages).values(newcarImages);

            return res.status(201).json({
                message: 'Product created successfully.',
                carDetails,
                images: newcarImages,
            });
        } catch (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });
};

// Update product
export const updateUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.body.id;
    console.log("ProductId:", productId);

    const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, seller_id } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
    }

    try {
        console.log(`Fetching Product with ID: ${productId}`);
        const existingProduct = await db.select().from(product).where(eq(product.id, productId)).limit(1);

        if (!existingProduct || existingProduct.length === 0) {
            return res.status(404).json({ message: `No Product found with ID ${productId}.` });
        }

        let updatedFields: any = {};

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

        // Generate a new slug if `make` or `model` is changed
        if (make || model) {
            const newMake = make || existingProduct[0].make;
            const newModel = model || existingProduct[0].model;
            updatedFields.slug = slugify(`${make}-${model}-${year}-${Math.random().toString(36).substring(2, 8)}`
                .toLowerCase()
                .replace(/\s+/g, '-'));
        }

        console.log(`Updating Product with ID: ${productId}`);
        await db.update(product).set(updatedFields).where(eq(product.id, productId));

        return res.status(200).json({ message: "Product updated successfully", updatedFields });
    } catch (error) {
        console.error(`Error updating Product with ID ${productId}:`, error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Delete product
export const deleteUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = Number(req.params.id); // Get from URL params

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        console.log(`Deleting Product with ID: ${productId}`);
        const vehicle = await db.select().from(product).where(eq(product.id, productId));

        if (vehicle.length === 0) {
            return res.status(404).json({ message: `No Product found with ID ${productId}.` });
        }

        await db.delete(product).where(eq(product.id, productId));
        return res.status(200).json({ message: `Product with ID ${productId} has been deleted.` });
    } catch (error) {
        console.error(`Error deleting Product with ID ${productId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
