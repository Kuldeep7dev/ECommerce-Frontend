import React, { useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance';
import { showError, showSuccess } from '../../Utils/toaster';
import BreadCrumb from '../../Component/BreadCrumb';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [signUpUser, setSignUpUser] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate()

  const handlePostData = async (para) => {
    para.preventDefault()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!signUpUser.fullName.trim()) return showError("Please enter your full name");
    if (!emailRegex.test(signUpUser.email)) return showError("Please enter valid format of email");
    if (!signUpUser.email.trim()) return showError("Please enter your email");
    if (!signUpUser.phoneNumber.trim()) return showError("Please enter your phone number");
    if (!passwordRegex.test(signUpUser.password)) return showError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character")
    if (!signUpUser.password.trim()) return showError("Please enter your password");
    if (!signUpUser.role.trim()) return showError("Please select your role");

    try {
      const res = await axiosInstance.post("/auth/signup", signUpUser);
      navigate('/users')
      console.log(res.data);
    } catch (error) {
      showError(error)
    }
    showSuccess("User created successfully")
  }

  const handleChange = ({ target: { name, value } }) => {
    setSignUpUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const breadcrumbItems = [
    { title: "Users", link: '/users' },
    { title: "Create" }
  ]

  return (
    <div className="p-6">

      <div className='mt-5'>
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div className='flex justify-center items-center h-[70vh]'>
        <div className="mt-6 bg-primary border rounded-2xl shadow-lg p-8 w-full">

          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Create Account
          </h1>

          <form onSubmit={handlePostData} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Full Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                value={signUpUser.fullName}
                onChange={handleChange}
                name="fullName"
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm text-gray-600">Mobile Number</label>
              <input
                type="text"
                value={signUpUser.phoneNumber}
                onChange={handleChange}
                name="phoneNumber"
                placeholder="Enter your mobile number"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="text"
                value={signUpUser.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={signUpUser.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            {/* Role */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Role</label>
              <select
                value={signUpUser.role}
                onChange={handleChange}
                name="role"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-secondary text-primary py-3 rounded-lg font-medium hover:bg-primary hover:text-secondary cursor-pointer hover:border transition duration-200"
              >
                Create User
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp