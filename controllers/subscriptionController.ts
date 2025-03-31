import { Request, Response } from 'express';
import db from '../db/dbConfig';
import { subscription } from '../db/schema/subscription';
import { eq, and } from 'drizzle-orm';
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
 * Helper to convert amount to a number.
 */
const parseAmount = (amount: any): number => {
    return parseFloat(amount);
};
// Define tier categories
const memberPlans = ['basic', 'pro'];
const sellerPlans = ['starter', 'growth', 'enterprise'];
/**
 * Create or upgrade a subscription.
 * This endpoint will:
 * - Reject a new subscription if an active one exists for the same user.
 * - If an active subscription exists:
 *    - Block creation if the new tier is the same as the current.
 *    - Block upgrade if a seller is trying to switch to a members tier.
 *    - Otherwise, only allow an upgrade if the new plan’s amount is higher.
 *
 * Endpoint: POST /subscriptions/subscribe
 */
export const subscribe = async (req: Request, res: Response) => {
    const { userId, planName, amount, currency } = req.body;
    const newPlanAmount = parseAmount(amount);
    const newPlanLower = planName.toLowerCase();
    const currentDate = new Date();
    try {
        // Check if user already has an active subscription
        const activeSubs = await db.select().from(subscription)
            .where(and(
                eq(subscription.userId, userId),
                eq(subscription.status, 'active')
            ));
        if (activeSubs.length > 0) {
            const currentSub = activeSubs[0];
            const currentPlanLower = currentSub.planName.toLowerCase();
            const currentAmount = parseAmount(currentSub.amount);
            // Prevent repetition of the same tier
            if (currentPlanLower === newPlanLower) {
                return res.status(400).json({
                    error: 'You already have an active subscription for this tier.'
                });
            }
            // Prevent seller from switching to a members tier
            if (sellerPlans.includes(currentPlanLower) && memberPlans.includes(newPlanLower)) {
                return res.status(400).json({
                    error: 'Sellers cannot override their subscription to a members tier.'
                });
            }
            // Only allow an upgrade if the new plan is higher-priced
            if (newPlanAmount > currentAmount) {
                // Reset startDate to now and recalc endDate from now
                const endDate = calculateEndDate(planName);
                await db.update(subscription)
                    .set({
                        planName,
                        amount,
                        currency,
                        startDate: currentDate,
                        endDate,
                        updatedAt: currentDate, // Explicitly update updatedAt
                    })
                    .where(eq(subscription.id, currentSub.id));
                return res.status(200).json({ message: 'Subscription upgraded successfully.' });
            } else {
                return res.status(400).json({
                    error: 'You can only upgrade to a higher tier than your current subscription.'
                });
            }
        } else {
            // No active subscription exists; create a new one
            const endDate = calculateEndDate(planName);
            const [newSubscription] = await db.insert(subscription)
                .values({
                    userId,
                    planName,
                    amount,
                    currency,
                    status: 'pending',
                    endDate,
                    startDate: currentDate, 
                    createdAt: currentDate,
                    updatedAt: currentDate,
                })
                .returning({id: subscription.id});
            return res.status(201).json({ message: 'Subscription created successfully.', subscription: newSubscription });
        }
    } catch (error) {
        console.error('Subscription creation error:', error);
        return res.status(500).json({ error: 'Failed to create subscription.' });
    }
};
/**
 * Update subscription details.
 * Similar checks are performed as in the subscribe endpoint.
 *
 * Endpoint: PATCH /subscriptions/update
 */
export const updateSubscription = async (req: Request, res: Response) => {
    const { id, planName, amount, currency, status } = req.body;
    const newPlanAmount = parseAmount(amount);
    const newPlanLower = planName ? planName.toLowerCase() : null;

    try {
        // Get the current subscription by id
        const currentSubArr = await db.select().from(subscription)
            .where(eq(subscription.id, id));
        if (currentSubArr.length === 0) {
            return res.status(404).json({ error: 'Subscription not found.' });
        }
        const currentSub = currentSubArr[0];
        const currentPlanLower = currentSub.planName.toLowerCase();
        const currentAmount = parseAmount(currentSub.amount);
        // Prevent update if the new tier is the same as the current tier
        if (newPlanLower && newPlanLower === currentPlanLower) {
            return res.status(400).json({
                error: 'You already have an active subscription for this tier and cannot override it.'
            });
        }
        // Prevent seller from updating to a members tier
        if (sellerPlans.includes(currentPlanLower) && newPlanLower && memberPlans.includes(newPlanLower)) {
            return res.status(400).json({
                error: 'Sellers cannot update their subscription to a members tier.'
            });
        }
        // Allow update only if the new amount is higher than the current amount
        if (newPlanAmount <= currentAmount) {
            return res.status(400).json({
                error: 'You can only update to a higher tier than your current subscription.'
            });
        }
        // Calculate new end date if planName is updated
        let newEndDate = currentSub.endDate;
        if (newPlanLower) {
            newEndDate = calculateEndDate(planName);
        }
        await db.update(subscription)
            .set({
                planName,
                amount,
                currency,
                status,
                endDate: newEndDate,
                updatedAt: new Date(),
            })
            .where(eq(subscription.id, id));
        res.json({ message: 'Subscription updated successfully.' });
    } catch (error) {
        console.error('Subscription update error:', error);
        res.status(500).json({ error: 'Failed to update subscription.' });
    }
};
/**
 * Get subscriptions for a user and check expiration status.
 *
 * Endpoint: GET /subscriptions/:userId
 */
export const getSubscriptions = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        // Fetch user's subscriptions
        const subscriptions = await db.select().from(subscription)
            .where(eq(subscription.userId, parseInt(userId)));

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this user.' });
        }
        const currentDate = new Date();
        // Process subscriptions: update expired ones and add a lastUpdated field
        for (const sub of subscriptions) {
            // Check for expired subscription and update status if needed
            if (sub.endDate && new Date(sub.endDate) < currentDate && sub.status === 'active') {
                await db.update(subscription)
                    .set({ status: 'expired', updatedAt: new Date() })
                    .where(eq(subscription.id, sub.id));
                sub.status = 'expired'; // update status locally
            }
        }
        return res.json({ subscriptions });
    } catch (error) {
        console.error('Fetch subscriptions error:', error);
        return res.status(500).json({ error: 'Failed to fetch subscriptions.' });
    }
};
/**
 * Cancel a subscription.
 *
 * Endpoint: DELETE /subscriptions/cancel/:id
 */
export const cancelSubscription = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.update(subscription)
            .set({ status: 'cancelled' })
            .where(eq(subscription.id, parseInt(id)));

        res.json({ message: 'Subscription cancelled successfully.' });
    } catch (error) {
        console.error('Subscription cancellation error:', error);
        res.status(500).json({ error: 'Failed to cancel subscription.' });
    }
};
/**
 * Check expired subscriptions and update their status (for cron jobs or admin use)
 */
export const checkExpiredSubscriptions = async () => {
    const now = new Date();
    // Find active subscriptions
    const activeSubs = await db.select().from(subscription)
        .where(eq(subscription.status, 'active'));
    for (const sub of activeSubs) {
        if (sub.endDate && new Date(sub.endDate) < now) {
            await db.update(subscription)
                .set({ status: 'expired' })
                .where(eq(subscription.id, sub.id));
        }
    }
    console.log('Expired subscriptions updated.');
};
