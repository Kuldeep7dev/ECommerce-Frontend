import {
  CircleUser,
  LayoutDashboard,
  MessageCircle,
  Package,
  ShoppingCart
} from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom'
import axiosInstance from "../../../Config/axiosConfig"
import toast from "react-hot-toast"
import { useEffect, useState } from "react";

const Sidebar = () => {
  const sideLinks = [
    { title: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
    { title: "Orders", link: "/orders", icon: ShoppingCart },
    { title: "Product", link: "/products", icon: Package },
    { title: "Users", link: "/users", icon: CircleUser },
    { title: "Re", link: "/contact", icon: MessageCircle },
  ]

  return (
    <div className="relative">
      <aside className='bg-primary text-secondary w-60 flex flex-col p-3 h-screen fixed top-0 left-0'>

        <NavLink to='/adminpanel' className='text-lg text-center'>
          <span className='font-bold tracking-wider' style={{ fontFamily: 'Dancing Script' }}>
            Bravima
          </span> Dashboard
        </NavLink>

        <div className='py-2 w-full'>
          <hr className='border-secondary w-full' />
        </div>

        {/* NAV LINKS */}
        <ul className='w-full flex flex-col gap-3 mt-5'>
          {sideLinks.map((item, idx) => {
            const Icon = item.icon

            return (
              <li key={idx}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded transition 
                  ${isActive
                      ? 'bg-secondary text-primary font-semibold'
                      : 'hover:bg-secondary hover:text-primary'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                      {item.title}
                    </>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>

      </aside>
    </div>
  )
}

export default Sidebar
