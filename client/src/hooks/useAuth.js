import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const  {auth } = useContext(AuthContext);
    console.log("here we introduce authoziation :",auth);
    useDebugValue(auth, auth => auth?.accessToken ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;