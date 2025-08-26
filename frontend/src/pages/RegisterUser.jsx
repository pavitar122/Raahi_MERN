import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("")
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = { name, phone, email, password };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/users/register`,
                userData
            );

            if (response.status === 201) {
                const data = response.data;
                // localStorage.setItem("token", data.token);
                navigate("/home");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setShowAlert(true);
                setEmail("")
                setName("")
                setPhone("")
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
                        User already exists
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col gap-0" >
                <h1 className="text-black font-bold text-5xl pb-6">Raahi</h1>

                {/* Login Form */}
                <form onSubmit={submitHandler}>

                    <h3 className="text-lg font-medium mb-2">What's your name !</h3>
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="text"
                        placeholder="Your name"
                    />

                    <h3 className="text-lg font-medium mb-2">Phone number</h3>
                    <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="number"
                        placeholder="Phone number"
                    />

                    <h3 className="text-lg font-medium mb-2">Email</h3>
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
                        Register
                    </button>
                </form>

                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/loginUser" className="text-blue-600">
                        Login
                    </Link>
                </p>
            </div>


        </div>
    );
};

export default RegisterUser;
