import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance';
import BreadCrumb from '../../Component/BreadCrumb';
import { Eye, Hash, Pencil, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../Component/ConfirmationModel';


const Users = () => {
  const [data, setData] = useState([]);
  const [isConfirmationModelOpen, SetIsConfirmationModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/auth/signup');
      console.log(res.data.user);
      setData(res.data.user)
    } catch (error) {
      console.log("Server error while you get users")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  const deleteTheUser = async (id) => {
    try {
      const d = await axiosInstance.delete(`/auth/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.log("Server error while delete the users", error)
    }
  }

  const handleDeleteAction = (user) => {
    SetIsConfirmationModelOpen(true)
    setSelectedUser(user)
  }

  const BreadCrumbItems = [
    { title: "Users" }
  ]

  return (
    <div>
      <div className='py-5 px-2 flex justify-between items-center'>
        <BreadCrumb items={BreadCrumbItems} />
        <div>
          <Link
            className='flex border items-center p-2 rounded-xl gap-2 font-bold hover:bg-primary hover:text-secondary hover:border transition-all'
            to='/users/create'
          >
            <Plus />
            <span>Add User</span></Link>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border-2 border-gray-300">
        <table className="w-full">
          <thead className="bg-primary text-secondary">
            <tr>
              <th className="p-2 border-2 border-gray-300">
                <div className="flex justify-center">
                  <Hash size={16} />
                </div>
              </th>
              <th className="p-2 border-2 border-gray-300">Name</th>
              <th className="p-2 border-2 border-gray-300">Email</th>
              <th className="p-2 border-2 border-gray-300">Phone Number</th>
              <th className="p-2 border-2 border-gray-300">Role</th>
              <th className="p-2 border-2 border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((users, index) => (
              <tr key={users._id} className="text-center">
                <td className="p-3 border-2 border-gray-300">{index + 1}</td>
                <td className="p-3 border-2 border-gray-300">{users.fullName}</td>
                <td className="p-3 border-2 border-gray-300">{users.email}</td>
                <td className="p-3 border-2 border-gray-300">{users.phoneNumber}</td>
                <td className="p-3 border-2 border-gray-300 capitalize">
                  {users.role}
                </td>
                <td className="p-3 border-2 border-gray-300">
                  <div className="flex justify-center items-center gap-2">
                    <Link
                      to={`/users/${users._id}`}
                      className="p-2 rounded-xl border-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-all"
                    >
                      <Eye size={20} />
                    </Link>

                    <Link className="p-2 rounded-xl border-2 bg-accent text-white hover:bg-white hover:text-accent hover:border-accent transition-all">
                      <Pencil size={20} />
                    </Link>

                    <button
                      onClick={() => handleDeleteAction(users)}
                      className="border-2 p-2 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500 transition-all cursor-pointer"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModelOpen}
        type='danger'
        title='Delete user'
        message={`Are you sure you want to delete this user?  ${selectedUser?.fullName}`}
        onClose={() => {
          SetIsConfirmationModelOpen(false)
          setSelectedUser(null)
        }}
        actionButton={
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer'
            onClick={async () => {
              await deleteTheUser(selectedUser._id)
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

export default Users