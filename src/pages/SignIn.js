import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import axios from 'axios';

const SignIn = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    })

    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false);


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);

        try {
            const response = await axios.post(
                `${process.env.Auth_URL}/login`,
                formData
            );

            await sessionStorage.setItem('userToken', JSON.stringify(response?.data?.token));
            await sessionStorage.setItem('role', JSON.stringify(response?.data?.role));
            await sessionStorage.setItem('userId', JSON.stringify(response?.data?.id));

            
            if(response?.data?.role === "ADMIN") {
                navigate("/admin/dashboard");
            }
            else {
                navigate("/dashboard");
            }

        } catch (error) {
            setError(error?.response?.data?.message ? error?.response?.data?.message : error?.message);
        }
        setLoading(false);

    }

    return (
        <div className="bg-lightGray min-h-screen flex items-center justify-center px-8">
            <div className="w-full sm:w-4/5 md:w-4/5 lg:w-2/5 bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                    <h1 className="text-secondary text-2xl font-semibold text-center mb-4">Log into your account</h1>
                </div>

                <form onSubmit={(event) => handleLogin(event)}>
                    {error && (
                        <p className="text-sm text-error bg-red-100 text-center py-2 rounded-md mb-4">
                            {error}
                        </p>
                    )}

                    <div className="mb-4">
                        <label className="text-primary font-semibold text-md mb-2">Email <span className="text-error">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-primary focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-primary font-semibold text-md mb-2">Password <span className="text-error">*</span></label>
                        <div className="relative">
                            <input
                                type={!showPassword ? "password" : "text"}
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-primary focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Password"
                                required
                            />
                            <p
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-secondary cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 text-right">
                        <Link className="text-sm text-secondary hover:underline" to="/forgotpassword">
                            Can't remember my password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 text-white font-semibold rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-secondary cursor-pointer"
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center gap-2">
                                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>

    )
}

export default SignIn