import {  useLocation } from 'react-router-dom'
import useAuth from "./useAuth";
import useAxiosPrivate from "../api/useAxiosPrivate";


const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();    
    const { setAuth } = useAuth();
    const from = location.state?.from?.pathname || "/";

    const logout = async () => {
        setAuth({});
        try {
            await axiosPrivate('/logout');
            alert("You Are Logged Out")
            window.location.href = from    
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout