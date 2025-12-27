import React from 'react'
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
    const {axios, setToken, setUser, navigate} = useAppContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post("/auth/login", {email, password});
            
            setToken(data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("isDemo", data.isDemo ? 'true' : 'false');
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            
            // Store user data if regular user
            if(data.role === 'user') {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user); // Update context immediately
            } else {
                setUser(null); // Clear user for admin
            }
            
            toast.success(data.message);
            
            // Redirect based on role
            if(data.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
                
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className='bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center min-h-screen py-12'>
        <div className='w-full mx-8 max-w-md bg-white p-8 rounded-2xl shadow-xl'>
            <div className='text-center mb-6'>
                <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
                    Welcome Back!
                </h1>
                <p className='text-gray-600'>Login to your account</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='mb-2 font-medium text-gray-700'>Email Address</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        type='email' 
                        id='email' 
                        required
                        className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition' 
                        placeholder='Enter your email' 
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='password' className='mb-2 font-medium text-gray-700'>Password</label>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        type='password' 
                        id='password' 
                        required
                        className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition' 
                        placeholder='Enter your password' 
                    />
                </div>
                <button 
                    type='submit' 
                    disabled={loading}
                    className='mt-4 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            
            <div className='mt-6 text-center'>
                <p className='text-gray-600'>
                    Don't have an account?{' '}
                    <Link to='/register' className='text-primary font-semibold hover:underline'>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
      
    </div>
  )
}

export default Login
