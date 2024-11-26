import { users } from '../db/schema/user';
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        console.log('Cookies:', cookies);

        // Check if JWT cookie is present
        if (!cookies?.jwt) {
            console.error('Missing refresh token cookie');
            return res.status(401).json({ message: 'Authorization token required' });
        }

        const refreshToken = cookies.jwt;

        // Fetch user with matching refresh token
        const foundUser = await db.select()
            .from(users)
            .where(eq(users.refreshToken, refreshToken))
            .limit(1);

        if (foundUser.length === 0) {
            console.error('Refresh token does not match any user');
            return res.status(403).json({ message: 'User not found or token invalid.' });
        }

        // Verify the refresh token
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET as string,
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                    return res.status(403).json({ message: 'Token invalid or expired.' });
                }

                // Validate the decoded token matches the user
                const userEmail = foundUser[0].email;
                if (userEmail !== decoded.email) {
                    console.error('Token email mismatch');
                    return res.status(403).json({ message: 'Token email mismatch.' });
                }

                // Generate new access token
                const accessToken = jwt.sign(
                    {
                        UserInfo: {
                            email: userEmail,
                            roles: foundUser[0].roles,
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET as string,
                    { expiresIn: '60s' } // Adjust expiration as needed
                );

                console.log('New access token generated for:', userEmail);

                // Optionally set the access token in headers or cookies
                res.header('Authorization', ` ${accessToken}`);
                return res.status(200).json({ accessToken });
            }
        );
    } catch (error) {
        console.error('Error in handleRefreshToken:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
