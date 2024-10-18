import db from '../db/dbConfig'
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { users } from '../db/schema/user'; // Adjust the import path as necessary
//const jwt = require('jsonwebtoken');
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
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
// const handleLogin = async (req: Request, res: Response) => {
//     const { user, pwd } = req.body;
//     if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

//     const foundUser = await users.findOne({ username: user }).exec();
//     if (!foundUser) return res.sendStatus(401); //Unauthorized
//     // evaluate password
//     const match = await bcrypt.compare(pwd, foundUser.password);
//     if (match) {
//         const roles = Object.values(foundUser.roles).filter(Boolean);
//         // create JWTs
//         //TODO: change access token expire
//         const accessToken = jwt.sign(
//             {
//                 "UserInfo": {
//                     "username": foundUser.username,
//                     "roles": roles
//                 }
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '10s' },

//         );


//         const refreshToken = jwt.sign(
//             { "username": foundUser.username },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '1h' }
//         );
//         // Saving refreshToken with current user
//         foundUser.refreshToken = refreshToken;
//         const result = await foundUser.save();
//         console.log(result);
//         console.log(roles);

//         // Creates Secure Cookie with refresh token
//         res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
//         //sameSite: 'None',
//         //secure:true,
//         // Send authorization roles and access token to user
//         res.json({ roles, accessToken });

//     } else {
//         res.sendStatus(401);
//     }
// }
export { registerUser,
         //handleLogin
      };
