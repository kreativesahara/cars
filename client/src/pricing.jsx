import Layout from "./components/Layout"

function pricing() {
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
                                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="px-4 py-1 text-sm bg-blue-100 rounded-full">Free</span>
                                    <h3 className="text-xl font-bold mt-4">Basic</h3>
                                    <p className="text-3xl font-bold mt-4">KSH 0<span className="text-sm font-normal">/month</span></p>
                                    <ul className="mt-6 space-y-4">
                                        <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Basic Features</li>
                                        <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Limited Storage</li>
                                        <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Community Support</li>
                                    </ul>
                                    <button className="w-full mt-8 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">Get Started</button>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <span className="px-4 py-1 text-sm bg-purple-100 rounded-full">Premium</span>
                                    <h3 className="text-xl font-bold mt-4">Pro</h3>
                                    <p className="text-3xl font-bold mt-4">KSH 3,480<span className="text-sm font-normal">/month</span></p>
                                    <ul className="mt-6 space-y-4">
                                        <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>All Basic Features</li>
                                        <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Unlimited Storage</li>
                                        <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Priority Support</li>
                                    </ul>
                                    <button className="w-full mt-8 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300">Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold mb-8">Sellers Tier</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <span className="px-4 py-1 text-sm bg-green-100 rounded-full">Free</span>
                                <h3 className="text-xl font-bold mt-4">Starter</h3>
                                <p className="text-3xl font-bold mt-4">KSH 0<span className="text-sm font-normal">/month</span></p>
                                <ul className="mt-6 space-y-4">
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Basic Listing</li>
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>3 Products</li>
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Basic Analytics</li>
                                </ul>
                                <button className="w-full mt-8 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300">Start Selling</button>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <span className="px-4 py-1 text-sm bg-orange-100 rounded-full">Limited</span>
                                <h3 className="text-xl font-bold mt-4">Growth</h3>
                                <p className="text-3xl font-bold mt-4">KSH 5,880<span className="text-sm font-normal">/month</span></p>
                                <ul className="mt-6 space-y-4">
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Advanced Listing</li>
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>25 Products</li>
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Full Analytics</li>
                                </ul>
                                <button className="w-full mt-8 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300">Start Selling</button>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-yellow-500">
                                <span className="px-4 py-1 text-sm bg-yellow-100 rounded-full">Premium</span>
                                <h3 className="text-xl font-bold mt-4">Enterprise</h3>
                                <p className="text-3xl font-bold mt-4">KSH 11,880<span className="text-sm font-normal">/month</span></p>
                                <ul className="mt-6 space-y-4">
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Custom Listing</li>
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Unlimited Products</li>
                                    <li className="flex items-center"><span className="material-symbols-outlined mr-2">check_circle</span>Priority Support</li>
                                </ul>
                                <button className="w-full mt-8 bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300">Start Selling</button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default pricing


