import { Request, Response } from 'express';
import  db  from '../db/dbConfig';
import { subscription } from '../db/schema/subscription';
import { eq } from 'drizzle-orm';

/**
 * Create a new subscription
 * Endpoint: POST /subscriptions/subscribe
 */
export const subscribe = async (req: Request, res: Response) => {
    const { userId, planName, amount, currency, endDate } = req.body;
    try {
        const [newSubscription] = await db.insert(subscription)
            .values({
                userId,
                planName,
                amount,
                currency,
                status: 'active',
                endDate: endDate ? new Date(endDate) : null,
            })
            .$returningId();

        res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
    } catch (error) {
        console.error('Subscription creation error:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
};

/**
 * Get subscriptions for a user
 * Endpoint: GET /subscriptions/:userId
 */
export const getSubscriptions = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const subscriptions = await db.select().from(subscription)
            .where(eq(subscription.userId, parseInt(userId)));

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this user' });
        }

        res.json({ subscriptions });
    } catch (error) {
        console.error('Fetch subscriptions error:', error);
        res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }
};

/**
 * Update subscription details
 * Endpoint: PATCH /subscriptions/update
 */
export const updateSubscription = async (req: Request, res: Response) => {
    const { id, planName, amount, currency, status, endDate } = req.body;
    try {
        await db.update(subscription)
            .set({
                planName,
                amount,
                currency,
                status,
                endDate: endDate ? new Date(endDate) : null,
            })
            .where(eq(subscription.id, id));

        res.json({ message: 'Subscription updated successfully' });
    } catch (error) {
        console.error('Subscription update error:', error);
        res.status(500).json({ error: 'Failed to update subscription' });
    }
};

/**
 * Cancel a subscription
 * Endpoint: DELETE /subscriptions/cancel/:id
 */
export const cancelSubscription = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.update(subscription)
            .set({ status: 'cancelled' })
            .where(eq(subscription.id, parseInt(id)));

        res.json({ message: 'Subscription cancelled successfully' });
    } catch (error) {
        console.error('Subscription cancellation error:', error);
        res.status(500).json({ error: 'Failed to cancel subscription' });
    }
};
