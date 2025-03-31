import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { product } from '../db/schema/product';
import { carImages } from '../db/schema/carImages';
import { seller } from '../db/schema/seller';
import multer from 'multer';
import { eq, inArray } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';
import slugify from 'slugify';


const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req: any, file: any, cb: any) => {
        let fileExtension = path.extname(file.originalname);
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
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error('Only images are allowed'), false); 
    }
};

const upload: any = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, 
    fileFilter,
});

const generateSlug = (make: string, model: string, year: number) => {
    return `${make}-${model}-${year}-${Math.random().toString(36).substring(2, 8)}`
        .toLowerCase()
        .replace(/\s+/g, '-');
};

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const cars = await db.select().from(product);
        if (!cars.length) return res.status(204).json({ message: 'No products found.' });

        const carIds = cars.map(car => car.id);
        const images = await db.select().from(carImages).where(inArray(carImages.carId, carIds));

        const carsWithImages = cars.map(car => ({
            ...car,
            images: images
                .filter(img => img.carId === car.id)
                .map(img => img.imageUrl)
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
        if (!slug) {
            return res.status(400).json({ message: 'Product slug is required.' });
        }
        const singleProduct = await db.select().from(product).where(eq(product.slug, slug)).limit(1);
        if (!singleProduct.length) {
            return res.status(204).json({ message: 'No product found.' });
        }
        const viewProduct = singleProduct[0];
        const images = await db
            .select()
            .from(carImages)
            .where(eq(carImages.carId, viewProduct.id));
        const imageUrls = images.map(img => img.imageUrl);
        const productSeller = await db
            .select()
            .from(seller)
            .where(eq(seller.userId, viewProduct.sellerId));

        return res.json({ ...viewProduct, images: imageUrls, productSeller });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<any> => {
    upload.array('images')(req, res, async (err: any) => {
        if (err) {
            console.error('Error from client:', err);
            return res.status(500).json({ message: 'Image upload error.' });
        }
        const {
            make, model, year, engineCapacity, fuelType, transmission,
            driveSystem, mileage, features, condition, location, price, sellerId
        } = req.body;
        const images: any = req.files;

        if (!make || !model || !year || !engineCapacity || !fuelType ||
            !transmission || !driveSystem || !mileage || !features || !condition ||
            !location || !price || !sellerId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const slug = generateSlug(make, model, year);
        try {
            const [carDetails] = await db.insert(product).values({
                make,
                model,
                year,
                slug,
                engineCapacity,
                fuelType,
                transmission,
                driveSystem,
                mileage,
                features,
                condition,
                location,
                price,
                sellerId
            })
            .returning({
                id: product.id,});

            if (!carDetails || !carDetails.id) {
                console.error('Failed to retrieve car_id after inserting product details.');
                return res.status(500).json({ message: 'Product insertion failed.' });
            }

            const car_id = carDetails.id;
            const newDir = path.join('uploads', 'cars', `${car_id}`);
            if (!fs.existsSync(newDir)) {
                fs.mkdirSync(newDir, { recursive: true });
            }

            const imageUrls = images.map((img: any) => {
                const oldPath = img.path;
                const newPath = path.join(newDir, path.basename(img.path));
                fs.renameSync(oldPath, newPath);
                return `${req.protocol}://${req.get('host')}/${newPath}`.replace(/\\/g, '/');
            });

            const newCarImages = imageUrls.map((url: string) => ({ carId: car_id, imageUrl: url }));
            console.log('New car images:', newCarImages);
            if (newCarImages.length === 0) {
                return res.status(400).json({ message: 'No images uploaded.' });
            }
            else{
                await db.insert(carImages).values(newCarImages);
            }            

            return res.status(201).json({
                message: 'Product created successfully.',
                carDetails,
                images: newCarImages,
            });
        } catch (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });
};

export const updateUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = req.body.id;
    const {
        make, model, year, engine_capacity, fuel_type, transmission,
        driveSystem, mileage, features, condition, location, price, seller_id
    } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required." });
    }

    try {
        const existingProduct = await db.select().from(product).where(eq(product.id, productId)).limit(1);
        if (!existingProduct || existingProduct.length === 0) {
            return res.status(404).json({ message: `No product found with ID ${productId}.` });
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

        // Generate a new slug if make or model is updated
        if (make || model) {
            const newMake = make || existingProduct[0].make;
            const newModel = model || existingProduct[0].model;
            updatedFields.slug = slugify(`${newMake}-${newModel}-${year}-${Math.random().toString(36).substring(2, 8)}`)
                .toLowerCase()
                .replace(/\s+/g, '-');
        }

        await db.update(product).set(updatedFields).where(eq(product.id, productId));

        return res.status(200).json({ message: "Product updated successfully", updatedFields });
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Delete product
export const deleteUpload = async (req: Request, res: Response): Promise<Response> => {
    const productId = Number(req.params.id);
    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required.' });
    }

    try {
        const vehicle = await db.select().from(product).where(eq(product.id, productId));
        if (vehicle.length === 0) {
            return res.status(404).json({ message: `No product found with ID ${productId}.` });
        }

        // Optionally, you might also want to delete the associated images from storage
        const carImageDir = path.join('uploads', 'cars', `${productId}`);
        if (fs.existsSync(carImageDir)) {
            fs.rmSync(carImageDir, { recursive: true, force: true });
        }

        await db.delete(product).where(eq(product.id, productId));
        return res.status(200).json({ message: `Product with ID ${productId} has been deleted.` });
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
