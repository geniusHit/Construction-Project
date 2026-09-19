import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <header className="header">
                <div className="logo-area">
                    <div className="logo-mark">
                        <span>▥</span>
                    </div>

                    <div>
                        <div className="logo-text">
                            Construct<span>Price</span>
                        </div>
                        <div className="logo-tagline">
                            Compare. Save. Build Better.
                        </div>
                    </div>
                </div>

                <div className="location-selector">
                    <span className="pin">●</span>
                    <span>Bangalore, Karnataka</span>
                    <span>⌄</span>
                </div>

                <nav className="navigation">
                    <a href="#trends">Price Trends</a>
                    <a href="#suppliers">Find Suppliers</a>
                    <a href="#bulk-quotes">Bulk Quotes</a>
                </nav>

                <div className="header-actions">
                    <button className="business-btn">
                        List Your Business
                    </button>

                    <Link>
                        <button className="login-btn-nav">
                            Login / Sign Up
                        </button>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default NavBar