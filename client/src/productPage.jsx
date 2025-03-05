import React, { useState } from 'react';
import ProductListing from './productListing';
import Seo from './SEO/seo';
import { axiosPrivate } from './api/axios';
import FilterForm from './components/forms/filterForm';
import Layout from './components/Layout';
import { useProductContext } from './context/ProductProvider';

const ProductPage = () => {
    const { products, setProducts } = useProductContext();

    const [filters, setFilters] = useState({
        make: '', model: '', yearFrom: '', yearTo: '', priceMin: '', priceMax: '',
        fuelType: '', transmission: '', mileageRange: '', images: [], location: '',
        condition: '', driveSystem: '', engine_capacity: '', features: [],
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const handleFilterSubmit = async (cleanedFilters) => {
        try {
            const response = await axiosPrivate.get('/filter', { params: cleanedFilters });
            setProducts(response.data);
            setCurrentPage(1); // Reset to first page after filtering
        } catch (error) {
            console.error("Error fetching filtered vehicles:", error);
        }
    };

    // Calculate pagination details
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <Layout>
            <Seo />
            <div className="flex flex-col md:flex-row gap-10">
                <FilterForm filters={filters} setFilters={setFilters} onFilterSubmit={handleFilterSubmit} />
                <div className="mt-8 min-w-[300px]">
                    {!products.length ? (
                        <p>No product to display</p>
                    ) : (
                        <>
                            <ProductListing products={currentProducts} />
                            <div className="flex justify-center mt-4 space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ProductPage;