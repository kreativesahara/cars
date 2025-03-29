import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Layout from "../Layout";

const BecomeSeller = () => {
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

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Remove image by clearing the state
    const removeImage = () => {
        setImage(null);
        setPreview('');
    };

    // Handle image change with compression for a single image
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 400,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(file, options);
            setImage(compressedFile);
            setPreview(URL.createObjectURL(compressedFile));
        } catch (error) {
            console.error('Error while compressing image:', error);
            // If compression fails, use the original file
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
        // Reset the input value so the same file can be re-selected if needed
        e.target.value = null;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(values).forEach((key) => form.append(key, values[key]));
        if (image) {
            form.append('image', image); // Append the image file
        }
        // Debug: Log FormData content (File objects may not fully display in the console)
        for (let pair of form.entries()) {
            console.log(pair[0], pair[1]);
        }
        try {
            const response = await axiosPrivate.post('sellers', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            console.log("Response from Seller controller:", response.data);
            alert("Seller Details uploaded successfully");
            // Reset state
            setValues({
                username: '',
                accountType: '',
                contact: '',
                place: '',
                acceptsTradeIn: '',
                hasFinancing: '',
                userId: auth.id
            });
            setImage(null);
            setPreview('');
        } catch (error) {
            console.error("Error updating Member to Seller:", error.response?.data || error.message);
            alert("Failed to upgrade to Seller. Please try again.");
        }
    };

    return (
        <Layout>
            <div className="w-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-2">
                <div className="md:w-[600px] mx-auto place-content-center">
                    <h1 className="text-4xl font-bold text-center mb-2 pb-6">Upgrade to Seller</h1>
                    <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl p-6 shadow-lg">

                        {/* Input Fields */}
                        {[
                            { label: "User ID (Read Only)", name: "userId", type: "number", value: auth.id, disabled: true },
                            { label: "Username / Company Name", name: "username", type: "text", placeholder: "Enter Username or Company Name", value: values.username },
                            { label: "Contact Number", name: "contact", type: "text", placeholder: "Enter Contact Number i.e 254706823590", value: values.contact },
                            { label: "Seller Location", name: "place", type: "text", placeholder: "Enter Location i.e Nairobi, Karen", value: values.place },
                        ].map((field) => (
                            <div key={field.name} className="mb-4">
                                <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">
                                    {field.label}
                                </label>
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

                        {/* Select Fields */}
                        {[
                            { label: "Account Type", name: "accountType", options: ["Dealer", "Individual"] },
                            { label: "Accepting Trade In", name: "acceptsTradeIn", options: ["Yes", "No"] },
                            { label: "Allows Financing", name: "hasFinancing", options: ["Yes", "No"] },
                        ].map((field) => (
                            <div key={field.name} className="mb-4">
                                <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">
                                    {field.label}
                                </label>
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

                        <div className="mt-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Photo
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center hover:border-primary-400 transition-all duration-300">
                                <span className="material-symbols-outlined text-5xl text-gray-400 mb-2">
                                    add_photo_alternate
                                </span>
                                <p className="text-sm text-gray-500 mb-4">
                                    Drag & drop your image here, or click to select a file
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="bg-black text-white px-4 py-2 rounded-lg font-medium cursor-pointer animate-bounce duration-100"
                                >
                                    Select an Image
                                </label>
                                <p className="text-xs text-gray-400 mt-2">
                                    Your image will be automatically compressed to 1MB
                                </p>
                            </div>

                            {preview && (
                                <div className="mt-4 relative bg-white border border-gray-200 rounded-lg p-2 shadow-sm group inline-block">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                                    >
                                        <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default BecomeSeller;
