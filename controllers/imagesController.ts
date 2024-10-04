// controllers/imagesController.ts
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import { productImages } from '../db/schema/ProductImage';
import { product } from '../db/schema/product';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure Multer to store files on disk
const storage = multer.diskStorage({
    destination: (req: any, file:any, cb:any) => {
        const uploadPath = 'uploads/';
        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req:any, file:any, cb:any) => {
        // Generate a unique filename using timestamp and original name
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only images
const fileFilter = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only images are allowed'), false); // Reject the file
    }
};

// Initialize Multer with disk storage
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter,
});
export const gellAllImage = async (req:any, res:any) => {
    
}
// Controller function to handle image upload
export const uploadImage = [
    upload.single('image'), // 'image' is the field name in the form
    async (req:any, res:any) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const { filename, path: filePath } = req.file;
            const { car_id } = req.body;

            if (!car_id) {
                // Delete the uploaded file since car_id is missing
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'car_id is required' });
            }

            // Optional: Verify that the car_id exists in the products table
            const car = await db.select().from(product).where(eq(product.id, parseInt(car_id))).execute();
            if (car.length === 0) {
                // Delete the uploaded file since car_id is invalid
                fs.unlinkSync(filePath);
                return res.status(400).json({ message: 'Invalid car_id' });
            }

            // Construct the image URL (adjust based on how you serve static files)
            const imageUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

            // Insert image data into the database
            await db
                .insert(productImages)
                .values({
                    car_id: parseInt(car_id),
                    image_url: imageUrl,
                })
                .execute();

            res.status(201).json({ message: 'Image uploaded successfully', image_url: imageUrl });
        } catch (error) {
            console.error('Error uploading image:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
];
