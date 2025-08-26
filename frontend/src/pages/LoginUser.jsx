import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/login`,
                userData
            );

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("token", data.token);
                navigate("/home");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setShowAlert(true);
                setEmail("")
                setPassword("")
            } else {
                console.error(error.message);
            }
        }
    };

    // Auto-hide alert after 3 seconds
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <div className="p-7 h-screen flex flex-col justify-between relative">
            {/* Alert Box */}
            {showAlert && (
                <div className="absolute inset-0 flex flex-col justify-start items-center z-20 pointer-events-none">
                    <div
                        className={`bg-red-300 px-12 py-4 rounded shadow-md text-black text-xl font-semibold
      transform transition-transform duration-700 ease-in-out translate-y-0 opacity-100
    `}
                    >
                        Invalid Credentials
                    </div>
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-black font-bold text-5xl pb-6">Raahi</h1>

                {/* Login Form */}
                <form onSubmit={submitHandler}>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input
                        className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        placeholder="password"
                    />

                    <button
                        className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center">
                    New here?{" "}
                    <Link to="/registerUser" className="text-blue-600">
                        Create new Account
                    </Link>
                </p>
            </div>

            {/* Captain Login */}
            <div>
                <Link
                    to="/captain-login"
                    className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default LoginUser;
