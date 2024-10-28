import db from '../db/dbConfig'
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { users } from '../db/schema/user'; // Adjust the import path as necessary
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { firstname, lastname, email, password } = req.body;
    //console.log(req.body);
    // Input Validation
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Firstname, lastname, email, and password are required.' });
    }

    try {
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
        console.log('User registered successfully:', newUser); 
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
    };
}
 const handleLogin = async (req: Request, res: Response) => {
    console.log('Logging in user');
    const { email, password} = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const isMatch = await bcrypt.compare(password, foundUser[0].password??'');
    if (isMatch) {
        const roles = Object.values(foundUser[0].role).filter(Boolean);
        // create JWTs
        //TODO: change access token expire
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser[0].email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '60s' },

        );

        const refreshToken = jwt.sign(
            { "email": foundUser[0].email },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '1d' }
        );
        //Save current user with their refresh token
        await db
            .update(users)
            .set({ refreshToken: refreshToken })
            .where(eq(users.email, email));

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        //sameSite: 'None',
        // Send authorization roles and access token to user
        res.json({ roles, accessToken });
        console.log(foundUser);
    } else {
        res.sendStatus(401);
    }
}
export { registerUser,
         handleLogin
      };
