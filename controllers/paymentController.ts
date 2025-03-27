import { Request, Response } from "express";
import db from "../db/dbConfig";
import { payment } from "../db/schema/payment";
import { subscription } from "../db/schema/subscription";
import { eq } from "drizzle-orm";
// import { processMpesaPayment, verifyMpesaPayment } from "../services/mpesa";
// import { processStripePayment, verifyStripePayment } from "../services/stripe";
// import { processPayPalPayment, verifyPayPalPayment } from "../services/paypal";

/**
 * Initiate a Payment
 * Endpoint: POST /payments/initiate
 */
export const initiatePayment = async (req: Request, res: Response) => {
    const { userId, subscriptionId, amount, currency, paymentMethod } = req.body;
    // Example request body
    // {
    //     "userId": 181,
    //     "subscriptionId": 100,
    //     "amount": 0,
    //     "currency": "KES",
    //     "paymentMethod": "mpesa"
    // }
    const currentDate = new Date();

    try {
        let txnId="abcde";
        // switch (paymentMethod.toLowerCase()) {
        //     case "mpesa":
        //         txnId = await processMpesaPayment(userId, amount);
        //         break;
        //     case "stripe":
        //         txnId = await processStripePayment(userId, amount, currency);
        //         break;
        //     case "paypal":
        //         txnId = await processPayPalPayment(userId, amount, currency);
        //         break;
        //     default:
        //         return res.status(400).json({ error: "Unsupported payment method." });
        // }

        // Store payment record
        const [paymentRecord] = await db.insert(payment).values({
            userId,
            subscriptionId,
            amount,
            currency,
            paymentMethod,
            txnId,
            status: "pending",
            createdAt: currentDate,
            updatedAt: currentDate
        }).$returningId();

        res.status(201).json({ message: "Payment initiated", txnId, paymentId: paymentRecord });
    } catch (error) {
        console.error("Payment initiation error:", error);
        res.status(500).json({ error: "Payment initiation failed." });
    }
};

/**
 * Verify Payment
 * Endpoint: POST /payments/verify
 */
export const verifyPayment = async (req: Request, res: Response) => {
    const { txnId, paymentMethod } = req.body;
    try {
        let paymentStatus = "successful";
        // switch (paymentMethod.toLowerCase()) {
        //     case "mpesa":
        //         paymentStatus = await verifyMpesaPayment(txnId);
        //         break;
        //     case "stripe":
        //         paymentStatus = await verifyStripePayment(txnId);
        //         break;
        //     case "paypal":
        //         paymentStatus = await verifyPayPalPayment(txnId);
        //         break;
        //     default:
        //         return res.status(400).json({ error: "Unsupported payment method." });
        // }

        if (paymentStatus === "successful") {
            await db.update(payment).set({ status: "successful" }).where(eq(payment.txnId, txnId));
            res.status(200).json({ message: "Payment verified successfully." });
        } else {
            res.status(400).json({ error: "Payment verification failed." });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Failed to verify payment." });
    }
};

/**
 * Webhook Handler for Payment Providers
 * Endpoint: POST /payments/webhook
 */
export const paymentWebhook = async (req: Request, res: Response) => {
    const { txnId, paymentMethod, status } = req.body;
    // Expected payload example:
    // {
    //   "txnId": "abc123",
    //   "paymentMethod": "mpesa",
    //   "status": "successful"
    // }

    try {
        if (status !== "successful") {
            return res.status(400).send("Invalid payment status received.");
        }

        // Update the payment record with the latest status (and optionally paymentMethod)
        await db.update(payment)
            .set({ status, paymentMethod })
            .where(eq(payment.txnId, txnId));

        // Retrieve the updated payment record to get the associated subscriptionId
        const paymentRecords = await db.select().from(payment).where(eq(payment.txnId, txnId));
        if (paymentRecords.length === 0) {
            return res.status(404).send("Payment record not found.");
        }

        const subId = paymentRecords[0].subscriptionId;
        if (!subId) {
            return res.status(400).send("Subscription ID missing in payment record.");
        }

        // Update the corresponding subscription:
        // - Set status to active
        // - Attach txnId for reference
        // - Update the updatedAt timestamp
        await db.update(subscription)
            .set({ status: "active", txnId, updatedAt: new Date() })
            .where(eq(subscription.id, subId));

        return res.status(200).send("Payment and subscription status updated.");
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(500).send("Webhook processing failed.");
    }
};
