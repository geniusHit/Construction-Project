import { useState, useEffect } from "react";
import {
    FaArrowRight,
} from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Footer from "../Components/Footer";

const Login = () => {
    const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:8001"
      : "https://construction-project-gll3.vercel.app";

    const { register, handleSubmit, formState: {errors}, setError } = useForm()
    const [IP, setIP] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getIP()
    }, [])
    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    const submit = async (data) => {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        const login = await fetch(`${API_URL}/login-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data, IP: IP, expiry: expiry })
        })

        const result = await login.json()
        
        if (result?.success !== true) {
            setError("password", {
                message: "Incorrect password"
            })
            throw new Error("Incorrect password")
        }

        navigate("/")
    }

    return (
        <>
            <div className="login-page">
                <div className="login-container">

                    <div className="login-left">
                        <br />
                        <Link to="/">
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
                        </Link>

                        <div className="overlay-content">
                            <Link to="/">
                                <div className="logo">
                                    <img width="200" />
                                </div>
                            </Link>

                            <div className="welcome-text">
                                <h2>Welcome Back!</h2>
                                <p>
                                    Log in to your account and continue your journey to a better
                                    living.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="login-box">
                        <div className="login-card">

                            <h2>Login to Your Account</h2> <br />

                            <form onSubmit={handleSubmit(submit)}>

                                <div className="input-group">
                                    <div className="input-box">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...register("email")}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <div className="input-box">
                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...register("password", {
                                                required: { value: true, message: "Password is required" },
                                            })}
                                        />
                                    </div>

                                    <div className="error">{errors?.password?.message}</div>
                                </div>

                                <button className="login-btn">
                                    Login <FaArrowRight />
                                </button>

                                <p className="signup-text">
                                    Don't have an account? <Link to="/signup">Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Login;