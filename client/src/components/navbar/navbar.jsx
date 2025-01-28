import { Link, NavLink , useNavigate} from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import './navbar.css';
import useAuth from "../../hooks/useAuth";
import Logout from "../../components/btnLogout";

function Navbar() {
    const { auth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const dashBoard =  () => {
        navigate('/dashboard', { replace: true })
    }
    return (
        <>
            <header className="header" data-header>
            
                <nav>
                    <Link to="/home" className="logo">
                        <h3>Spare Yangu</h3>
                    </Link>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span> 
                    </div>
                    <ul className={` navbar-list ${menuOpen ? "open" : ""}`}>
                        <li>
                            <NavLink to="/home" className="navbar-link" >
                                Home
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/product" className="navbar-link" >
                                Products
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/pricing" className="navbar-link" data-nav-link>
                                Pricing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/blogs" className="navbar-link" data-nav-link>
                                Support
                            </NavLink>
                        </li> */}
                        {auth?.accessToken ? 
                         ( 
                            <> 
                                <button className='text-white  px-10 flex ' onClick={dashBoard}>Hi, {auth?.lastname}</button>
                                <Logout /> 
                            </>                     
                            ) : (
                                <>
                                    <li >
                                        <Link to="/login" className="authbtn">
                                            Login?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="authbtn">
                                            Register
                                        </Link>
                                    </li>
                                </>

                            ) }
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar