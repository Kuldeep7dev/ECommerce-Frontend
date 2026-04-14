import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Component/BreadCrumb';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../Config/AxiosInstance';
import Pages from '../../Component/Global/Pages';
import { Doughnut } from 'react-chartjs-2';
import { Users, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [recentReviews, setRecentReviews] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [userRes, productRes, reviewRes] = await Promise.all([
        axiosInstance.get('/auth/get-count'),
        axiosInstance.get('/product/get-count'),
        axiosInstance.get('/review')
      ]);

      setUserCount(userRes.data.user || 0);
      setProductCount(productRes.data.product || 0);
      setRecentReviews(reviewRes.data.review?.slice(-5).reverse() || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, []);

  const dataCount = {
    labels: ['Total Users', 'Capacity'],
    datasets: [
      {
        label: "Registered Users",
        data: [userCount],
        backgroundColor: [
          '#10100e', // Primary Dark
          'rgba(16, 16, 14, 0.1)', // Faded Dark
        ],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: '75%',
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return (
      <Pages>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      </Pages>
    );
  }

  return (
    <Pages>
      <div className='p-4 md:p-8 max-w-7xl mx-auto'>
        <div className='mb-8'>
          <BreadCrumb />
        </div>

        <div className='mb-10'>
          <h1 className='text-3xl font-extrabold tracking-tight text-secondary'>
            Welcome back, <span className='text-accent'>{user?.fullName}</span>
          </h1>
          <p className='text-gray-500 mt-2'>Here's a snapshot of your store's performance today.</p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <StatCard
            title="Total Users"
            value={userCount}
            icon={<Users className="w-6 h-6" />}
            color="bg-blue-600"
          />
          <StatCard
            title="Inventory"
            value={productCount}
            icon={<Package className="w-6 h-6" />}
            color="bg-amber-600"
          />
          <StatCard
            title="Total Reviews"
            value={recentReviews.length}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="bg-emerald-600"
          />
          <StatCard
            title="Growth"
            value={`${Math.min(100, Math.round((userCount / 100) * 100))}%`}
            icon={<TrendingUp className="w-6 h-6" />}
            color="bg-rose-600"
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Chart Card */}
          <div className='lg:col-span-1 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='font-bold text-lg text-secondary'>User Analytics</h2>
              <span className='px-3 py-1 bg-gray-100 text-[10px] uppercase font-bold rounded-full text-gray-500'>Real-time</span>
            </div>

            <div className='relative h-64 flex items-center justify-center'>
              <div style={{ width: '220px', height: '220px' }}>
                <Doughnut data={dataCount} options={chartOptions} />
              </div>
              <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                <span className='text-4xl font-black text-secondary leading-none'>{userCount}</span>
                <span className='text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-1'>Users</span>
              </div>
            </div>

            <div className='mt-8 space-y-3'>
              <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                  <div className='w-3 h-3 rounded-full bg-secondary'></div>
                  <span className='text-gray-600'>Active Registrations</span>
                </div>
                <span className='font-bold'>{userCount}</span>
              </div>
            </div>
          </div>

          {/* Activity Placeholder */}
          <div className='lg:col-span-2 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col'>
            <div className='flex items-center justify-between mb-8'>
              <h2 className='font-bold text-lg text-secondary'>Recent Reviews</h2>
              {/* <button className='text-sm text-accent font-semibold hover:underline'>View all</button> */}
            </div>

            {recentReviews.length > 0 ? (
              <div className='space-y-4'>
                {recentReviews.map((review, idx) => (
                  <div key={idx} className='flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100'>
                    <div className='w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold'>
                      {review.rating}★
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-semibold text-secondary'>{review.comment}</p>
                      <p className='text-xs text-gray-400 mt-1'>Verified Purchase</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex-1 flex flex-col items-center justify-center text-center opacity-40'>
                <div className='p-6 bg-gray-50 rounded-full mb-4'>
                  <TrendingUp className='w-12 h-12 text-gray-400' />
                </div>
                <p className='text-gray-500 font-medium'>No metrics available for the past 24 hours.</p>
                <p className='text-sm text-gray-400'>Sync your shop to see real-time updates.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Pages>
  )
}

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className='bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group scale-100 hover:scale-[1.02] active:scale-[0.98]'>
    <div className='flex justify-between items-start mb-4'>
      <div className={`p-3 rounded-2xl ${color} text-white shadow-lg shadow-opacity-20 transition-transform group-hover:rotate-6`}>
        {icon}
      </div>
      {trend && (
        <span className='text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full'>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className='text-gray-500 text-sm font-medium'>{title}</p>
      <h2 className='text-3xl font-black text-secondary mt-1'>{value}</h2>
    </div>
  </div>
)

export default Dashboard