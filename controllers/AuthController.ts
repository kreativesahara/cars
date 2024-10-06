import db from '../db/dbConfig'
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { users } from '../db/schema/user'; // Adjust the import path as necessary
import { eq} from 'drizzle-orm';
//const jwt = require('jsonwebtoken');

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { firstname, lastname, email, password } = req.body;

    // Input Validation
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Firstname, lastname, email, and password are required.' });
    }

    try {
        // Check if the user already exists
        // const existingUser = await db.select().from(users)
        // .where(eq(users.email, email))
        // if (existingUser) {
        //     return res.status(409).json({ message: 'Email already in use.' });
        // }

        // Hash the password
        const saltRounds: any = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const [newUser] = await db
            .insert(users)
        .values({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            // Add other fields if necessary, e.g., photo
        })
        // Exclude the password from the response
        return res.status(201).json({
            message: 'User registered successfully.',
            user: {
                firstname: firstname,
                lastname: lastname,
                email: email,
            },
        });    
    } catch (error: any) {
        console.error('Error registering user:', error);

        // Handle unique constraint violation (e.g., duplicate email)
        if (error.code === '23505') { // PostgreSQL unique violation code
            return res.status(409).json({ message: 'Email already exists.' });
        }

        return res.status(500).json({ message: 'Internal server error.' });
    }
};

export { registerUser };
