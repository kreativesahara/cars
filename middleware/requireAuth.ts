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

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decoded: any) => {
            if (err) return res.sendStatus(403); // Invalid token

            // Set decoded values in a custom `auth` property on the request object
            req.auth = {
                user: decoded.UserInfo.email,
                roles: decoded.UserInfo.roles
            };

            next();
        }
    );
};
