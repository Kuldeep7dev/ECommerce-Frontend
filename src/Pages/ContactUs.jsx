import React, { useEffect, useLayoutEffect, useState } from 'react'
import Pages from '../Component/Global/Pages'
import axiosInstance from '../Config/AxiosInstance';
import { showError, showSuccess } from '../Utils/toaster';
import { Copyright, Heart, Mail, MapPin, Phone, } from 'lucide-react';
import { RiFacebookFill, RiInstagramFill, RiTwitterXFill, RiYoutubeFill } from '@remixicon/react';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(null)

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      if (!contact.name.trim()) {
        return showError("Name is required");
      }

      if (!contact.email.trim()) {
        return showError("Email is required");
      }

      if (!contact.message.trim()) {
        return showError("Message is required");
      }

      setLoading(true);

      const res = await axiosInstance.post("/contact/message", contact);

      setContact({
        name: "",
        email: "",
        message: ""
      });

    } catch (error) {
      console.log("Something error to send a message");
    } finally {
      setLoading(false);
    }

    showSuccess("Message sent! I'll contact you soon")
  };

  const handleMessage = async () => {
    toast("Coming soon")
  }

  useEffect(() => {
    document.title = "Bravima || Contact-Us"
  }, []);

  const email = "kushallaxkar9@gmail.com"
  return (
    <Pages>
      <div className="w-full min-h-screen bg-primary flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl bg-white border border-gray-200 p-8 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Left Side */}
            <div>
              {/* Location */}
              <div className="mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-5 ">
                  Location
                </h2>

                <p className="text-gray-500 leading-8 text-lg">
                  Near Civil Hospital, Ahmedabad, Gujarat
                  <br />
                  382345
                </p>
              </div>

              {/* Follow Us */}
              <div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-5">
                  Follow us
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <button onClick={handleMessage} className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
                    <RiFacebookFill size={16} />
                  </button>

                  <button onClick={handleMessage} className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
                    <RiTwitterXFill size={16} />
                  </button>

                  <button onClick={handleMessage} className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
                    <RiInstagramFill size={16} />
                  </button>

                  <button onClick={handleMessage} className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center cursor-pointer hover:scale-110 duration-200">
                    <RiYoutubeFill size={16} />
                  </button>
                </div>

                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <Copyright size={11} /> 2026 Privacy policy
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Contact form
              </h2>

              <form className="space-y-4" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  name={contact.name}
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="Enter your Name"
                  className="w-full h-12 bg-[#f3f3f3] px-4 outline-none border-none text-sm"
                />

                <input
                  type="text"
                  name={contact.email}
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="Enter a valid email address"
                  className="w-full h-12 bg-[#f3f3f3] px-4 outline-none border-none text-sm"
                />

                <textarea
                  rows="5"
                  name={contact.message}
                  value={contact.message}
                  onChange={(e) => setContact({ ...contact, message: e.target.value })}
                  placeholder="Enter your message"
                  className="w-full bg-[#f3f3f3] px-4 py-3 outline-none border-none text-sm resize-none"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 cursor-pointer min-w-[120px] border border-black bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  )
}

export default ContactUs