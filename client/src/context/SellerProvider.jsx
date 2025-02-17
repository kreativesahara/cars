import { createContext, useState, useContext } from "react";
import axios from "../api/axios";

const SellerContext = createContext();

export const useSellerContext = () => {
    return useContext(SellerContext);
};


export const SellerProvider = ({ children }) => {
    const [sellers, setSellers] = useState([]);
    useState(() =>{
        const getSellers= async () =>{
            try{
                const response = await axios.get('/sellers')
                setSellers(response.data);
                console.log(response.data)
            }catch(err){
                console.error(err)
            }
        }
        getSellers()
        const controller = new AbortController();
        return() =>controller.abort();
    },[axios])
    return(
        <SellerContext.Provider value={{sellers, setSellers}}>
            {children}
        </SellerContext.Provider>
    )
}