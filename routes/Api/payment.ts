import express from "express";
import { initiatePayment, verifyPayment, paymentWebhook } from '../../controllers/paymentController';

const router = express.Router();

// Initiate a payment
router.post("/initiate", initiatePayment);

// Verify a payment
router.post("/verify", verifyPayment);

// Payment Webhook (for asynchronous updates)
router.post("/webhook", paymentWebhook);

export default router;
