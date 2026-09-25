import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8001"
            : "https://rental-project-backend.vercel.app";

    const [currentLogin, setCurrentLogin] = useState()
    const [IP, setIP] = useState()
    const [location, setLocation] = useState()

    const getCurrentLogin = async () => {
        const currentLogin = await fetch(`${API_URL}/get-current-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ IP: IP })
        })

        const result = await currentLogin.json()
        setCurrentLogin(result)
    }

    useEffect(() => {
        IP !== undefined && getCurrentLogin()
    }, [IP])

    useEffect(() => {
        getIP()
        // getLocation()
    }, [])
    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    console.log("currentLogin : ", currentLogin)

    // const getLocation = async () => {
    //     const response = await fetch("https://ipapi.co/json/");
    //     const data = await response.json();

    //     setLocation(data)
    //     console.log("data : ", data)
    //     console.log("City:", data.city);
    //     console.log("Pincode:", data.postal);
    // };

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
                    <span>{location?.city}, {location?.region}</span>
                </div>

                <nav className="navigation">
                    <a href="#trends">Price Trends</a>
                </nav>

                <div className="header-actions">
                    <Link to={currentLogin?.success === true ? `/add-material` : `/signup`}>
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