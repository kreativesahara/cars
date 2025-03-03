import { createContext, useState, useContext, useMemo } from "react";
import {axiosPrivate }from "../api/axios";
const ProductContext = createContext();
export const useProductContext = () => {
    return useContext(ProductContext);
};
export const ProductProvider = ({ children }) => {
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
        images: [],
        location: '',
        condition: '',
        features: []
    });
    useMemo(() => {
        const getProducts = async () => {
            try {
                const response = await axiosPrivate.get('/publicproducts', {
                    params: filters 
                });
                setProducts(response.data);
                console.log('products from public products Route: ', response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getProducts();
        const controller = new AbortController();
        return () => controller.abort();
    }, [axiosPrivate, filters]); 
    return (
        <ProductContext.Provider value={{ products, setProducts, filters, setFilters }}>
            {children}
        </ProductContext.Provider>
    );
};
