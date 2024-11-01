import { users } from '../db/schema/user';
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';


export const handleLogout = async (req:Request, res:Response) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;
    // Is refreshToken in db?
    const foundUser = await db.select().from(users).where(eq(users.refreshToken, refreshToken)).limit(1);
    if (!foundUser) {
        res.clearCookie('jwt', { 
            httpOnly: true, 
            sameSite: 'none', 
            secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser[0].refreshToken = '';
    await db
        .update(users)
        .set({ refreshToken: refreshToken })
        .where(eq(users.refreshToken, refreshToken));

    res.clearCookie('jwt', { 
        httpOnly: true, 
        sameSite: 'none', 
        secure: true })
    .sendStatus(204);

    
}
