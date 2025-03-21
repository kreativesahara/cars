import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Select from 'react-select'; // Import react-select for searchable dropdowns
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

    // States for react-select and API-loaded options
    const [makeOptions, setMakeOptions] = useState([]);
    const [modelOptions, setModelOptions] = useState([]);
    const [makeSelectValue, setMakeSelectValue] = useState(null);
    const [modelSelectValue, setModelSelectValue] = useState(null);

    // Fetch vehicle makes and models from the external API on mount
    useEffect(() => {
        async function fetchVehicleData() {
            try {
                const response = await fetch(
                    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=100'
                );
                const data = await response.json();
                const results = data.results || [];
                // Extract unique makes and models
                const uniqueMakes = Array.from(new Set(results.map(item => item.make)));
                const uniqueModels = Array.from(new Set(results.map(item => item.model)));
                // Additional custom items to include
                const additionalItems = {
                    makes: ['Chevrolet', 'Mercedes', 'Audi'],
                    models: ['Accord LX', 'Mustang GT', 'A4', 'Premio', 'C200']
                };
                const mergedMakes = Array.from(new Set([...uniqueMakes, ...additionalItems.makes]));
                const mergedModels = Array.from(new Set([...uniqueModels, ...additionalItems.models]));

                setMakeOptions(mergedMakes);
                setModelOptions(mergedModels);
            } catch (error) {
                console.error("Error fetching vehicle data:", error);
            }
        }
        fetchVehicleData();
    }, []);
    useEffect(() => {
        setProduct(null);
        setSeller(null);
        setError(null);
        setIsLoading(true);

        const foundProduct = products.find((p) => p.id === Number(productId));
        if (foundProduct) {
            setProduct(foundProduct);
            setValues({ ...foundProduct });
            // Initialize react-select fields if product data exists
            setMakeSelectValue(foundProduct.make ? { value: foundProduct.make, label: foundProduct.make } : null);
            setModelSelectValue(foundProduct.model ? { value: foundProduct.model, label: foundProduct.model } : null);
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
            const rawValue = value.replace(/\D/g, "");
            setValues((prev) => ({
                ...prev,
                [name]: rawValue,
            }));
        } else {
            setValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const handleMakeSelectChange = (selectedOption) => {
        setMakeSelectValue(selectedOption);
        setValues(prev => ({
            ...prev,
            make: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleModelSelectChange = (selectedOption) => {
        setModelSelectValue(selectedOption);
        setValues(prev => ({
            ...prev,
            model: selectedOption ? selectedOption.value : ''
        }));
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
    const makeSelectOptions = makeOptions.map(make => ({ value: make, label: make }));
    const modelSelectOptions = modelOptions.map(model => ({ value: model, label: model }));
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

                                {/* Vehicle Make using react-select */}
                                <div className="mt-4">
                                    <label htmlFor="make" className="block text-sm text-neutral-900 mb-1">Vehicle Make</label>
                                    <Select
                                        name="make"
                                        value={makeSelectValue}
                                        onChange={handleMakeSelectChange}
                                        options={makeSelectOptions}
                                        placeholder="Select or search vehicle make"
                                        isClearable
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="model" className="block text-sm text-neutral-900 mb-1">Vehicle Model</label>
                                    <Select
                                        name="model"
                                        value={modelSelectValue}
                                        onChange={handleModelSelectChange}
                                        options={modelSelectOptions}
                                        placeholder="Select or search vehicle model"
                                        isClearable
                                    />
                                </div>
                                {[
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
                                    <div key={field.name} className="mt-4">
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
                                    <div key={field.name} className="mt-4">
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
                                <div className="mt-4">
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
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm text-neutral-900 mb-1">Price</label>
                                    <input
                                        name="price"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter Price"
                                        required
                                        value={values.price ? Number(values.price).toLocaleString() : ""}
                                        className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                    />
                                </div>
                                <button type="submit" className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full">
                                    {`Edit Vehicle ID (${product.id})`}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
