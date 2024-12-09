import { Request, Response, NextFunction } from 'express';

export const verifyRoles = (...allowedRoles: readonly number[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Check if roles are available in the request
            if (!req.auth?.roles) {
                console.error('Roles not found in request');
                return res.status(401).json({ error: 'Unauthorized: Missing roles' });
            }

            const rolesArray = Array.isArray(req.auth.roles) ? req.auth.roles.map(role => parseInt(role)) : [parseInt(req.auth.roles)];
            console.log('Allowed Roles:', allowedRoles);
            console.log('User Roles:', rolesArray);

            // Check if at least one user role matches the allowed roles
            const roleMatch = rolesArray.some(role => allowedRoles.includes(role));

            console.log('Role Match:', roleMatch);

            if (!roleMatch) {
                console.error('User roles do not match any allowed roles');
                return res.status(401).json({ error: 'Unauthorized: Role mismatch' });
            }

            next();
        } catch (error) {
            console.error('Error in verifyRoles middleware:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};
