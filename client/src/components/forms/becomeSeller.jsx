import React, { useState } from 'react';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Layout from "../Layout"

const becomeSeller = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [values, setValues] = useState({
        username: '',
        accountType: '',
        contact: '',
        place: '',
        acceptsTradeIn: '',
        hasFinancing: '',
        userId: auth.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(values).forEach((key) => form.append(key, values[key]));
        // Logs form data to inspect what's being sent
        for (let pair of form.entries()) {
            console.log(pair[0], pair[1]);
        }
        try {
            // Send data without manually setting Content-Type header
            const response = await axiosPrivate.post('sellers', form, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log("Response from Seller controller:", response.data);
            alert("Seller Details uploaded successfully");
            // Reset form fields
            setValues({
                username: '',
                accountType: '',
                contact: '',
                place: '',
                acceptsTradeIn: '',
                hasFinancing: '',
            });
        } catch (error) {
            console.error("Error updating Member to Seller:", error.response?.data || error.message);
            alert("Failed to upgrade to Seller. Please try again.");
        }
    }
    return (
        <Layout>
            <div className="w-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-2">
                <div className="md:w-[600px] mx-auto place-content-center">
                    <h1 className="text-4xl font-bold text-center mb-2 pb-6">Upgrade to Seller</h1>
                    <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl p-6 shadow-lg">                       
                        {[
                            {
                                label: "User ID (Read Only)",
                                name: "user_id",
                                type: "number",
                                value: auth.id ,
                                disabled: true,
                            },
                            {
                                label: "Username / Company Name",
                                name: "username",
                                type: "text",
                                placeholder: "Enter Username or Company Name",
                                value: values.username,
                            },
                            {
                                label: "Contact Number",
                                name: "contact",
                                type: "text",
                                placeholder: "Enter Contact Number i.e 254706823590",
                                value: values.contact,
                            },
                            {
                                label: "Seller Location",
                                name: "place",
                                type: "text",
                                placeholder: "Enter Location i.e Nairobi, Karen",
                                value: values.place,
                            },

                        ].map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">{field.label}</label>
                                <input
                                    name={field.name}
                                    onChange={handleChange}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    required
                                    disabled={field.disabled}
                                    value={field.value}
                                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                />
                            </div>
                        ))}

                        {[
                            {
                                label: "Account Type",
                                name: "accountType",
                                options: ["Dealer", "Individual"],
                            },
                            {
                                label: "Accepting Trade In",
                                name: "acceptsTradeIn",
                                options: ["Yes", "No"],
                            },
                            {
                                label: "Allows Financing",
                                name: "hasFinancing",
                                options: ["Yes", "No"],
                            },

                        ].map((field) => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">{field.label}</label>
                                <select
                                    name={field.name}
                                    onChange={handleChange}
                                    required
                                    value={values[field.name]}
                                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.options.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        <button type="submit" className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full">Submit</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default becomeSeller