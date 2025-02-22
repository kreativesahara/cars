import  {axiosPrivate} from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();  
   
    const refresh = async () => {
        try {
            console.log('Starting token refresh process...from refreshController');
            // Make the refresh token request
            const response = await axiosPrivate.post('/refresh',
                { withCredentials: true }
            );
            // Destructure the response for better readability
            const { id, firstname, lastname, email, roles, accessToken } = response.data;
            console.log(id);  
            // Update auth state with the new token and roles
            setAuth(prev => {
                return {
                    ...prev,
                    id: id,
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    roles: roles,
                    accessToken: accessToken,
                };
            });
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
