import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {axiosPrivate} from './api/axios';
import FilterForm from './components/forms/filterForm';
import Layout from './components/Layout';
import { useProductContext } from './context/ProductProvider';

const ProductPage = () => {
    // Get products and setProducts from your ProductProvider context
    const { products, setProducts } = useProductContext();

    // Local filter state that can be passed to FilterForm
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        yearFrom: '',
        yearTo: '',
        priceMin: '',
        priceMax: '',
        fuelType: '',
        transmission: '',
        mileageRange: '',
        location: '',
        condition: '',
        driveSystem: '',
        engine_capacity: '',
        features: [],
    });

    // Callback to update products based on the cleaned filters
    const handleFilterSubmit = async (cleanedFilters) => {
        try {
            const response = await axiosPrivate.get('/filter', { params: cleanedFilters });
            console.log("Filtered Vehicles:", response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching filtered vehicles:", error);
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Vehicle Marketplace | Find Your Next Ride</title>
                <meta
                    name="description"
                    content="Browse and filter through a wide range of vehicles. Find your next ride with detailed specs, competitive pricing, and a user-friendly experience."
                />
                <meta
                    name="keywords"
                    content="vehicles, cars, marketplace, filter, used cars, new cars, auto"
                />
            </Helmet>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Pass filters, setFilters, and onFilterSubmit to FilterForm */}
                <FilterForm
                    filters={filters}
                    setFilters={setFilters}
                    onFilterSubmit={handleFilterSubmit}
                />
                <div className="mt-8">
                    {!products.length ? (
                        <p>No product to display</p>
                    ) : (
                        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <li key={product.id}>
                                    <Link to={`/itempage/${product.make}-${product.model}-${product.id}`}>
                                        <div className="border shadow-lg rounded-xl hover:shadow-blue-300 cursor-pointer">
                                            <figure>
                                                <img
                                                    // src={product?.images[0]}
                                                    alt={`${product?.make} ${product?.model} in ${product?.location}`}
                                                    loading="lazy"
                                                    width="440"
                                                    height="300"
                                                    className="w-full bg-slate-500 rounded shadow-lg opacity-75 hover:opacity-100"
                                                />
                                            </figure>
                                            <div className="p-2">
                                                <div className="flex justify-between border-b-2 py-1.5">
                                                    <h3 className="uppercase text-xs">{product?.make}</h3>
                                                    <data className="border-2 border-dashed border-blue-600 rounded-3xl px-2 text-xs">
                                                        {product?.year}
                                                    </data>
                                                </div>
                                                <ul className="border-b py-2">
                                                    <li className="text-xs">
                                                        <span className="card-item-text font-bold">
                                                            Model: {product?.model}
                                                        </span>
                                                    </li>
                                                    <li className="text-xs">
                                                        <span className="card-item-text font-bold">
                                                            Condition: {product?.condition}
                                                        </span>
                                                    </li>
                                                    <li className="text-xs">
                                                        <span className="card-item-text font-bold">
                                                            Location: {product?.location}
                                                        </span>
                                                    </li>
                                                </ul>
                                                <div className="flex gap-1.5 py-2">
                                                    <span className="font-bold">KSH</span>
                                                    <span className="font-bold">
                                                        {product?.price ? Number(product.price).toLocaleString() : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProductPage;
