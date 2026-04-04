import { Heart, Search, ShoppingBasket, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CATEGORY } from '../Constent/product'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../Config/AxiosInstance'

const Navbar = () => {
    const [account, setAccount] = useState(false)
    const { user, isAuthenticated, logout } = useAuth()
    const [count, setCount] = useState({ items: [] });
    const [wishCount, setWishCount] = useState({ items: [] });

    const navLinkClass = ({ isActive }) =>
        `p-2 tracking-widest font-bold transition-colors duration-200 hover:text-accent ${isActive ? 'text-green-500' : ''
        }`

    const iconLinkClass = ({ isActive }) =>
        `p-2 flex items-center justify-center transition-colors duration-200 hover:text-accent ${isActive ? 'text-green-500' : ''
        }`

    const fetchCountValue = async () => {
        try {
            const res = await axiosInstance.get('/add-to-cart')
            if (res.data && res.data.cart) {
                setCount(res.data.cart)
            }
        } catch (error) {
            console.log('Error to get count: ', error)
        }
    }

    const handleWishlist = async () => {
        try {
            const res = await axiosInstance.get('/wishlist');
            if (res.data && res.data.wishlist) {
                setWishCount(res.data.wishlist)
            }
        } catch (error) {
            console.log("Error to get wish count: ", error);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchCountValue()
            handleWishlist()
        }
    }, [isAuthenticated])

    return (
        <div>
            <nav className='fixed top-4 left-0 right-0 z-50 p-2 flex justify-around items-center text-primary mx-10 rounded-xl bg-secondary'>

                {/* LOGO */}
                <div>
                    <NavLink to='/' className='text-2xl font-bold' style={{ fontFamily: 'Dancing Script' }}>
                        bravima
                    </NavLink>
                </div>

                {/* MENU */}
                <div className='flex gap-10 text-sm'>
                    <NavLink to='/men' className={navLinkClass}>{CATEGORY.MEN}</NavLink>
                    <NavLink to='/women' className={navLinkClass}>{CATEGORY.WOMEN}</NavLink>
                    <NavLink to='/children' className={navLinkClass}>{CATEGORY.CHILDREN}</NavLink>
                </div>

                {/* ICONS */}
                <div className='flex items-center '>

                    <NavLink to='/search' className={iconLinkClass}>
                        <Search strokeWidth={1.5} size={19} />
                    </NavLink>

                    <button
                        onClick={() => setAccount(prev => !prev)}
                        className='p-2 flex items-center justify-center hover:text-accent cursor-pointer'
                    >
                        <User size={20} strokeWidth={1.5} />
                    </button>

                    <div className='flex gap-3'>
                        <NavLink to='/cart' className={`${iconLinkClass} relative cursor-pointer`}>
                            {isAuthenticated && count?.items?.length > 0 && (
                                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-accent hover:text-accent hover:bg-white duration-200 text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {count.items.length}
                                </span>
                            )}
                            <ShoppingBasket size={20} strokeWidth={1.5} />
                        </NavLink>

                        <NavLink to='/wishlist' className={`${iconLinkClass} relative cursor-pointer`}>
                            {isAuthenticated && wishCount?.items?.length > 0 && (
                                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-accent hover:text-accent hover:bg-white duration-200 bg-accent text-primary text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {wishCount.items.length}
                                </span>
                            )}
                            <Heart size={20} strokeWidth={1.5} />
                        </NavLink>
                    </div>

                </div>
            </nav>

            {/* ACCOUNT DROPDOWN */}
            <div className='absolute top-18 left-[80%] w-25'>
                {account && (
                    <div className="absolute border right-0 mt-3 bg-secondary text-black shadow-lg rounded-lg p-3 flex gap-2 z-50">

                        {isAuthenticated ? (
                            <div className="flex flex-col gap-2">

                                {user?.role === "admin" ? (
                                    <>
                                        <p className="text-sm text-primary font-bold italic">Administrator</p>
                                        <Link
                                            to="/dashboard"
                                            className="border text-secondary bg-primary rounded-sm p-2 text-xs text-center"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <p className="text-sm text-primary font-semibold">
                                        {user?.fullName}
                                    </p>
                                )}

                                <button
                                    onClick={logout}
                                    className="border text-secondary bg-primary rounded-sm p-2 cursor-pointer"
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <>
                                <Link to="/signup" className='border text-secondary bg-primary rounded-sm p-2 text-center w-20'>
                                    SignUp
                                </Link>
                                <Link to="/login" className='border text-secondary bg-primary rounded-sm p-2 text-center w-20'>
                                    Login
                                </Link>
                            </>
                        )}

                    </div>
                )}
            </div>
        </div>
    )

}

export default Navbar