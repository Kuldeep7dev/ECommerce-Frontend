import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Config/AxiosInstance';
import BreadCrumb from '../../Component/BreadCrumb';

const Contact = () => {
  const [notifications, setNotifications] = useState([]);

  // const fetchNotification = async (userId) => {
  //   try {
  //     const res = await axiosInstance.get(`/notifications/user/${userId}`);
  //     console.log(res.data.data)
  //   } catch (error) {

  //   }
  // }

  // useEffect(() => {
  //   fetchNotification()
  // }, [])

  useEffect(() => {
    document.title = "Bravima || Admin Contact"
  })

  const breadcrumbItems = [
    { title: "Contact", link: '/contact' }
  ]
  return (
    <div className='py-6 px-2'>
      <BreadCrumb items={breadcrumbItems} />
      <div></div>

    </div>
  )
}


export default Contact