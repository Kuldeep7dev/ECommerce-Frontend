import React from 'react'
import BreadCrumb from '../../Component/BreadCrumb';
import { useAuth } from '../../context/AuthContext';


const Dashboard = () => {
  const { user } = useAuth()

  const breadcrumbItems = [
  ];
  return (
    <div>
      <div className='py-6 px-2'>
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div>
        <h1>Welcome, {user?.fullName}</h1>
      </div>
    </div>
  )
}

export default Dashboard