import { Request, Response } from 'express';
import db from "../db/dbConfig";
import { sendEmail } from "../utils/sendEmail";
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { user } from '../db/schema/user'; // Import the user model
import bcrypt from 'bcrypt';

export const requestPasswordReset = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        const foundUser = await db
            .select().from(user).where(eq(user.email, email)).limit(1);
        if (foundUser.length === 0) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found." });
        }
        // Generate a secure reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

        // Update the user record with the reset token
        await db
            .update(user)
            .set({ resetToken, resetTokenExpiry })
            .where(eq(user.email, email));

        // Construct reset link
        const resetLink = `http://localhost:5173/new-password?token=${resetToken}`;

        // Send the password reset email
        await sendEmail({
            from: process.env.AUTH_EMAIL as string,
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        });

        res.json({ message: "Password reset email sent." });
    } catch (error) {
        console.error("Error in requestPasswordReset:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
};


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;
        console.log('token from the request', token)
        // Validate request payload
        if (!token || !newPassword) {
            return res.status(400).json({ message: "Invalid request. Token and new password are required." });
        }

        // Retrieve the user based on the provided token
        const foundUser = await db.select().from(user).where(eq(user.resetToken, token)).limit(1);
        if (foundUser.length === 0) {
            return res.status(400).json({ message: "Invalid token." });
        }

        const userRecord = foundUser[0];

        // Check token expiry (also ensure the expiry exists)
        // if (!userRecord.resetTokenExpiry || new Date(userRecord.resetTokenExpiry) < new Date()) {
        //     return res.status(400).json({ message: "Token has expired." });
        // }

        // (Optional) Validate password strength here if needed
        // if (!isStrongPassword(newPassword)) {
        //    return res.status(400).json({ message: "Password does not meet strength requirements." });
        // }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the user's password and remove reset token details
        await db
            .update(user)
            .set({
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            })
            .where(eq(user.id, userRecord.id));
        res.json({ message: "Password reset successful. You can now log in with your new password." });
    } catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json({ message: "An error occurred while resetting your password. Please try again later." });
    }
};


