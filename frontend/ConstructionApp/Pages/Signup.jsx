import React, { useState, useEffect } from "react";
import {
    FaArrowRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import "../Style/LoginStyle.css";
import { useForm } from "react-hook-form"
import Footer from "../Components/Footer";

const Signup = () => {
    const API_URL =
        window.location.hostname === "localhost"
            ? "http://localhost:8001"
            : "https://rental-project-backend.vercel.app";
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            otp: ""
        }
    })
    const [IP, setIP] = useState()
    const navigate = useNavigate()
    const [disableSignup, setDisableSignup] = useState(false)
    const [showOtp, setShowOtp] = useState(false)
    const [userData, setUserData] = useState()
    const [otp, setOtp] = useState()

    // const { watch, register, handleSubmit } = useForm()
    // const submit = async (data) => {
    //     const addUser = await fetch(`http://localhost:8001/add-user`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }

    const submit = async (data) => {
        console.log("data : ", data)
        setUserData(data)

        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        const sendOtp = userData?.otp === "" || userData === undefined ? await fetch(`${API_URL}/send-signup-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data, IP: IP, expiry: expiry })
        }) : "";

        const otp2 = sendOtp !== "" ? await sendOtp.json() : "";
        otp2 !== "" && setOtp(otp2)
    }

    const submit2 = async (data) => {
        if (Number(data?.otp) === Number(otp?.signup_otp)) {
            let expiry = new Date();
            expiry.setDate(expiry.getDate() + 1);

            try {
                const user = await fetch(`${API_URL}/add-user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                const result = await user.json();

                if (!user.ok) {
                    console.error("Add user failed:", result);
                    return;
                }

                navigate("/login");
            } catch (error) {
                console.error("Add user fetch error:", error);
            }
        }
    }

    useEffect(() => {
        userData !== undefined && (setDisableSignup(true), setShowOtp(true));
    }, [userData])


    useEffect(() => {
        getIP()
    }, [])
    const getIP = async () => {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIP(data.ip)
    };

    return (
        <>
            <div className="login-page">
                <div className="login-container">

                    <div
                        className="login-left"
                    >

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
                                    {/* <img src={Logo} width="200" /> */}
                                </div>
                            </Link>

                            <div className="welcome-text">
                                <h2>Welcome Back!</h2>
                                <p>
                                    Signup in to your account and continue your journey to a better
                                    living.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="login-box">
                        <div className="login-card">

                            <h2>Signup to Your Account</h2> <br />

                            <form onSubmit={handleSubmit(submit)}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        {...register("name", {
                                            required: { value: true, message: "Full Name is required" }
                                        })}
                                        className="input-box"
                                    />
                                    <div className="error">{errors?.name?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", {
                                            required: { value: true, message: "Email is required" }
                                        })}
                                        className="input-box"

                                    />
                                    <div className="error">{errors?.email?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter your phone number"
                                        {...register("phone", {
                                            required: { value: true, message: "Phone is required" }
                                        })}
                                        className="input-box"
                                    />
                                    <div className="error">{errors?.phone?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password", {
                                            required: { value: true, message: "Password is required" }
                                        })}
                                        className="input-box"
                                    />
                                    <div className="error">{errors?.password?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Pin Code"
                                        {...register("pincode", {
                                            required: { value: true, message: "Pin code is required" }
                                        })}
                                        className="input-box"
                                    />
                                    <div className="error">{errors?.pincode?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        {...register("city", {
                                            required: { value: true, message: "City is required" }
                                        })}
                                        className="input-box"
                                    />
                                    <div className="error">{errors?.city?.message}</div>
                                </div>

                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="Supplier Name"
                                        {...register("supplier", {
                                            required: { value: true, message: "Supplier Name is required" }
                                        })}
                                        className="input-box"
                                    />
                                    <div className="error">{errors?.supplier?.message}</div>
                                </div>

                                <button className="login-btn">
                                    Send Otp <FaArrowRight />
                                </button>

                                <p className="signup-text">
                                    Already have an account? <Link to="/login">Login</Link>
                                </p>
                            </form>


                            <form onSubmit={handleSubmit(submit2)}>
                                {
                                    showOtp === true &&
                                    <>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                placeholder="OTP"
                                                {...register("otp", {
                                                    required: { value: true, message: "OTP is required" }
                                                })}
                                                className="input-box"
                                            />

                                            <div className="error">{errors?.otp?.message}</div>
                                        </div>

                                        <button type="submit" className="login-btn">
                                            Signup <FaArrowRight />
                                        </button>
                                    </>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Signup;