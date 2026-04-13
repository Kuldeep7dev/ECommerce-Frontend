import { Heart, Search, ShoppingBasket, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CATEGORY } from '../Constent/product'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../Config/AxiosInstance'

const Navbar = () => {
    const { isAuthenticated } = useAuth()
    const [count, setCount] = useState({ items: [] })
    const [wishCount, setWishCount] = useState({ items: [] })
    const navigate = useNavigate()

    // ✅ NavLink styles
    const navLinkClass = ({ isActive }) =>
        `p-2 tracking-widest font-bold transition-colors duration-200 hover:text-accent ${isActive ? 'text-green-500' : ''
        }`

    const iconLinkClass = ({ isActive }) =>
        `p-2 flex items-center justify-center transition-colors duration-200 hover:text-accent ${isActive ? 'text-green-500' : ''
        }`

    // ✅ Fetch Cart Count
    const fetchCountValue = async () => {
        try {
            const res = await axiosInstance.get('/add-to-cart')
            if (res.data?.cart) {
                setCount(res.data.cart)
            }
        } catch (error) {
            console.log('Cart count error:', error)
        }
    }

    // ✅ Fetch Wishlist Count
    const handleWishlist = async () => {
        try {
            const res = await axiosInstance.get('/wishlist')
            if (res.data?.wishlist) {
                setWishCount(res.data.wishlist)
            }
        } catch (error) {
            console.log('Wishlist error:', error)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchCountValue()
            handleWishlist()
        }
    }, [isAuthenticated])

    // ✅ Protect routes
    const handleProtectedNavigation = (e) => {
        if (!isAuthenticated) {
            e.preventDefault()
            navigate('/login')
        }
    }

    // ✅ Profile navigation (only when logged in)
    const handleProfileNavigate = () => {
        navigate('/user/profile')
    }

    return (
        <nav className='fixed top-4 left-0 right-0 z-50 p-2 flex justify-around items-center text-primary mx-10 rounded-xl bg-secondary'>

            {/* LOGO */}
            <NavLink to='/' className='text-2xl font-bold' style={{ fontFamily: 'Dancing Script' }}>
                bravima
            </NavLink>

            {/* MENU */}
            <div className='flex gap-5 text-sm'>
                <NavLink to='/men' className={navLinkClass}>{CATEGORY.MEN}</NavLink>
                <NavLink to='/women' className={navLinkClass}>{CATEGORY.WOMEN}</NavLink>
                <NavLink to='/children' className={navLinkClass}>{CATEGORY.CHILDREN}</NavLink>
            </div>

            {/* RIGHT SECTION */}
            <div className='flex items-center gap-1'>

                {/* SEARCH */}
                <NavLink to='/search' className={iconLinkClass}>
                    <Search size={19} strokeWidth={1.5} />
                </NavLink>

                {/* 👇 CONDITIONAL AUTH UI */}
                {isAuthenticated ? (
                    <>
                        {/* USER PROFILE */}
                        <button
                            onClick={handleProfileNavigate}
                            className='p-2 flex items-center justify-center hover:text-accent cursor-pointer'
                        >
                            <User size={20} strokeWidth={1.5} />
                        </button>

                        {/* CART */}
                        <NavLink
                            to='/cart'
                            onClick={(e) => handleProtectedNavigation(e)}
                            className={({ isActive }) => `${iconLinkClass({ isActive })} relative`}
                        >
                            {count?.items?.length > 0 && (
                                <span className="absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 bg-accent text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {count.items.length}
                                </span>
                            )}
                            <ShoppingBasket size={20} strokeWidth={1.5} />
                        </NavLink>

                        {/* WISHLIST */}
                        <NavLink
                            to='/wishlist'
                            onClick={(e) => handleProtectedNavigation(e)}
                            className={({ isActive }) => `${iconLinkClass({ isActive })} relative`}
                        >
                            {wishCount?.items?.length > 0 && (
                                <span className="absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 bg-accent text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {wishCount.items.length}
                                </span>
                            )}
                            <Heart size={20} strokeWidth={1.5} />
                        </NavLink>
                    </>
                ) : (
                    /* ❌ NOT LOGGED IN */
                    <div className='flex gap-2'>
                        <Link to="/signup" className='border text-secondary bg-primary rounded-xl px-3 py-1'>
                            SignUp
                        </Link>
                        <Link to="/login" className='border text-secondary bg-primary rounded-xl px-3 py-1'>
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar