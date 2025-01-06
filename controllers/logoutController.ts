import { users } from '../db/schema/user';
import db from '../db/dbConfig';
import { eq } from 'drizzle-orm';
import { Request, Response } from 'express';


export const handleLogout = async (req:Request, res:Response) => {
    const authcookies = req.cookies;
    console.log('Cookies to delete :', authcookies)
    if (!authcookies?.refreshToken) return res.sendStatus(204); //No content
    const refreshToken = authcookies.refreshToken;
    // Is refreshToken in db?
    const foundUser= await db.    
        select().
        from(users).
        where(eq(users.refreshToken, refreshToken)).
        limit(1);
        
    if (!foundUser) {
        res.clearCookie('authorization', { 
            httpOnly: true, 
            sameSite: 'strict', 
            secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser[0].refreshToken = '';
    await db
        .update(users)
        .set({ refreshToken: refreshToken })
        .where(eq(users.refreshToken, refreshToken));

    res.clearCookie('refreshToken', { 
        httpOnly: true, 
        sameSite: 'none', 
        secure: true })
    .sendStatus(204);

    
}
