import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { seller } from '../db/schema/seller';
import { user } from '../db/schema/user';
import db from '../db/dbConfig';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadPath = 'seller_profile/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname) || '.jpg';
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only images are allowed'), false);
};

const upload = multer({ storage, limits: { fileSize: 1 * 1024 * 1024 }, fileFilter });

const getAllSellers = async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(seller);
        return result.length ? res.status(200).json(result) : res.status(204).json({ message: 'No sellers found.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getSeller = async (req: Request, res: Response) => {
    const sellerId = req.params.id;
    if (!sellerId) return res.status(400).json({ message: 'Seller ID required.' });

    try {
        const foundSeller = await db.select().from(seller).where(eq(seller.userId, Number(sellerId)));
        return foundSeller.length ? res.status(200).json(foundSeller[0]) : res.status(404).json({ message: 'Seller not found.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


const createSeller = async (req: Request, res: Response): Promise<any> => {
    // Process a single file from field 'image'
    upload.single('image')(req, res, async (err: any) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ message: 'Image upload error.' });
        }
        const { username, accountType, contact, place, hasFinancing, acceptsTradeIn, userId } = req.body;
        // Construct full image URL if file exists
        const imageUrl = req.file
            ? `${req.protocol}://${req.get('host')}/${req.file.path}`.replace(/\\/g, '/')
            : undefined;

        // If image is required, reject if missing.
        if (!imageUrl) return res.status(400).json({ message: 'Image is required.' });
        // Validate required fields
        if (!username || !accountType || !contact || !place || hasFinancing === undefined || acceptsTradeIn === undefined || !userId) {
            return res.status(400).json({ message: 'Required fields missing.' });
        }
        // Update user role if necessary
        try {
            const foundUser = await db.select().from(user).where(eq(user.id, Number(userId)));
            console.log('foundUser', foundUser);
            if (foundUser.length === 0) {
                return res.status(404).json({ message: 'User not found.' });
            }
            if (Number(foundUser[0].roles) !== 3) {
                await db.update(user).set({ roles: 3 }).where(eq(user.id, Number(userId)));
            }
        } catch (error) {
            return res.status(500).json({ message: 'Error updating user role.' });
        }

        // Build seller data – include image_url if available
        try {
            const sellerData: any = {
                username,
                accountType,
                contact,
                hasFinancing,
                place,
                acceptsTradeIn,
                userId: Number(userId),
                imageUrl
            };
            const result = await db.insert(seller).values(sellerData);
            return res.status(201).json({ message: 'Seller created successfully.', result });
        } catch (error) {
            console.error('Error creating seller:', error);
            return res.status(500).json({ message: 'Error creating seller.' });
        }
    });
};

const updateSeller = async (req: Request, res: Response) => {
    const { userId, username, accountType, contact, hasFinancing, acceptsTradeIn } = req.body;
    const image_url = req.file ? `${uploadPath}${req.file.filename}` : undefined;

    if (!userId) return res.status(400).json({ message: 'Seller ID required.' });

    try {
        const foundSeller = await db.select().from(seller).where(eq(seller.userId, Number(userId)));
        if (!foundSeller.length) return res.status(404).json({ message: 'Seller not found.' });

        if (image_url && foundSeller[0].imageUrl) {
            const oldImage = foundSeller[0].imageUrl;
            if (fs.existsSync(oldImage)) fs.unlinkSync(oldImage);
        }

        const updatedFields: any = { username, accountType, contact, hasFinancing, acceptsTradeIn };
        if (image_url) updatedFields.image_url = image_url;

        await db.update(seller).set(updatedFields).where(eq(seller.userId, Number(userId)));
        return res.status(200).json({ message: 'Seller updated successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating seller.' });
    }
};

const deleteSeller = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Seller ID required.' });
    try {
        const foundSeller = await db.select().from(seller).where(eq(seller.userId, Number(userId)));
        if (!foundSeller.length) return res.status(404).json({ message: 'Seller not found.' });

        if (foundSeller[0].imageUrl && fs.existsSync(foundSeller[0].imageUrl)) {
            fs.unlinkSync(foundSeller[0].imageUrl);
        }
        await db.delete(seller).where(eq(seller.userId, Number(userId)));
        return res.status(200).json({ message: 'Seller deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting seller.' });
    }
};

export { getAllSellers, getSeller, createSeller, updateSeller, deleteSeller, upload };
