import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        try {
            console.log('Starting token refresh process...from refreshController');
            const response = await axiosPrivate.get('/refresh');
            const { id, firstname, lastname, email, roles, accessToken } = response.data;
            console.log('Refreshed token:',accessToken);
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
