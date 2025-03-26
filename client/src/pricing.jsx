import Layout from "./components/Layout";

const pricingPlans = {
    members: [
        {
            tier: "Free",
            name: "Basic",
            price: "KSH 0",
            period: "/month",
            features: ["Basic Features", "Limited Storage", "Community Support"],
            bgColor: "bg-blue-100",
            btnColor: "bg-blue-500 hover:bg-blue-600",
            btnText: "Get Started"
        },
        {
            tier: "Premium",
            name: "Pro",
            price: "KSH 3,480",
            period: "/month",
            features: ["All Basic Features", "Unlimited Storage", "Priority Support"],
            bgColor: "bg-purple-100",
            btnColor: "bg-purple-500 hover:bg-purple-600",
            btnText: "Get Started"
        }
    ],
    sellers: [
        {
            tier: "Free",
            name: "Starter",
            price: "KSH 0",
            period: "/month",
            features: ["Basic Listing", "3 Products", "Basic Analytics"],
            bgColor: "bg-green-100",
            btnColor: "bg-green-500 hover:bg-green-600",
            btnText: "Start Selling"
        },
        {
            tier: "Limited",
            name: "Growth",
            price: "KSH 5,880",
            period: "/month",
            features: ["Advanced Listing", "25 Products", "Full Analytics"],
            bgColor: "bg-orange-100",
            btnColor: "bg-orange-500 hover:bg-orange-600",
            btnText: "Start Selling"
        },
        {
            tier: "Premium",
            name: "Enterprise",
            price: "KSH 11,880",
            period: "/month",
            features: ["Custom Listing", "Unlimited Products", "Priority Support"],
            bgColor: "bg-yellow-100",
            btnColor: "bg-yellow-500 hover:bg-yellow-600",
            border: "border-2 border-yellow-500",
            btnText: "Start Selling"
        }
    ]
};

function Pricing() {
    return (
        <Layout>
            <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-2">Pricing Plans</h1>
                    <p className="text-center mb-12 text-gray-600">Choose the perfect plan for your needs</p>

                    <div className="grid md:grid-cols-1 gap-8 mb-16">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold">Members Tier</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {pricingPlans.members.map((plan, index) => (
                                    <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${plan.border || ''}`}>
                                        <span className={`px-4 py-1 text-sm ${plan.bgColor} rounded-full`}>{plan.tier}</span>
                                        <h3 className="text-xl font-bold mt-4">{plan.name}</h3>
                                        <p className="text-3xl font-bold mt-4">{plan.price}<span className="text-sm font-normal">{plan.period}</span></p>
                                        <ul className="mt-6 space-y-4">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-center">
                                                    <span className="material-symbols-outlined mr-2">check_circle</span>{feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <button className={`w-full mt-8 text-white py-3 rounded-lg transition-colors duration-300 ${plan.btnColor}`}>{plan.btnText}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold mb-8">Sellers Tier</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {pricingPlans.sellers.map((plan, index) => (
                                <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${plan.border || ''}`}>
                                    <span className={`px-4 py-1 text-sm ${plan.bgColor} rounded-full`}>{plan.tier}</span>
                                    <h3 className="text-xl font-bold mt-4">{plan.name}</h3>
                                    <p className="text-3xl font-bold mt-4">{plan.price}<span className="text-sm font-normal">{plan.period}</span></p>
                                    <ul className="mt-6 space-y-4">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center">
                                                <span className="material-symbols-outlined mr-2">check_circle</span>{feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className={`w-full mt-8 text-white py-3 rounded-lg transition-colors duration-300 ${plan.btnColor}`}>{plan.btnText}</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default Pricing;
