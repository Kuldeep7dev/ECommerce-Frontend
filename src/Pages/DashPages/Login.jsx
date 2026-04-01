import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Config/AxiosInstance';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Adjust the endpoint if necessary based on your Node.js backend
            const res = await axiosInstance.post('/authenticate/login', { email, password });

            login(res.data.user);
            toast.success('Login successful! Welcome back.');

            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Failed to login ❌');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="bg-primary p-8 rounded-xl border shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-secondary hover:text-white py-2 rounded-lg font-semibold tracking-wide transition-all disabled:opacity-70 mt-4 cursor-pointer"
                        style={{ backgroundColor: '#10100e', color: '#fffff3' }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;