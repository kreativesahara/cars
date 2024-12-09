import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log('Calling useRefreshToken...');
        try {
            console.log('Starting token refresh process...');

            // Make the refresh token request
            const response = await axiosPrivate.post('/refresh');

            console.log('useRefreshToken --> response', response.data);

            // Destructure the response for better readability
            const { roles, accessToken } = response.data;

            // Update auth state with the new token and roles
            setAuth(prev => {
                console.log('useRefreshToken --> previous auth state:', JSON.stringify(prev));
                return {
                    ...prev,
                    roles,
                    accessToken,
                };
            });

            console.log('useRefreshToken --> new access token:', accessToken);
            return accessToken; // Return the new access token
        } catch (err) {
            console.error('Error in useRefreshToken:', err?.response?.data?.message || err.message);

            if (err?.response?.status === 401 || err?.response?.status === 403) {
                console.warn('Token refresh failed; logging out...');
                setAuth(null); // Clear auth state if the refresh fails
            }

            return null; // Indicate failure to refresh token
        }
    };

    return refresh;
};

export default useRefreshToken;
