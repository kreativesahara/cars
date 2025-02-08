import { createContext, useState, useContext } from "react";
import useAxiosPrivate  from "../api/useAxiosPrivate";

const SellerContext = createContext();

export const useSellerContext = () => {
    return useContext(SellerContext);
};


export const SellerProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const [sellers, setSellers] = useState([]);
    useState(() =>{
        const getSellers= async () =>{
            try{
                const response = await axiosPrivate.get('/sellers')
                setSellers(response.data);
            }catch(err){
                console.error(err)
            }
        }
        getSellers()
        const controller = new AbortController();
        return() =>controller.abort();
    },[axiosPrivate])
    console.log("sellers", sellers)
    return(
        <SellerContext.Provider value={{sellers, setSellers}}>
            {children}
        </SellerContext.Provider>
    )
}