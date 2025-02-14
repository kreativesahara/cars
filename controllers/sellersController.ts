import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { seller } from '../db/schema/seller';
import { user } from '../db/schema/user';
import db from '../db/dbConfig';

// Fetch all users
const getAllSellers = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log('Fetching all sellers');
        const result = await db.select().from(seller);

        if (!result || result.length === 0) {
            return res.status(204).json({ message: 'No Seller found or Created.' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching sellers data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Fetch a single user by ID
const getSeller = async (req: Request, res: Response): Promise<Response> => {
    const sellerId: any = req.params.id;

    if (!sellerId) {
        return res.status(400).json({ message: 'An ID is required to fetch Seller data.' });
    }

    try {
        console.log(`Fetching Data with Created ID: ${sellerId}`);
        const foundSeller = await db
            .select()
            .from(seller)
            .where(eq(seller.userId, sellerId));
        if (!foundSeller) {
            return res.status(404).json({ message: `No Seller found with this ID: ${sellerId}.` });
        }

        return res.status(200).json(foundSeller);
    } catch (error) {
        console.error(`Error fetching Data with ID ${sellerId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Create a new user
const createSeller = async (req: Request, res: Response): Promise<any> => {
    const { username, accountType, contact, place ,hasFinancing, acceptsTradeIn } = req.body;
    const setId = req.body.userId;

    try {
        const foundUser = await db.select().from(user).where(eq(user.id, setId));
        if (foundUser.length > 0) {
            const foundRole = Number(foundUser[0].roles);  
            
            if (foundRole) {
               const newrole =await db.update(user).set({ roles: 3 }).where(eq(user.id, setId));
               console.log('Role Updated', newrole);
            }
        }
    } catch (error) {
        console.log(error)
    }
   
    if (!username || !accountType || !contact || !hasFinancing || !acceptsTradeIn) {
        return res.status(400).json({ message: 'Firstname, lastname, email, and password are required.' });
    }

    try {
        console.log('Creating a new user');
        const result = await db.insert(seller).values({
            username, 
            accountType, 
            contact, 
            hasFinancing,
            place, 
            acceptsTradeIn,
            userId: setId
        });
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating user:', error);
        // Handle unique constraint violations or other DB errors
    }
};

// Update an existing user
const updateSeller = async (req: Request, res: Response): Promise<Response> => {
    const sellerId= req.body.userId;
    console.log('Seller Id', sellerId);
    const { username, accountType, contact, hasFinancing, acceptsTradeIn } = req.body;

    if (!sellerId) {
        return res.status(400).json({ message: 'Seller ID is required.' });
    }

    if (!username && !accountType && !contact && !hasFinancing && !acceptsTradeIn ) {
        return res.status(400).json({ message: 'At least one field (username, accountType, contact, has Financing, accepts Trade In ) is required to update.' });
    }

    try {
        console.log(`Updating Seller with ID: ${sellerId}`);
       const foundSeller = await db
            .select()
            .from(seller)
            .where(eq(seller.userId, sellerId));
        if (!foundSeller) {
            return res.status(404).json({ message: `No Seller found with ID ${sellerId}.` });
        }

        const updatedFields: any = {};

        if (username) updatedFields.username = username;
        if (accountType) updatedFields.accountType = accountType;
        if (contact) updatedFields.contact = contact;
        if (hasFinancing) updatedFields.hasFinancing = hasFinancing;
        if (acceptsTradeIn) updatedFields.acceptsTradeIn = acceptsTradeIn;

        // Add other fields if necessary

        const [updatedSeller] = await db
            .update(seller)
            .set(updatedFields)
            .where(eq(seller.userId, sellerId));

        return res.status(200).json(updatedSeller);
    } catch (error) {
        console.error(`Error updating Seller with ID ${sellerId}:`, error);        
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete a user
const deleteSeller = async (req: Request, res: Response): Promise<Response> => {
    const sellerId: any = req.body.userId;
    console.log('Seller Id', sellerId);
    if (!sellerId) {
        return res.status(400).json({ message: 'Seller ID is required.' });
    }

    try {
        console.log(`Deleting Seller with ID: ${sellerId}`);
        const foundSeller = await db
            .select()
            .from(seller)
            .where(eq(seller.userId, sellerId));

        if (!foundSeller) {
            return res.status(404).json({ message: `No Seller found with ID ${sellerId}.` });
        }

        await db.delete(seller).where(eq(seller.userId, sellerId));

        return res.status(200).json({ message: `Seller with ID ${sellerId} has been deleted.` });
    } catch (error) {
        console.error(`Error deleting seller with ID ${sellerId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export {
    getAllSellers,
    getSeller,
    createSeller,
    updateSeller,
    deleteSeller
};
