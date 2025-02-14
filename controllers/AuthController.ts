import db from '../db/dbConfig'
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { user } from '../db/schema/user'; 
import { eq } from 'drizzle-orm'; import jwt from 'jsonwebtoken';
import { ROLES_LIST } from '../config/roles_list';

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
            .insert(user)
            .values({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                roles: ROLES_LIST.Visitor
            })
        //console.log('User registered successfully:', newUser); 
        // Exclude the password from the response
        return res.status(201).json({
            message: 'User registered successfully.',
            user: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                roles: ROLES_LIST.Visitor
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
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundUser = await db.select().from(user).where(eq(user.email, email)).limit(1);
    //console.log('foundUser:', foundUser);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const isMatch = await bcrypt.compare(password, foundUser[0].password ?? '');
    if (isMatch) {
        const { id, firstname, lastname, roles } = foundUser[0];
        // create JWTs
        //TODO: change access token expire
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": id,
                    "firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: '2h' },

        );

        const refreshToken = jwt.sign(
            {
                "id": id,
                //"firstname": firstname,
                "lastname": lastname,
                "email": email,
                "roles": roles
            },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: '12h' }
        );
        //Save current user with their refresh token
        await db
            .update(user)
            .set({ refreshToken: refreshToken })
            .where(eq(user.email, email));

        //Creates Secure Cookie with access token
        res.cookie('authorization', accessToken, {
            httpOnly: true,
            // secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })
            ;
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            //secure: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })
        // Send authorization roles and access token to user
        res.json({
            id, 
            firstname,
            lastname,
            email,
            roles, accessToken, refreshToken
        });
        console.log('foundUser', foundUser);
    } else {
        res.sendStatus(401);
    }
}
export { registerUser, handleLogin };
