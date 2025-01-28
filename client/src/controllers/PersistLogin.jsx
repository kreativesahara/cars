import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let mounted = true; // Improved naming for clarity

        const verifyRefreshToken = async () => {
            if (!persist) {
                setIsLoading(false); // Skip token verification if persistence is off
                return;
            }
            try {
                await refresh(); // Refresh token and update auth state
            } catch (err) {
                console.error("Error verifying refresh token:", err.message);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        if (!auth?.accessToken) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            mounted = false; // Cleanup
        };
    }, [auth?.accessToken, persist, refresh]); // Include dependencies to avoid stale closures

    return !persist ? (
        <Outlet />
    ) : isLoading ? (
        <p>Loading...</p>
    ) : (
        <Outlet />
    );
};

export default PersistLogin;
