import { useEffect, useState } from 'react'
import Pages from '../Component/Global/Pages'
import { ArrowRight, User, Mail, Phone, Lock } from 'lucide-react'
import axiosInstance from '../Config/AxiosInstance';
import { showError, showSuccess } from '../Utils/toaster';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserSignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, checkAuth } = useAuth();


  const handlePostData = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // ✅ Validation
    if (!data.fullName.trim()) return showError("Please enter your full name");
    if (!data.email.trim()) return showError("Please enter your email");
    if (!emailRegex.test(data.email)) return showError("Invalid email format");
    if (!data.phoneNumber.trim()) return showError("Please enter your phone number");
    if (!data.password.trim()) return showError("Please enter your password");
    if (!passwordRegex.test(data.password)) return showError("Password must be 8+ chars and include uppercase, lowercase, number, and special character");
    if (!data.confirmPassword.trim()) return showError("Please confirm password");
    if (data.password !== data.confirmPassword) return showError("Passwords do not match");

    setIsLoading(true);
    try {


      const res = await axiosInstance.post("/auth/signup", data);


      login(res.data.user);

      showSuccess("Account created successfully! ✅");
      navigate('/');
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        showError(error.response.data.message || error.response.data.errors || "Something went wrong");
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
    document.title = "Bravima | SignUp"
  }, [])

  return (
    <Pages>
      <div className='flex justify-center items-center h-screen bg-secondary px-4 py-12 relative'>
        {/* LOGO */}
        <div className="absolute top-6 left-6 md:top-8 md:left-10 z-50">
          <a href='/' className='text-3xl font-bold text-primary hover:text-accent transition-colors' style={{ fontFamily: 'Dancing Script' }}>
            bravima
          </a>
        </div>
        <div className='w-full max-w-xl bg-primary shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-4xl p-8 sm:p-12 border border-gray-100 relative overflow-hidden'>

          {/* Subtle Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gray-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-gray-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

          <div className='relative z-10'>
            <div className='text-center mb-10'>
              <h1 className='text-3xl sm:text-4xl font-extrabold text-secondary mb-3 tracking-tight'>
                Create Account
              </h1>
              <p className='text-gray-500 font-medium'>
                Join Bravima to experience the best we offer.
              </p>
            </div>

            <form className='flex flex-col gap-6' onSubmit={handlePostData}>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {/* Full Name */}
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <User size={16} className="text-gray-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    name='fullName' onChange={handleChange}
                    value={data.fullName}

                    placeholder='John Doe'
                    className='w-full border border-secondary outline-none px-4 py-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-primary text-secondary focus:border-primary focus:ring-4 focus:ring-gray-100 transition-all duration-300 placeholder-gray-400 font-medium'
                  />
                </div>

                {/* Email */}
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <Mail size={16} className="text-gray-400" /> Email
                  </label>
                  <input
                    type="text"
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    placeholder='john@example.com'
                    className='w-full border border-secondary outline-none px-4 py-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-primary text-secondary focus:border-primary focus:ring-4 focus:ring-gray-100 transition-all duration-300 placeholder-gray-400 font-medium'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {/* Phone Number */}
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <Phone size={16} className="text-gray-400" /> Phone number
                  </label>
                  <input
                    type="tel"
                    name='phoneNumber'
                    value={data.phoneNumber}
                    onChange={handleChange}
                    placeholder='+91 12345 67890'
                    className='w-full border border-secondary outline-none px-4 py-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-primary text-secondary focus:border-primary focus:ring-4 focus:ring-gray-100 transition-all duration-300 placeholder-gray-400 font-medium'
                  />
                </div>

                {/* Password */}
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                    <Lock size={16} className="text-gray-400" /> Password
                  </label>
                  <input
                    type="password"
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='w-full border border-secondary outline-none px-4 py-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 focus:bg-primary text-secondary focus:border-primary focus:ring-4 focus:ring-gray-100 transition-all duration-300 placeholder-gray-400 font-medium'
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className='flex flex-col gap-2'>
                <label className='text-sm font-bold text-gray-700 ml-1 flex items-center gap-2'>
                  <Lock size={16} className="text-gray-400" /> Confirm Password
                </label>
                <input
                  type="password"
                  name='confirmPassword'
                  value={data.confirmPassword}
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
                {isLoading ? 'Creating Account...' : 'Sign Up Now'}
                {!isLoading && <ArrowRight size={18} className='group-hover:translate-x-1 transition-transform duration-300' />}
              </button>

              <div className="mt-6 text-center text-sm font-medium text-gray-500">
                Already have an account?{' '}
                <a href="/login" className="text-secondary hover:underline underline-offset-4 cursor-pointer font-bold">
                  Log in here
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Pages>
  )
}

export default UserSignUp