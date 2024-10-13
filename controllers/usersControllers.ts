import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema/user';
import db from '../db/dbConfig';

// Fetch all users
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log('Fetching all users');
        const result = await db.select().from(users);

        if (!result || result.length === 0) {
            return res.status(204).json({ message: 'No Test found OR Created.' });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching Test data:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Fetch a single user by ID
const getUser = async (req: Request, res: Response): Promise<Response> => {
    const userId: any = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: 'An ID is required to fetch some data.' });
    }

    try {
        console.log(`Fetching Data with Created ID: ${userId}`);
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));
        if (!user) {
            return res.status(404).json({ message: `No Data found with this ID: ${userId}.` });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(`Error fetching Data with ID ${userId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

// Create a new user
const createUser = async (req: Request, res: Response): Promise<any> => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Firstname, lastname, email, and password are required.' });
    }

    try {
        console.log('Creating a new user');
        const result = await db.insert(users).values({
            firstname,
            lastname,
            email,
            password,
            // photo: photo,
        });
        return res.status(201).json(result);
    } catch (error) {
        console.error('Error creating user:', error);
        // Handle unique constraint violations or other DB errors
    }
};

// Update an existing user
// const updateUser = async (req: Request, res: Response): Promise<Response> => {
//     const userId = req.params.id;
//     const { firstname, lastname, email, password } = req.body;

//     if (!userId) {
//         return res.status(400).json({ message: 'User ID is required.' });
//     }

//     if (!firstname && !lastname && !email && !password) {
//         return res.status(400).json({ message: 'At least one field (firstname, lastname, email, password) is required to update.' });
//     }

//     try {
//         console.log(`Updating user with ID: ${userId}`);
//         const user = await db.select().from(users)
//         //.where({ id: userId }).first();

//         if (!user) {
//             return res.status(404).json({ message: `No user found with ID ${userId}.` });
//         }

//         const updatedFields: Partial<typeof user> = {};

//         if (firstname) updatedFields.firstname = firstname;
//         if (lastname) updatedFields.lastname = lastname;
//         if (email) updatedFields.email = email;
//         if (password) updatedFields.password = password;
//         // Add other fields if necessary

//         const [updatedUser] = await db.update(updatedFields).from(users).where({ id: userId }).returning('*');

//         return res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error(`Error updating user with ID ${userId}:`, error);
//         // Handle unique constraint violations or other DB errors
//         if (error.code === '23505') { // Example for PostgreSQL unique violation
//             return res.status(409).json({ message: 'Email already exists.' });
//         }
//         return res.status(500).json({ message: 'Internal server error.' });
//     }
// };

// Delete a user
const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        console.log(`Deleting user with ID: ${userId}`);
        const user = await db.select().from(users)
        //.where({ id: userId }).first();

        if (!user) {
            return res.status(404).json({ message: `No user found with ID ${userId}.` });
        }

        //await db.delete().from(users).where({ id: userId });

        return res.status(200).json({ message: `User with ID ${userId} has been deleted.` });
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export {
    getAllUsers,
    getUser,
    createUser,
    //updateUser,
    deleteUser
};
