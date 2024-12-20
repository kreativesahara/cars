import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extending the Express Request interface to include a custom 'auth' property
declare module 'express-serve-static-core' {
    interface Request {
        auth?: {
            user: string;
            roles: string[];
        };
    }
}

// Middleware for verifying JWT and attaching user data to the request
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the token from the Authorization cookie
        const authcookies = req.cookies['authorization'] || req.cookies.authorization as string;
        console.log('AuthCookies from Require Auth:', authcookies);
        if (!authcookies) {
            console.error('Authorization header missing or invalid');
            return res.status(401).json({ error: 'Authorization token required' });
        }
        const token = authcookies;
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                    return res.status(403).json({ error: 'Invalid or expired token' });
                }

                // Check if the decoded token contains the required fields
                if (!decoded.UserInfo || !decoded.UserInfo.email || !decoded.UserInfo.roles) {
                    console.error('Invalid token payload');
                    return res.status(403).json({ error: 'Invalid token payload' });
                }

                // Attach user information to the request object
                req.auth = {
                    user: decoded.UserInfo.email,
                    roles: decoded.UserInfo.roles,
                };

                console.log('User authenticated:', {
                    user: req.auth.user,
                    roles: req.auth.roles,
                });

                next();
            }
        );
    } catch (err) {
        console.error('Error in requireAuth middleware:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
