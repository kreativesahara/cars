import { users } from '../db/schema/user';
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        // Extract the token from the Authorization cookie
        const authcookies = req.cookies;
        console.log('AuthCookies:', authcookies);
        if (!authcookies?.authorization) {
            console.error('missing authorization cookie');
            return res.status(401).json({ error: 'Authorization token required' });
        }


        const refreshToken = authcookies.refreshToken;

        // Fetch user with matching refresh token
        const foundUser = await db.select()
            .from(users)
            .where(eq(users.refreshToken, refreshToken))
            .limit(1);

        if (foundUser.length === 0) {
            console.error('Refresh token does not match any user:', refreshToken);
            return res.status(403).json({ message: 'User not found or token invalid.' });
        }

        // Verify the refresh token
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                    console.error('Failed token:', refreshToken);
                    return res.status(403).json({ message: 'Token invalid or expired.' });
                }
                console.log('Decoded token:', decoded);

                // Validate the decoded token matches the user
                const userId = foundUser[0].id;
                const userFname = foundUser[0].firstname;
                const userLname = foundUser[0].lastname;
                const userEmail = foundUser[0].email;
                const userRoles = foundUser[0].roles;

                if (userEmail !== decoded.email) {
                    console.error('Token email mismatch:', { tokenEmail: decoded.email, dbEmail: userEmail });
                    return res.status(403).json({ message: 'Token email mismatch.' });
                } else if (userRoles !== decoded.roles) {
                    console.error('Token roles mismatch:', { tokenRoles: decoded.roles, dbRoles: userRoles });
                    return res.status(403).json({ message: 'Token roles mismatch.' });
                }

                // Generate new access token
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            id: userId,
                            firstname: userFname,
                            lastname: userLname,
                            email: userEmail,
                            roles: userRoles,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET as string,
                    { expiresIn: '2h' }
                );

                
                //Set access token as a cookie in the response
                res.cookie('authorization', accessToken,
                    {
                        httpOnly: true,
                        sameSite: 'strict',
                        //secure: true, 
                        maxAge: 24 * 60 * 60 * 1000
                    }
                );
                return res.status(200).json({ id: userId, firstname: userFname, lastname: userLname, email: userEmail, roles: userRoles, accessToken });
            }
        );
    } catch (error) {
        console.error('Error in handleRefreshToken:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
