// controllers/imagesController.ts
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import { carImages } from '../db/schema/carImages';
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
const fileFilter = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
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
