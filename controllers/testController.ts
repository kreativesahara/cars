import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { user } from '../db/schema/user';
import db from '../db/dbConfig';

// Fetch all Test
const getAllTests = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log('Fetching all Test');
        const result = await db.select().from(user);

        if (!result || result.length === 0) {
            return res.status(204).json({ message: 'No Test found OR Created.' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Test data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Fetch a single Test by ID
const getTest = async (req: Request, res: Response): Promise<Response> => {
    const testId: any = req.params.id;

    if (!testId) {
        return res.status(400).json({ message: 'An ID is required to fetch some data.' });
    }

    try {
        console.log(`Fetching Data with Created ID: ${testId}`);
        const foundUser = await db
            .select()
            .from(user)
            .where(eq(user.id, testId));
        if (!foundUser) {
            return res.status(404).json({ message: `No Data found with this ID: ${testId}.` });
        }

        return res.status(200).json(foundUser);
    } catch (error) {
        console.error(`Error fetching Data with ID ${testId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Create a new Test
const createTest = async (req: Request, res: Response): Promise<any> => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Firstname, lastname, email, and password are required.' });
    }

    try {
        console.log('Creating a new Test');
        const result = await db.insert(user).values({
            firstname,
            lastname,
            email,
            password,
            roles: 0,
        });
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating Test:', error);
        // Handle unique constraint violations or other DB errors
    }
};

// Update an existing Test
const updateTest = async (req: Request, res: Response): Promise<Response> => {
    const testId: any = req.body.id;
    const { firstname, lastname, email, password } = req.body;

    if (!testId) {
        return res.status(400).json({ message: 'Test ID is required.' });
    }

    if (!firstname && !lastname && !email && !password) {
        return res.status(400).json({ message: 'At least one field (firstname, lastname, email, password) is required to update.' });
    }

    try {
        console.log(`Updating Test with ID: ${testId}`);
        const foundUser = await db
            .select()
            .from(user)
            .where(eq(user.id, testId));
        if (!foundUser) {
            return res.status(404).json({ message: `No Test found with ID ${testId}.` });
        }

        const updatedFields: any = {};

        if (firstname) updatedFields.firstname = firstname;
        if (lastname) updatedFields.lastname = lastname;
        if (email) updatedFields.email = email;
        if (password) updatedFields.password = password;
        // Add other fields if necessary

        const [updatedTest] = await db
            .update(user)
            .set(updatedFields)
            .where(eq(user.id, testId));

        return res.status(200).json(updatedTest);
    } catch (error) {
        console.error(`Error updating Test with ID ${testId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Delete a Test
const deleteTest = async (req: Request, res: Response): Promise<Response> => {
    const testId: any = req.body.id;

    if (!testId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        console.log(`Deleting Test with ID: ${testId}`);
        const foundUser = await db
            .select()
            .from(user)
            .where(eq(user.id, testId));

        if (!foundUser) {
            return res.status(404).json({ message: `No Test found with ID ${testId}.` });
        }

        await db.delete(user).where(eq(user.id, testId));

        return res.status(200).json({ message: `Test with ID ${testId} has been deleted.` });
    } catch (error) {
        console.error(`Error deleting user with ID ${testId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export {
    getAllTests,
    getTest,
    createTest,
    updateTest,
    deleteTest
};
