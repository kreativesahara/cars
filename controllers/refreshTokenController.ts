import { user } from '../db/schema/user';
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        // Extract the token from the Authorization cookie
        const authcookies = req.cookies;
        console.log('AuthCookie from handle Refresh:', authcookies);
        if (!authcookies?.refreshToken) {
            console.error('missing refresh cookies:', authcookies);
            return res.status(401).json({ error: 'Refresh token required' });
        }

        const refreshToken = authcookies.refreshToken;
        // Fetch user with matching refresh token
        const foundUser = await db.select()
            .from(user)
            .where(eq(user.refreshToken, refreshToken))
            .limit(1);
        console.log('Found user:', foundUser);
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
                const userEmail = foundUser[0].email;

                if (userEmail !== decoded.email) {
                    console.error('Token email mismatch:', { tokenEmail: decoded.email, dbEmail: userEmail });
                    return res.status(403).json({ message: 'Token email mismatch.' });
                }

                // Generate new access token
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            id: foundUser[0].id,
                            firstname: foundUser[0].firstname,
                            lastname: foundUser[0].lastname,
                            email: userEmail,
                            roles: foundUser[0].roles,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET as string,
                    { expiresIn: '1d' }
                );
                
                //Set access token as a cookie in the response
                res.header('authorization', accessToken);
                return res.status(200).json({
                    id: foundUser[0].id,
                    firstname: foundUser[0].firstname,
                    lastname: foundUser[0].lastname,
                    email: userEmail,
                    roles: foundUser[0].roles,
                    accessToken, 
                    });
            }
        );
    } catch (error) {
        console.error('Error in handleRefreshToken:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
