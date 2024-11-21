import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const isAuthorised = auth?.roles?.find(roles => allowedRoles?.includes(roles))
    console.log('isAuthorised', typeof isAuthorised, isAuthorised)
    return (
        isAuthorised
            ? <Outlet />
            : auth?.accessToken 
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
    
}

export default RequireAuth; 