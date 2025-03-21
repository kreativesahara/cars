import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../Layout';
import { useProductContext } from '../../context/ProductProvider';
import { useSellerContext } from '../../context/SellerProvider';
import useAxiosPrivate from '../../api/useAxiosPrivate';

const UpdateProduct = () => {
    const { productId } = useParams();
    const { products } = useProductContext();
    const { sellers } = useSellerContext();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({});
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        setProduct(null);
        setSeller(null);
        setError(null);
        setIsLoading(true);

        const foundProduct = products.find((p) => p.id === Number(productId));
        if (foundProduct) {
            setProduct(foundProduct);
            setValues({ ...foundProduct });  // Initialize form values with product data
        } else {
            setError(new Error('Product not found'));
            setIsLoading(false);
        }
    }, [productId, products]);

    useEffect(() => {
        if (product) {
            const foundSeller = sellers.find((s) => s.userId === Number(product.seller_id));
            if (foundSeller) {
                setSeller(foundSeller);
            } else {
                setError(new Error('Seller not found'));
            }
            setIsLoading(false);
        }
    }, [product, sellers]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "mileage" || name === "price") {
            // Remove any non-numeric characters except for digits
            const rawValue = value.replace(/\D/g, "");
            setValues((prev) => ({
                ...prev,
                [name]: rawValue, // Store raw numeric value in state
            }));
        } else {
            setValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.put(`/products/${productId}`, values, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log("Product updated successfully:", response.data);
            alert("Product updated successfully");
        } catch (error) {
            console.error("Error updating product:", error.response?.data || error.message);
            alert("Failed to update product. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="container text-center p-20">Loading...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="container text-center p-20 text-red-500">
                    Error: {error.message}
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mt-6 -mx-1 -mt-2">
                <div className="w-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-2">
                    {product && seller && (
                        <div className="md:w-[600px] mx-auto">
                            <h1 className="text-4xl font-bold text-center mb-2 pb-6">Updating Vehicle</h1>
                            <form onSubmit={handleSubmit} className="w-full bg-white rounded-xl p-6 shadow-lg">
                                <div>
                                    <label className="text-sm text-neutral-900 mb-1">Vehicle ID</label>
                                    <input
                                        name="id"
                                        type="number"
                                        className="w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                        required
                                        value={product?.id}
                                        disabled
                                    />
                                </div>

                                {[
                                    {
                                        label: "Vehicle Make",
                                        name: "make",
                                        options: ["Toyota", "Nissan", "Honda", "Ford", "BMW"],
                                    },
                                    {
                                        label: "Vehicle Model",
                                        name: "model",
                                        options: ["Corolla", "Civic", "Ranger", "X5", "Altima"],
                                    },
                                    {
                                        label: "Fuel Type",
                                        name: "fuel_type",
                                        options: ["Petrol", "Diesel", "Hybrid", "Electric"],
                                    },
                                    {
                                        label: "Transmission",
                                        name: "transmission",
                                        options: ["Automatic", "Manual", "CVT"],
                                    },
                                    {
                                        label: "Car Condition",
                                        name: "condition",
                                        options: ["New", "Used", "Reconditioned"],
                                    },
                                    {
                                        label: "Driving System",
                                        name: "driveSystem",
                                        options: ["2WD", "4WD", "AWD"],
                                    },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label htmlFor={field.name} className="block text-sm text-neutral-900 mb-1">{field.label}</label>
                                        <select
                                            name={field.name}
                                            onChange={handleChange}
                                            required
                                            value={values[field.name] || ''}
                                            className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                        >
                                            <option value="">Select {field.label}</option>
                                            {field.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}

                                {[
                                    {
                                        label: "Year of Manufacture",
                                        name: "year",
                                        type: "number",
                                        placeholder: "Enter Year of Manufacture",
                                    },
                                    {
                                        label: "Engine Capacity CC",
                                        name: "engine_capacity",
                                        type: "number",
                                        placeholder: "Enter Engine Capacity",
                                    },
                                    {
                                        label: "Location",
                                        name: "location",
                                        type: "text",
                                        placeholder: "Enter Location",
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
                                            value={values[field.name] || ''}
                                            className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                        />
                                    </div>
                                ))}
                                <label className="block text-sm text-neutral-900 mb-1">Mileage</label>
                                <input
                                    name="mileage"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter Mileage in KM"
                                    required
                                    value={values.mileage ? Number(values.mileage).toLocaleString() : ""}
                                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                />
                                <label className="block text-sm text-neutral-900 mb-1">Price</label>
                                <input
                                    name="price"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter Price"
                                    required
                                    value={values.price? Number(values.price).toLocaleString() : ""}
                                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                />
                                <button type="submit" className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full">{`Edit Vehicle ID (${product.id})`}</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
