import { Link, NavLink } from "react-router-dom";
import React from 'react';
import { useState } from 'react';
import './navbar.css';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
                            <NavLink to="/home" className="navbar-link" data-nav-link>
                                Home
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/product" className="navbar-link" data-nav-link>
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/pricing" className="navbar-link" data-nav-link>
                                Pricing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/blogs" className="navbar-link" data-nav-link>
                                Feedback
                            </NavLink>
                        </li>
                        <li >
                            <Link to="/login" className="btn user-btn">
                                <span>Login?</span>
                            </Link>  
                        </li>
                        <li>
                            <Link to="/register" className="btn reg-btn">
                                <span id="aria-label-txt">Get Account?</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Navbar