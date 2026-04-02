import { useEffect, useState } from 'react'
import Pages from '../Component/Global/Pages'
import { ArrowRight, Mail, Lock, LogIn } from 'lucide-react'
import axiosInstance from '../Config/AxiosInstance';
import { showError, showSuccess } from '../Utils/toaster';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, checkAuth } = useAuth();

  const handlePostData = async (e) => {
    e.preventDefault();

    if (!data.email.trim()) return showError("Please enter your email");
    if (!data.password.trim()) return showError("Please enter your password");

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);

      login(res.data.user);
      
      showSuccess(`Welcome back, ${res.data.user.fullName || 'User'}! ✅`);
      
      if (res.data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        showError(error.response.data.message || error.response.data.errors || "Invalid credentials ❌");
      } else {
        showError("Server error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    document.title = "Bravima | Login"
  }, [])

  return (
    <Pages>
      <div className='flex justify-center items-center h-screen bg-secondary px-4 py-12'>
        <div className='w-full max-w-md bg-primary shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-4xl p-8 sm:p-12 border border-gray-100 relative overflow-hidden'>

          {/* Subtle Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-gray-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

          <div className='relative z-10'>
            <div className='text-center mb-10'>
              <h1 className='text-3xl sm:text-4xl font-extrabold text-secondary mb-3 tracking-tight'>
                Welcome Back
              </h1>
              <p className='text-gray-500 font-medium'>
                Login to your account to continue shopping.
              </p>
            </div>

            <form className='flex flex-col gap-6' onSubmit={handlePostData}>
              {/* Email */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                  <Mail size={16} className="text-gray-400" /> Email Address
                </label>
                <input
                  type="email"
                  name='email'
                  value={data.email}
                  onChange={handleChange}
                  placeholder='john@example.com'
                  className='w-full border border-secondary outline-none px-4 py-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-primary text-secondary focus:border-primary focus:ring-4 focus:ring-gray-100 transition-all duration-300 placeholder-gray-400 font-medium'
                />
              </div>

              {/* Password */}
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <Lock size={16} className="text-gray-400" /> Password
                  </label>
                  <a href="#" className='text-xs font-bold text-gray-400 hover:text-secondary transition-colors'>Forgot?</a>
                </div>
                <input
                  type="password"
                  name='password'
                  value={data.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='w-full border border-secondary outline-none px-4 py-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-primary text-secondary focus:border-primary focus:ring-4 focus:ring-gray-100 transition-all duration-300 placeholder-gray-400 font-medium'
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 border group relative w-full flex justify-center items-center gap-2 bg-primary text-secondary hover:bg-secondary hover:text-primary py-4 rounded-xl font-bold tracking-wide transition-all duration-300 active:scale-[0.98] shadow-lg shadow-gray-300/50 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                {!isLoading && <LogIn size={18} className='group-hover:translate-x-1 transition-transform duration-300' />}
              </button>

              <div className="mt-6 text-center text-sm font-medium text-gray-500">
                Don't have an account?{' '}
                <a href="/signup" className="text-secondary hover:underline underline-offset-4 cursor-pointer font-bold">
                  Register here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Pages>
  )
}

export default UserLogin