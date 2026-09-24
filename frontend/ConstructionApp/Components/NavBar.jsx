import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <header className="header">
                <Link to="/">
                    <div className="logo-area">
                        <div>
                            <div className="logo-text">
                                Construct<span>Price</span>
                            </div>
                            <div className="logo-tagline">
                                Compare. Save. Build Better.
                            </div>
                        </div>
                    </div>
                </Link>

                <div className="location-selector">
                    <span className="pin">●</span>
                    <span>Bangalore, Karnataka</span>
                </div>

                <nav className="navigation">
                    <a href="#trends">Price Trends</a>
                </nav>

                <div className="header-actions">
                    <Link to="/add-material">
                        <button className="business-btn">
                            List Your Business
                        </button>
                    </Link>

                    <Link to="/login">
                        <button className="login-btn-nav">
                            Login / Sign Up
                        </button>
                    </Link>
                </div>
            </header>
        </div >
    )
}

export default NavBar