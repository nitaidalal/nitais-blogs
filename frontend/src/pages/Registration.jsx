import React from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Registration = () => {
    const { axios, setUser, navigate } = useAppContext();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords does't match!");
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            
            // Store user data in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            
            // Update context immediately
            setUser(data.user);
            
            toast.success(data.message);
            navigate('/'); // Redirect to home page
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center min-h-screen py-12">
            <div className="w-full mx-8 max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Create Account
                    </h1>
                    <p className="text-gray-600">Join our community today!</p>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength={6}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Create a password (min 6 characters)"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-2 font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Confirm your password"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
