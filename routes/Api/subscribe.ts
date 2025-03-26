import { Router } from "express";
import { subscribe, getSubscriptions, updateSubscription, cancelSubscription } from '../../controllers/subscriptionController';

const router = Router();

// POST /subscriptions/subscribe -> Create a new subscription
router.post('/', subscribe);

// GET /subscriptions/:userId -> Get subscriptions for a user
router.get('/:userId', getSubscriptions);

// PATCH /subscriptions/update -> Update a subscription
router.patch('/update', updateSubscription);

// DELETE /subscriptions/cancel/:id -> Cancel a subscription
router.delete('/cancel/:id', cancelSubscription);

export default router;
