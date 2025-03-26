import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            console.log('Starting token refresh process...from refreshController');
            // Make the refresh token request
            const response = await axiosPrivate.get('/refresh');
            // Destructure the response for better readability
            const { id, firstname, lastname, email, roles, accessToken } = response.data;

            console.log(accessToken);
            // Update auth state with the new token and roles
            setAuth((prev) => {
                return({
                    ...prev,
                    id: id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    roles: roles,
                    accessToken: accessToken,
                });
                
            });
            console.log('Token refreshed successfully');
        } catch (err) {
            console.error('Error in useRefreshToken:', err?.response?.data?.message || err.message);
            if (err?.response?.status === 401 || err?.response?.status === 403) {
                console.warn('Token refresh failed; logging out...');
                setAuth(null);
            }
            return null;
        }
    };
    return refresh;
};

export default useRefreshToken;
