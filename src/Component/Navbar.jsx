import { Heart, LogIn, Search, ShoppingBasket, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CATEGORY } from '../Constent/product';
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [account, setAccount] = useState(false);
    const { user, isAuthenticated, logout, } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `p-2 tracking-widest font-bold transition-colors duration-200 hover:text-accent ${isActive ? 'text-green-500' : ''
        }`

    const iconLinkClass = ({ isActive }) =>
        `p-2 transition-colors duration-200 hover:text-accent ${isActive ? 'text-green-500' : ''
        }`

    return (
        <div>
            <nav className='fixed top-4 left-0 right-0  z-50 p-2 flex justify-around items-center text-primary mx-10 rounded-xl bg-secondary'>

                <div>
                    <NavLink to='/' className='text-2xl font-bold' style={{ fontFamily: 'Dancing Script' }}>
                        bravima
                    </NavLink>
                </div>

                <div className='flex gap-10 text-sm duration-200'>

                    <NavLink to='/men' className={navLinkClass}>{CATEGORY.MEN}</NavLink>
                    <NavLink to='/women' className={navLinkClass}>{CATEGORY.WOMEN}</NavLink>
                    <NavLink to='/children' className={navLinkClass}>{CATEGORY.CHILDREN}</NavLink>
                </div>

                <div className='flex'>
                    <NavLink to='/search' className={iconLinkClass}>
                        <Search strokeWidth={1.5} size={19} />
                    </NavLink>

                    {/* ACCOUNT BUTTON */}
                    <button onClick={() => setAccount(prev => !prev)} className='p-2 hover:text-accent cursor-pointer'>
                        <User size={20} strokeWidth={1.5} />
                    </button>

                    <NavLink to='/cart' className={iconLinkClass}>
                        <ShoppingBasket size={20} strokeWidth={1.5} />
                    </NavLink>

                    <NavLink to='/wishlist' className={iconLinkClass}>
                        <Heart size={20} strokeWidth={1.5} />
                    </NavLink>
                </div>
            </nav>
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
                                            className="border text-secondary bg-primary rounded-sm p-2 flex justify-center items-center gap-1 cursor-pointer w-24 text-xs"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-primary font-semibold">{user?.fullName}</p>
                                    </>
                                )}

                                <button
                                    onClick={logout}
                                    className="border text-secondary bg-primary rounded-sm p-2 cursor-pointer w-full"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/signup" className='border text-secondary bg-primary rounded-sm p-2 flex justify-center items-center gap-1 cursor-pointer w-20'>SignUp</Link>
                                <Link to="/login" className='border text-secondary bg-primary rounded-sm p-2 flex justify-center items-center gap-1 cursor-pointer w-20'>Login</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
