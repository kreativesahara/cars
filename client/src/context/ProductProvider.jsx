import { createContext, useEffect, useState, useContext } from "react";
import useAxiosPrivate  from "../api/useAxiosPrivate";

const ProductContext = createContext();

// console.log('Product Context', ProductContext.Provider);

export const useProductContext = () => {
    return useContext(ProductContext);
};


export const ProductProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        const getProducts= async () =>{
            try{
                const response = await axiosPrivate.get('/products')
                setProducts(response.data);
                console.log('Product Provider Context :',response.data);
            }catch(err){
                console.error(err)
            }
        }
        getProducts()
        const controller = new AbortController();
        return() =>controller.abort();
    },[axiosPrivate])
    return(
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}