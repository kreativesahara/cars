import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extending the Express Request interface to include a custom 'auth' property
declare module 'express-serve-static-core' {
    interface Request {
        auth?: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
            roles: string[];
        };
    }
}

// Middleware for verifying JWT and attaching user data to the request
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from Authorization header or cookie
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : req.cookies['authorization'];

        console.log('Token from Require Auth:', token);

        if (!token) {
            console.error('Authorization token missing');
            return res.status(401).json({ error: 'Authorization token required' });
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                    return res.status(403).json({ error: 'Invalid or expired token' });
                }

                if (!decoded.UserInfo || !decoded.UserInfo.email || !decoded.UserInfo.roles) {
                    console.error('Invalid token payload');
                    return res.status(403).json({ error: 'Invalid token payload' });
                }

                req.auth = {
                    id: decoded.UserInfo.id,
                    firstname: decoded.UserInfo.firstname,
                    lastname: decoded.UserInfo.lastname,
                    email: decoded.UserInfo.email,
                    roles: decoded.UserInfo.roles,
                };

                console.log('User authenticated:', req.auth);
                next();
            }
        );
    } catch (err) {
        console.error('Error in requireAuth middleware:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
