import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post('refresh', {
            refreshToken: localStorage.getItem('refreshToken'),
            withCredentials: true
        });
        console.log("useRefreshToken-->old token",response.data);
        setAuth(prev => {
            console.log("useRefreshToken-->old token",JSON.stringify(prev));
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        console.log("useRefreshToken-->new token",response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
