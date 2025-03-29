import React, { useState } from "react";
import { axiosPrivate } from "./api/axios";
import { useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import { subscriptionPlans } from "./data/subscriptionPlans";
import { SubscriptionCard } from "./components/cards/subscriptionCard";
// Define the Pricing component
function Pricing() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (plan) => {
        // Ensure the user is logged in
        if (!auth?.id) {
            alert("Please log in to subscribe.");
            navigate(!auth?.accessToken ? "/login" : "/product", { replace: true });
            return;
        }

        setLoading(true);
        const userId = auth.id;
        const amount = parseInt(
            plan.price.replace("KSH", "").replace(/,/g, "").trim(),
            10
        );

        let subscriptions = [];
        try {
            const { data } = await axiosPrivate.get(`subscriptions/${userId}`);
            subscriptions = data.subscriptions || [];
        } catch (error) {
            // If the error is a 404, treat it as "no subscription exists"
            if (error.response && error.response.status === 404) {
                subscriptions = [];
            } else {
                console.error("Subscription error:", error);
                alert("Subscription failed. Please try again.");
                setLoading(false);
                return;
            }
        }

        // If an active subscription exists, alert the user and exit early.
        if (subscriptions.length > 0) {
            const activeSub = subscriptions[0];
            alert(`You already have an active subscription: ${activeSub.planName}.`);
            setLoading(false);
            window.location.href = 'dashboard'
            return;
        }

        // If no subscription exists, create a new one.
        try {
            await axiosPrivate.post(
                "subscriptions",
                {
                    userId,
                    planName: plan.name,
                    amount,
                    currency: "KES",
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            alert(`Subscribed to ${plan.name} successfully!`);
        } catch (error) {
            console.error("Subscription error:", error);
            alert("Subscription failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout>
            <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-2">Pricing Plans</h1>
                    <p className="text-center mb-12 text-gray-600">Choose the perfect plan for your needs</p>
                    {loading && <p className="text-center">Processing your subscription...</p>}
                    <div className="grid md:grid-cols-1 gap-8 mb-16">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold">Members Tier</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {subscriptionPlans.members.map((plan, index) => (
                                    <SubscriptionCard key={index} plan={plan} onSubscribe={handleSubscribe} loading={loading} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold mb-8">Sellers Tier</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {subscriptionPlans.sellers.map((plan, index) => (
                                <SubscriptionCard key={index} plan={plan} onSubscribe={handleSubscribe} loading={loading} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default Pricing;
