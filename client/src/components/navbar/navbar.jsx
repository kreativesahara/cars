import { Link, NavLink , useNavigate} from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import './navbar.css';
import useAuth from "../../hooks/useAuth";
import Logout from "../button/btnLogout";

function Navbar() {
    const { auth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const dashBoard =  () => {
        navigate('/dashboard', { replace: true })
    }
    return (
        <>
            <header className="header  min-w-[400px]" data-header>
                <nav className="flex justify-around max-w-[2000px] mx-auto">
                    <Link to="/home" className="logo">
                        <p className="md:text-2xl z-1 hover:text-red-600 transition animate-bounce duration-300">Diksx cars</p>
                        <span className="px-4  lg:text-md">Automotive and Spares</span>                        
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
                        <li>
                            <NavLink to="/pricing" className="navbar-link" data-nav-link>
                                Pricing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/support" className="navbar-link" data-nav-link>
                                Support
                            </NavLink>
                        </li>
                    </ul>
                    <ul className={` navbar-list ${menuOpen ? "open" : ""}` }>
                        {auth?.accessToken ?
                            (
                                <>
                                    <button className='text-white mx-auto p-2 hover:bg-black hover:p-2 hover:rounded-md' onClick={dashBoard}>Dashboard</button>
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

                            )}
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar