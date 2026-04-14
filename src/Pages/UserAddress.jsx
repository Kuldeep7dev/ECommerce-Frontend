import React, { useEffect, useState } from 'react'
import axiosInstance from '../Config/AxiosInstance';
import Pages from '../Component/Global/Pages';
import { useNavigate } from 'react-router';
import { showError } from '../Utils/toaster';
import { Country } from '../Constants/Country';
import { useAuth } from '../context/AuthContext';

const UserAddress = () => {
    const [address, setAddess] = useState({
        street: "Kailash nagar, memco char rasta, naroda road, Ahmedabad, Gujarat",
        city: "Ahmedabad",
        state: "Gujarat",
        postalCode: "382345",
        country: ""
    });

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleAddAddress = async (e) => {
        e.preventDefault();

        if (!address.street.trim()) return showError("Street address is required");
        if (!address.city.trim()) return showError("City name is required");
        if (!address.state.trim()) return showError("State name is required");
        if (!address.postalCode.trim()) return showError("Postal code is required");
        if (!address.country) return showError("Please select your country");

        try {
            if (!user?._id) {
                return showError("You must be logged in to update your address");
            }

            await axiosInstance.put(`/auth/shipping-address/${user._id}`, address);
            navigate('/user/profile');

        } catch (error) {
            showError("Some problem to add your address");
        }
    };

    useEffect(() => {
        document.title = "Bravima || Address"
    }, [])

    return (
        <Pages>
            <div
                className='min-h-screen flex justify-center items-center px-4 bg-primary
                bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)]
                bg-[size:18px_18px]'
            >

                <div className='w-full max-w-xl border rounded-3xl shadow-lg bg-primary p-8 backdrop-blur-sm'>

                    <div className='text-center mb-8'>
                        <h1
                            className='text-4xl font-bold tracking-tight text-secondary'
                            style={{ fontFamily: "Poppins" }}
                        >
                            Shipping Address
                        </h1>

                        <p className='text-sm mt-2 opacity-70'>
                            Update your delivery details
                        </p>
                    </div>

                    <form
                        onSubmit={handleAddAddress}
                        className='flex flex-col gap-4'
                    >

                        <input
                            type="text"
                            value={address.street}
                            onChange={(e) =>
                                setAddess({ ...address, street: e.target.value })
                            }
                            placeholder='Street Address'
                            className='outline-0 border rounded-xl px-4 py-3 bg-primary w-full focus:shadow-md transition'
                        />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type="text"
                                value={address.city}
                                onChange={(e) =>
                                    setAddess({ ...address, city: e.target.value })
                                }
                                placeholder='City'
                                className='outline-0 border rounded-xl px-4 py-3 bg-primary w-full focus:shadow-md transition'
                            />

                            <input
                                type="text"
                                value={address.state}
                                onChange={(e) =>
                                    setAddess({ ...address, state: e.target.value })
                                }
                                placeholder='State'
                                className='outline-0 border rounded-xl px-4 py-3 bg-primary w-full focus:shadow-md transition'
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type="text"
                                value={address.postalCode}
                                maxLength={10}
                                onChange={(e) =>
                                    setAddess({
                                        ...address,
                                        postalCode: e.target.value
                                    })
                                }
                                placeholder='Postal Code'
                                className='outline-0 border rounded-xl px-4 py-3 bg-primary w-full focus:shadow-md transition'
                            />

                            <select
                                value={address.country}
                                onChange={(e) =>
                                    setAddess({
                                        ...address,
                                        country: e.target.value
                                    })
                                }
                                className='outline-0 border rounded-xl px-4 py-3 bg-primary w-full cursor-pointer focus:shadow-md transition'
                            >
                                <option value="">Select Country</option>

                                {Object.entries(Country[0]).map(([key, value]) => (
                                    <option
                                        key={key}
                                        value={key}
                                        className='bg-secondary text-primary'
                                    >
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type='submit'
                            className='mt-3 bg-secondary text-primary w-full py-3 rounded-xl cursor-pointer border font-bold
                            hover:bg-primary hover:text-secondary hover:shadow-lg duration-200 active:scale-[0.98]'
                        >
                            Save Address
                        </button>

                    </form>

                </div>
            </div>
        </Pages>
    )
}

export default UserAddress;