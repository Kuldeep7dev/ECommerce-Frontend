import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../Component/BreadCrumb';
import axiosInstance from '../../Config/AxiosInstance';
import { Eye, Hash, Trash } from 'lucide-react';
import ConfirmationModal from '../../Component/ConfirmationModel';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../Utils/time';

const Contact = () => {
  const [data, setData] = useState([]);
  const [isConfirmationModelOpen, setIsConfirmationModelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch notifications
  const fetchContact = async () => {
    try {
      const res = await axiosInstance.get('/notification');
      setData(res?.data?.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  // Delete notification
  const handleDeleteNotification = async (id) => {
    if (!id) return;

    try {
      await axiosInstance.delete(`/notification/${id}`);
      await fetchContact();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Open confirmation modal
  const handleDeleteAction = (user) => {
    setIsConfirmationModelOpen(true);
    setSelectedUser(user);
  };

  const breadcrumbItems = [{ title: "Contact" }];

  return (
    <div className='py-6 px-2'>
      <BreadCrumb items={breadcrumbItems} />

      <div className="mt-6 bg-secondary rounded-xl shadow-md border border-primary text-primary overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-primary uppercase text-xs tracking-wider">
            <tr>
              <th className="p-3 text-center">
                <Hash size={14} />
              </th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, idx) => (
                <tr
                  key={item._id}
                  className="border-t transition duration-150"
                >
                  <td className="p-3 text-center">
                    {idx + 1}
                  </td>

                  <td className="p-3 font-medium">
                    <div className='flex flex-col'>
                      <span>{item?.name || "-"}</span>
                      <span className='text-[8px]'>{timeAgo(item.createdAt)}</span>
                    </div>
                  </td>

                  <td className="p-3">
                    {item?.title || "-"}
                  </td>

                  <td className="p-3 max-w-xs truncate">
                    {item?.message || "-"}
                  </td>

                  <td className="p-3 text-center space-x-2 flex">
                    {/* View Button (no logic yet) */}
                    <Link to={`/contact/${item._id}`} className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
                      <Eye size={18} />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteAction(item)}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No notifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModelOpen}
        type="danger"
        title="Delete Notification"
        message={`Are you sure you want to delete this user? ${selectedUser?.name}`}
        onClose={() => {
          setIsConfirmationModelOpen(false);
          setSelectedUser(null);
        }}
        actionButton={
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
            onClick={async () => {
              await handleDeleteNotification(selectedUser._id);
              setIsConfirmationModelOpen(false);
              setSelectedUser(null);
            }}
          >
            Delete
          </button>
        }
      />
    </div>
  );
};

export default Contact;