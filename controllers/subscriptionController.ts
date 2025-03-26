import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { subscription } from '../db/schema/subscription';
import { eq, and, lt } from 'drizzle-orm';

/**
 * Function to determine subscription end date based on plan name
 */
const calculateEndDate = (planName: string): Date => {
    const startDate = new Date();
    switch (planName.toLowerCase()) {
        case 'basic':
        case 'pro':
            startDate.setDate(startDate.getDate() + 30); // 1 month
            break;
        case 'enterprise':
            startDate.setFullYear(startDate.getFullYear() + 1); // 1 year
            break;
        default:
            startDate.setDate(startDate.getDate() + 30); // Default to 30 days
    }
    return startDate;
};

/**
 * Create a new subscription
 * Endpoint: POST /subscriptions/subscribe
 */
export const subscribe = async (req: Request, res: Response) => {
    const { userId, planName, amount, currency } = req.body;

    try {
        const endDate = calculateEndDate(planName);

        const [newSubscription] = await db.insert(subscription)
            .values({
                userId,
                planName,
                amount,
                currency,
                status: 'active',
                endDate,
                createdAt: new Date(),
            })
            .$returningId();

        res.status(201).json({ message: 'Subscription created successfully', subscription: newSubscription });
    } catch (error) {
        console.error('Subscription creation error:', error);
        res.status(500).json({ error: 'Failed to create subscription' });
    }
};

/**
 * Get subscriptions for a user and check expiration status
 * Endpoint: GET /subscriptions/:userId
 */
export const getSubscriptions = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        // Fetch user's subscriptions
        const subscriptions = await db.select().from(subscription)
            .where(eq(subscription.userId, parseInt(userId)));

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this user' });
        }

        // Check for expired subscriptions and update status
        const currentDate = new Date();
        for (const sub of subscriptions) {
            if (sub.endDate && new Date(sub.endDate) < currentDate && sub.status === 'active') {
                await db.update(subscription)
                    .set({ status: 'expired' })
                    .where(eq(subscription.id, sub.id));
                sub.status = 'expired'; // Update status locally before returning
            }
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
    const { id, planName, amount, currency, status } = req.body;

    try {
        let endDate;
        if (planName) {
            endDate = calculateEndDate(planName);
        }

        await db.update(subscription)
            .set({
                planName,
                amount,
                currency,
                status,
                endDate: endDate || null,
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
export const checkExpiredSubscriptions = async () => {
    const now = new Date();

    // Find expired subscriptions
    const expiredSubscriptions = await db.select().from(subscription).where(
        eq(subscription.status, 'active') // Only check active ones
    );

    for (const sub of expiredSubscriptions) {
        if (sub.endDate && new Date(sub.endDate) < now) {
            await db.update(subscription)
                .set({ status: 'expired' })
                .where(eq(subscription.id, sub.id));
        }
    }

    console.log('Expired subscriptions updated.');
};