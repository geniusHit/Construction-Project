import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineBusiness } from "react-icons/md";

const NavBar = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8001"
            : "https://construction-project-gll3.vercel.app";

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
        getLocation()
    }, [])
    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );

                const data = await response.json();
                setLocation(data);
            },
            (error) => {
                console.error(error);
            }
        ); 
    };

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
                    <span>{location?.address?.county}, {location?.address?.state}, {location?.address?.country}</span>
                </div>

                <nav className="navigation">
                    <a href="#trends" className='!text-[#1a56db]'>Price Trends</a>
                </nav>

                <div className="header-actions">
                    <Link to={currentLogin?.success === true ? `/add-material` : `/signup`}>
                        <button className="business-btn">
                            🏢
                        </button>
                    </Link>

                    <Link to="/login">
                        <button className="login-btn-nav">
                            ➜]
                        </button>
                    </Link>
                </div>
            </header>
        </div >
    )
}

export default NavBar