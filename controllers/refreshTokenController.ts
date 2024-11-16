import { users } from '../db/schema/user';
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';


export const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    console.log(req.cookies);
    // Check for cookies or JWT presence
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'Authorization token required' });
    }
    const refreshToken = cookies.jwt;
    const foundUser = await db.select().from(users).where(eq(users.refreshToken, refreshToken)).limit(1);

    // Check if user exists in DB
    if (foundUser.length === 0) return res.status(403).json({ message: 'User not found or token invalid.' });

    // Verify the JWT
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
        (err: any, decoded: any) => {
            if (err || foundUser[0].email !== decoded.email) {
                console.error("JWT verification error:", err?.message || 'User mismatch');
                return res.status(403).json({ message: 'Token invalid or expired.' });
            }

            // Extract roles and create new access token
           // const roles = Object.values(foundUser[0].role).filter(Boolean);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": decoded.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '60s' }
            );
            res.header('Authorization', accessToken)

            return res.status(200).json({ accessToken });
        }
    );
};
