import { useEffect, useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance';
import BreadCrumb from '../../Component/BreadCrumb';
import { Hash, Trash2 } from 'lucide-react';
import { timeAgo } from '../../Utils/time';
import { showError, showSuccess } from '../../Utils/toaster';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axiosInstance.get('/contact');
      setContacts(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "Bravima || Admin Contact";
    fetchContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      await axiosInstance.delete(`/contact/delete-contact/${id}`);
      fetchContacts();
      showSuccess("Successfully deleted");
    } catch (error) {
      console.log(error);
      showError("Something went wrong while deleting");
    }
  };

  const breadcrumbItems = [
    { title: "Contact", link: '/contact' }
  ];

  return (
    <div>
      <div className='mt-5 mb-5'>
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div>
        <table className="w-full border">
          <thead className="bg-primary text-secondary">
            <tr>
              <th className="p-2 border">
                <span className='flex justify-center items-center'>
                  <Hash size={15} />
                </span>
              </th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length > 0 ? (
              contacts.map((item, index) => (
                <tr key={item._id} className='text-center'>
                  <td className="p-5 border">{index + 1}</td>
                  <td className="p-5 border">{item.name}</td>
                  <td className="p-5 border">{item.email}</td>
                  <td className="p-5 border">{item.message}</td>
                  <td className="p-5 border">{timeAgo(item.createdAt)}</td>
                  <td className="p-5 border">
                    <button
                      onClick={() => handleDeleteContact(item._id)}
                      className='cursor-pointer border-2 p-2 rounded-xl bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:scale-120'
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500 font-medium select-none"
                >
                  Couldn't find any contact
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contact;