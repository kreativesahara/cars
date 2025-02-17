import { createContext, useState, useContext, useEffect } from "react";
import useAxiosPrivate from "../api/useAxiosPrivate";

const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState([]);
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
        features: []
    });

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get('/products', {
                    params: filters  // Pass filters as query parameters
                });
                setProducts(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getProducts();

        const controller = new AbortController();
        return () => controller.abort();
    }, [axiosPrivate, filters]);  // Refetch whenever filters change

    return (
        <ProductContext.Provider value={{ products, setProducts, filters, setFilters }}>
            {children}
        </ProductContext.Provider>
    );
};
