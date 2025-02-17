import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                // Attach the access token if it exists and the header isn't already set
                if (auth?.accessToken && !config.headers["authorization"]) {
                    config.headers["authorization"] = `Bearer ${auth.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                // Only attempt a token refresh if:
                // 1. The response status is 403 (Forbidden)
                // 2. A refresh token exists (i.e. the user is logged in)
                // 3. We haven't already retried this request
                if (
                    error?.response?.status === 403 &&
                    auth?.refreshToken &&
                    !prevRequest?.sent
                ) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();

                        // If a new token was successfully obtained, update the header and retry
                        if (newAccessToken) {
                            prevRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
                            return axiosPrivate(prevRequest);
                        }
                    } catch (refreshError) {
                        console.error("Token refresh failed:", refreshError);
                        // Optionally, trigger a logout or redirect to login here
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
