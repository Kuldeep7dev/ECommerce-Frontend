import React from 'react'
import BreadCrumb from '../../Component/BreadCrumb';


const Dashboard = () => {

  const breadcrumbItems = [
  ];
  return (
    <div>
      <div className='py-6 px-2'>
        <BreadCrumb items={breadcrumbItems} />
      </div>

      <div>
        <h1>Welcome, Kuldeep</h1>
      </div>
    </div>
  )
}

export default Dashboard