import { useNavigate, Link } from "react-router-dom";
import useLogout from "./src/hooks/useLogout";

export default function Exit () {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/home');
    }

    return (
        <>          
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </>
    )
}


