import { Request, Response } from 'express';
import db from '../db/dbConfig';
// import { product } from '../db/schema/product';
import { testProduct } from '../db/schema/testProduct';
//import { productImage } from '../db/schema/ProductImage';
import multer from 'multer';
import { eq } from 'drizzle-orm';
import path from 'path';
import fs from 'fs';


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
    console.log('Fetching all products');
    const result = await db.select().from(testProduct);
    if (!result.length) return res.status(204).json({ message: 'No products found.' });
    return res.json(result);
};

// Get single product
// export const getUpload = async (req: Request, res: Response): Promise<Response> => {
//     const productId: any = req.params.id;

//     if (!productId) {
//         return res.status(400).json({ message: 'Product ID is required.' });
//     }

//     const singleProduct = await db.select().from(product).where(eq(product.id, productId));

//     if (!singleProduct.length) { // Check if the array is empty
//         return res.status(204).json({ message: 'No product found.' });
//     }

//     return res.json(singleProduct[0]); // Return the first (and presumably only) product
// };


// Create product with images
export const createProduct = async (req: any, res: any): Promise<any> => {
    upload.array('images')(req, res, async (err: any) => {
        if (err) {
            console.log('Error from client:', err);
            return res.status(500).json({ message: 'Image upload error.' });
        }
        const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, 
                seller_id =130 
            } = req.body;
        const images: any = req.files;

        // Validate required fields
        if (!make || !model || !year || !engine_capacity || !fuel_type || !transmission || !driveSystem || !mileage || !features || !condition || !location || !price) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        try {
            // Handle image uploads and prepare data for bulk insertion
            // Construct the image URL (adjust based on how you serve static files)
            let imageUrl = `${req.protocol}://${req.get('host')}/${images[0].path}`;
            // Replace backward slashes with forward slashes in the URL for compatibility
            imageUrl = imageUrl.replace(/\\/g, '/');
            const valuesToInsert = images.map((img: any) => ({
                make: make,
                model: model,
                year: year,
                engine_capacity: engine_capacity,
                fuel_type: fuel_type,
                transmission: transmission,
                driveSystem: driveSystem,
                mileage: mileage,
                features: features,
                condition: condition,
                location: location,
                price: price,
                seller_id: seller_id,
                image_url: imageUrl // Save the image URL/path
            }));

            // Insert all values at once
            const result = await db
                .insert(testProduct)
                .values(valuesToInsert);
            console.log('Inserted product IDs:', result);

            // Check if the products were inserted successfully
            if (!result) {
                return res.status(500).json({ message: 'Failed to insert products.' });
            }
            return res.status(201).json({ message: 'Products created successfully.', result });
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error.' });
        }
    });
};

// // Update product
// export const updateUpload = async (req: Request, res: Response): Promise<Response> => {
//     const productId = req.body.id;
//     const { make, model, year, engine_capacity, fuel_type, transmission, driveSystem, mileage, features, condition, location, price, seller_id } = req.body;

//     if (!productId) {
//         return res.status(400).json({ message: 'Product ID is required.' });
//     }

//     const updatedFields: any = {};

//     if (make) updatedFields.make = make;
//     if (model) updatedFields.model = model;
//     if (year) updatedFields.year = year;
//     if (engine_capacity) updatedFields.engine_capacity = engine_capacity;
//     if (fuel_type) updatedFields.fuel_type = fuel_type;
//     if (transmission) updatedFields.transmission = transmission;
//     if (driveSystem) updatedFields.driveSystem = driveSystem;
//     if (mileage) updatedFields.mileage = mileage;
//     if (features) updatedFields.features = features;
//     if (condition) updatedFields.condition = condition;
//     if (location) updatedFields.location = location;
//     if (price) updatedFields.price = price;
//     if (seller_id) updatedFields.seller_id = seller_id;

//     try {
//         console.log(`Updating Product with ID: ${productId}`);
//         const vehicle = await db.select().from(product).where(eq(product.id, productId));
//         if (!vehicle) {
//             return res.status(404).json({ message: `No Product found with ID ${productId}.` });
//         }

//         const [updatedProduct] = await db.update(product).set(updatedFields).where(eq(product.id, productId));
//         return res.status(200).json(updatedProduct);
//     } catch (error) {
//         console.error(`Error updating Product with ID ${productId}:`, error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// // Delete product
// export const deleteUpload = async (req: Request, res: Response): Promise<Response> => {
//     const productId = req.body.id;

//     if (!productId) {
//         return res.status(400).json({ message: 'Product ID is required.' });
//     }

//     try {
//         console.log(`Deleting Product with ID: ${productId}`);
//         const vehicle = await db.select().from(product).where(eq(product.id, productId));

//         if (!vehicle) {
//             return res.status(404).json({ message: `No Product found with ID ${productId}.` });
//         }

//         await db.delete(product).where(eq(product.id, productId));
//         return res.status(200).json({ message: `Product with ID ${productId} has been deleted.` });
//     } catch (error) {
//         console.error(`Error deleting Product with ID ${productId}:`, error);
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };
