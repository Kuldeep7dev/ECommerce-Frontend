import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance';
import BreadCrumb from '../../Component/BreadCrumb';
import { Eye, Hash, Pencil, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../Component/ConfirmationModel';


const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConfirmationModelOpen, SetIsConfirmationModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/auth');
      setData(res.data.users || []);
    } catch (error) {
      console.error("Server error while fetching users:", error.response?.data || error.message);
    } finally {
      setLoading(false);
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

      {/* {data.length === 0 && (
        <p>couldn't Find the user</p>
      )} */}

      <div className="mt-5 overflow-hidden rounded-lg border-2 border-secondary bg-secondary">
        <table className="w-full">
          <thead className="bg-secondary text-primary">
            <tr>
              <th className="p-2 border-2 border-secondary">
                <div className="flex justify-center">
                  <Hash size={16} />
                </div>
              </th>
              <th className="p-2 border-2 border-secondary">Name</th>
              <th className="p-2 border-2 border-secondary">Email</th>
              <th className="p-2 border-2 border-secondary">Phone Number</th>
              <th className="p-2 border-2 border-secondary">Role</th>
              <th className="p-2 border-2 border-secondary">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-10 text-center text-primary font-bold">
                  <div className="flex justify-center items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                Loading users...
              </div>
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((user, index) => (
                <tr key={user._id} className="text-center text-primary transition-colors">
                  <td className="p-3 border-2 border-secondary">{index + 1}</td>
                  <td className="p-3 border-2 border-secondary">{user.fullName}</td>
                  <td className="p-3 border-2 border-secondary">{user.email}</td>
                  <td className="p-3 border-2 border-secondary">{user.phoneNumber}</td>
                  <td className="p-3 border-2 border-secondary">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-accent text-white' : 'bg-primary text-secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 border-2 border-secondary">
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        to={`/users/${user._id}`}
                        className="p-2 rounded-xl border-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-all shadow-sm"
                      >
                        <Eye size={20} />
                      </Link>

                      <Link 
                        to={`/users/${user._id}/update`} 
                        className="p-2 rounded-xl border-2 bg-accent text-white hover:bg-white hover:text-accent hover:border-accent transition-all shadow-sm"
                      >
                        <Pencil size={20} />
                      </Link>

                      <button
                        onClick={() => handleDeleteAction(user)}
                        className="border-2 p-2 rounded-xl bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500 transition-all cursor-pointer shadow-sm"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-10 text-center text-primary opacity-60">
                  No users found in the database.
                </td>
              </tr>
            )}
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