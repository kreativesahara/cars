import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from './components/Layout';
import { useProductContext } from './context/ProductProvider';
import { useSellerContext } from './context/SellerProvider';
// import UploadForm from './components/forms/uploadForm'

const updateProduct = () => {
    const { productId } = useParams();
    const { products } = useProductContext();

    console.log('Products from Pro Page :', products)
    const { sellers } = useSellerContext();
    const [product, setProduct] = useState(null);
    const [seller, setSeller] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({});
    useEffect(() => {
        // Reset state when productId changes
        setProduct(null);
        setSeller(null);
        setError(null);
        setIsLoading(true);

        // Find the product based on productId
        const foundProduct = products.find((p) => p.id === Number(productId));
        console.log('Product found :', foundProduct)
        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError(new Error('Product not found'));
            setIsLoading(false);
        }
    }, [productId, products]);

    useEffect(() => {
        if (product) {
            // Find the seller based on product.seller_id
            const foundSeller = sellers.find((s) => s.userId === Number(product.seller_id));
            console.log('Sellers from Pro Page :', sellers)
            if (foundSeller) {
                setSeller(foundSeller);
            } else {
                setError(new Error('Seller not found'));
            }
            setIsLoading(false);
        }
    }, [product, sellers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const previewUrls = [];

        for (const file of files) {
            const options = {
                maxSizeMB: 1,          // Maximum size in MB
                maxWidthOrHeight: 400, // Max width or height
                useWebWorker: true,
            };
            try {
                const compressedFile = await imageCompression(file, options);
                setImages((prev) => [...prev, compressedFile]);
                previewUrls.push(URL.createObjectURL(compressedFile));
            } catch (error) {
                console.error('Error while compressing image:', error);
                setImages((prev) => [...prev, file]); // Use original image if compression fails
                previewUrls.push(URL.createObjectURL(file));
            }
        }

        setPreview(previewUrls);
    };



    // if (isLoading) {
    //     return (
    //         <Layout>
    //             <div className="container text-center p-20">Loading...</div>
    //         </Layout>
    //     );
    // }

    // if (error) {
    //     return (
    //         <Layout>
    //             <div className="container text-center p-20 text-red-500">
    //                 Error: {error.message}
    //             </div>
    //         </Layout>
    //     );
    // }
    // Render content based on fetched bills
    return (
        <Layout >
            < div className="mt-8">
                <div className="w-auto min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-2">
                    <div className="md:w-[600px] mx-auto place-content-center">
                        <h1 className="text-4xl font-bold text-center mb-2 pb-6">Updating Vehicle</h1>
                        <form className="w-full bg-white rounded-xl p-6 shadow-lg">
                            <div>
                                <label className="block text-sm text-neutral-900 mb-1">User ID</label>
                                <input
                                    name="seller_id"
                                    onChange={handleChange}
                                    type="number"
                                    className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                    required
                                    // value={auth.id}
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

                            {[
                                {
                                    label: "Year of Manufacture",
                                    name: "year",
                                    type: "number",
                                    placeholder: "Enter Year of Manufacture",
                                    value: values.year,
                                },
                                {
                                    label: "Engine Capacity CC",
                                    name: "engine_capacity",
                                    type: "number",
                                    placeholder: "Enter Engine Capacity",
                                    value: values.engine_capacity,
                                },
                                {
                                    label: "Location",
                                    name: "location",
                                    type: "text",
                                    placeholder: "Enter Location",
                                    value: values.location,
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
                                        value={field.value}
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
                                value={values.price ? Number(values.price).toLocaleString() : ""}
                                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                            />

                            <label htmlFor="features" className="block text-sm text-neutral-900 mb-1">Features Description</label>
                            <textarea
                                name="features"
                                onChange={handleChange}
                                className="block w-full border border-neutral-300 rounded-md p-2 text-neutral-900"
                                placeholder="Describe the features of the Vehicle"
                                required
                                value={values.features}
                            />
                            <label className="block text-sm text-neutral-900 mb-1">Upload Images</label>
                            <div className="relative group h-64 w-full mb-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300 flex items-center justify-center overflow-hidden">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    required
                                />
                                {/* <div className="flex flex-col items-center justify-center transform group-hover:scale-95 transition-transform duration-300">
                                                        <span className="material-symbols-outlined text-5xl text-gray-400 group-hover:text-blue-500 mb-2">add_photo_alternate</span>
                                                        <p className="text-sm text-gray-500">Drag and drop your image here</p>
                                                        <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                                                        {preview.length > 0 && (
                                                            <div className="flex w-auto gap-3 mt-4">
                                                                {preview.map((src, index) => (
                                                                    <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-[80px] w-[80px] rounded-md object-cover" />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div> */}
                            </div>

                            <button type="submit" className="bg-black text-white rounded-md px-4 mt-4 py-2 text-sm w-full">Listing</button>
                        </form>
                    </div>
                </div>

                {/* </Link> */}

                {/* )} */}


                {/* } */}
            </div>
            {/* <UploadForm/> */}
        </Layout>
    )
}

export default updateProduct
