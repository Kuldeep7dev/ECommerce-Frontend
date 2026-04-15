import React, { useEffect, useLayoutEffect, useState } from 'react'
import Pages from '../Component/Global/Pages'
import axiosInstance from '../Config/AxiosInstance';
import { showError } from '../Utils/toaster';

const ContactUs = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!contact.name.trim()) {
      return showError("Name is required");
    };

    if (!contact.email.trim()) {
      return showError("Email is required")
    }

    if (!contact.message.trim()) {
      showError("Message is required")
    }
    try {
      const res = await axiosInstance.post('/contact/message', contact);
    } catch (error) {

    }
  }

  useEffect(() => {
    document.title = "Bravima || Contact-Us"
  }, []);
  return (
    <Pages>
      <div>

      </div>
    </Pages>
  )
}

export default ContactUs