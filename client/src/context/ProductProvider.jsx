import { createContext, useState, useContext, useMemo } from "react";
import useAxiosPrivate  from "../api/useAxiosPrivate";

const ProductContext = createContext();

// console.log('Product Context', ProductContext.Provider);

export const useProductContext = () => {
    return useContext(ProductContext);
};


export const ProductProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    useMemo(() =>{
        const getProducts= async () =>{
            try{
                const response = await axiosPrivate.get('/products')
                setProducts(response.data);
            }catch(err){
                console.error(err)
            }
        }
        getProducts()
        const controller = new AbortController();
        return() =>controller.abort();
    },[axiosPrivate])
    console.log("products", products)
    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}