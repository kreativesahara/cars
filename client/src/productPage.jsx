import React, { useState } from 'react';
import ProductListing from './productListing'
import Seo from './SEO/seo'
import { axiosPrivate } from './api/axios';
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
        images: [],
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
            setProducts(response.data);
            console.log("Filtered Vehicles from FilterRoutes:", response.data);
        } catch (error) {
            console.error("Error fetching filtered vehicles:", error);
        }
    };

    return (
        <Layout>
            <Seo/>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Pass filters, setFilters, and onFilterSubmit to FilterForm */}
                <FilterForm
                    filters={filters}
                    setFilters={setFilters}
                    onFilterSubmit={handleFilterSubmit}
                />

                <div className="mt-8 min-w-[300px]">
                    {!products.length ? (
                        <p>No product to display</p>
                    ) : (
                        <ProductListing products={products} />
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default ProductPage;
