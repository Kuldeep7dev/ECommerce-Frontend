import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../../Component/BreadCrumb';
import { Trash } from 'lucide-react';
import ConfirmationModal from '../../Component/ConfirmationModel';

const ViewContact = () => {
    const [data, setData] = useState({});
    const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchContact = async () => {
        try {
            const res = await axiosInstance.get(`/notification/${id}`);
            setData(res.data.notifications)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteNotification = async (id) => {
        try {
            const res = await axiosInstance.delete(`/notification/${id}`);
            navigate('/contact')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAction = (noti) => {
        setIsConfirmationModelOpen(true);
        setSelectedUser(null)
    }

    useEffect(() => {
        fetchContact()
    }, [])

    const breadCrumbItem = [
        { title: 'Contact', link: '/contact' },
        { title: data.name }
    ]

    return (
        <div className='py-6 px-2'>
            <BreadCrumb items={breadCrumbItem} />

            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border">

                    {/* Header */}
                    <div className="flex items-center gap-4 border-b pb-4" >
                        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-secondary text-primary text-2xl font-semibold">
                            {data.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className='flex justify-center items-center gap-20'>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {data.name || "No Name"}
                                </h2>
                                <p className="text-gray-500 text-[9px]">
                                    {data.message || "No Email"}
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
                            <span className="text-gray-500">Title</span>
                            <span className="font-medium text-gray-800">
                                {data.title || "-"}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Entity model</span>
                            <span className="font-medium text-gray-800 capitalize">
                                {data.entityModel || "-"}
                            </span>
                        </div>

                    </div>

                </div>
            </div>
            <ConfirmationModal
                isOpen={isConfirmationModelOpen}
                type='danger'
                title='Delete user'
                message={`Are you sure you want to delete this product?  ${data?.name}`}
                onClose={() => {
                    setIsConfirmationModelOpen(false)
                    setSelectedUser(null)
                }}
                actionButton={
                    <button
                        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer'
                        onClick={async () => {
                            await handleDeleteNotification(data._id)
                            setIsConfirmationModelOpen(false)
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

export default ViewContact