// A reusable card component for each subscription plan

export const SubscriptionCard = ({ plan, onSubscribe, loading }) => (
    <div
        className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${plan.border || ""
            }`}
    >
        <span className={`px-4 py-1 text-sm ${plan.bgColor || ''} rounded-full`}>
            {plan?.tier}
        </span>
        <h3 className="text-xl font-bold mt-4">{plan.name}</h3>
        <p className="text-3xl font-bold mt-4">
            {plan?.price}
            <span className="text-sm font-normal">{plan.period}</span>
        </p>
        <ul className="mt-6 space-y-4">
            {plan?.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                    <span className="material-symbols-outlined mr-2">check_circle</span>
                    {feature}
                </li>
            ))}
        </ul>
        <button
            className={`w-full mt-8 text-white py-3 rounded-lg transition-colors duration-300 ${plan.btnColor}`}
            onClick={() => onSubscribe(plan)}
            disabled={loading}
        >
            {plan.btnText}
        </button>
    </div>
);