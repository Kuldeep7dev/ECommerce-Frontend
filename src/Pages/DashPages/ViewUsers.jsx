import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import BreadCrumb from '../../Component/BreadCrumb'
import axiosInstance from '../../Config/AxiosInstance'
import { Trash } from 'lucide-react'
import ConfirmationModal from '../../Component/ConfirmationModel'

const ViewUsers = () => {
    const [data, setData] = useState({})
    const [isConfirmationModelOpen, SetIsConfirmationModelOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`/auth/view/${id}`);
            setData(res.data.user)
            console.log(res.data.user);

        } catch (error) {
            console.log("Server error when you show the product", error)
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            const res = await axiosInstance.delete(`/auth/delete/${id}`);
            navigate('/users')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAction = (user) => {
        SetIsConfirmationModelOpen(true)
        setSelectedUser(user)
    }

    useEffect(() => {
        fetchData()
    }, [id])


    const BreadCrumItems = [
        { title: "Users", link: "/users" },
        { title: data.fullName }
    ]
    return (
        <div className='py-6 px-2'>
            <BreadCrumb items={BreadCrumItems} />

            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border">

                    {/* Header */}
                    <div className="flex items-center gap-4 border-b pb-4">
                        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-secondary text-primary text-2xl font-semibold">
                            {data.fullName?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className='flex justify-center items-center gap-20'>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {data.fullName || "No Name"}
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    {data.email || "No Email"}
                                </p>
                            </div>
                            <div>
                                <button onClick={() => handleDeleteAction(data)} className='border-2 p-2 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500 transition-all cursor-pointer'><Trash size={20} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 space-y-3 text-sm">

                        <div className="flex justify-between">
                            <span className="text-gray-500">Phone</span>
                            <span className="font-medium text-gray-800">
                                {data.phoneNumber || "-"}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Role</span>
                            <span className="font-medium text-gray-800 capitalize">
                                {data.role || "-"}
                            </span>
                        </div>

                    </div>

                </div>
            </div>
            <ConfirmationModal
                isOpen={isConfirmationModelOpen}
                type='danger'
                title='Delete user'
                message={`Are you sure you want to delete this product?  ${selectedUser?.fullName}`}
                onClose={() => {
                    SetIsConfirmationModelOpen(false)
                    setSelectedUser(null)
                }}
                actionButton={
                    <button
                        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer'
                        onClick={async () => {
                            await handleDeleteUser(selectedUser._id)
                            SetIsConfirmationModelOpen(false)
                            setSelectedUser(null)
                        }}
                    >
                        Delete
                    </button>
                }
            />
        </div>
    )
}

export default ViewUsers