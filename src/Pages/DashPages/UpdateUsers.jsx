import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Component/BreadCrumb'
import { useNavigate, useParams } from 'react-router';
import axiosInstance from '../../Config/AxiosInstance';

const UpdateUsers = () => {
    const [data, setData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: ""
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const res = await axiosInstance.get(`/auth/${id}`)
            setData(res.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePutData = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.put(`/auth/update/${id}`, data);
            navigate('/users');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);


    const handleChange = ({ target: { name, value } }) => {
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const breadCrumbItem = [
        { title: "Users", link: "/users" },
        { title: `${data?.fullName}`, link: `/users/${data._id}` },
        { title: "Update" }
    ];
    return (
        <div className='py-5 px-2 flex flex-col '>
            <BreadCrumb items={breadCrumbItem} />
            <div className='flex justify-center items-center h-[70vh]'>
                <div className="mt-6 bg-primary border rounded-2xl shadow-lg p-8 w-full">

                    <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                        Update User
                    </h1>

                    <form onSubmit={handlePutData} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                type="text"
                                value={data.fullName}
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
                                value={data.phoneNumber}
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
                                value={data.email}
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
                                value={data.password}
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
                                value={data.role}
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
                                Update User
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUsers