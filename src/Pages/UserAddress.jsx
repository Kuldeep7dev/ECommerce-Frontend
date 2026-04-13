import React, { useState } from 'react'
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

        if (!address.street.trim()) {
            return showError("Street address is required");
        };

        if (!address.city.trim()) {
            return showError("City name is required");
        };

        if (!address.state.trim()) {
            return showError("State name is required");
        };

        if (!address.postalCode.trim()) {
            return showError("Postal code is required");
        };

        if (!address.country) {
            showError("Please select your country")
        }
        try {
            if (!user?._id) {
                return showError("You must be logged in to update your address");
            }
            const res = await axiosInstance.put(`/auth/shipping-address/${user._id}`, address);
            console.log(res.data.user);
            navigate('/user/profile');
        } catch (error) {
            showError("Some problem to add you address");
        }
    }
    return (
        <Pages>
        <div className='flex 
                flex-col 
                justify-center 
                items-center 
                h-screen 
                rounded-2xl 
                p-6 
              bg-primary 
                shadow-md
                bg-[radial-gradient(circle,_#d1d5db_1px,_transparent_1px)]
                bg-[size:18px_18px]
        '>
            <div>
                <h1 className='text-3xl' style={{ fontFamily: "Poppins" }}>Address</h1>
            </div>

            <form onSubmit={handleAddAddress} className='flex flex-col justify-center items-center gap-3 border p-5 rounded-xl'>
                <input
                    type="text"
                    name={address.street}
                    value={address.street}
                    onChange={(e) => setAddess({ ...address, street: e.target.value })}
                    placeholder='Street'
                    className='outline-0 border rounded-lg p-2 w-82 bg-primary'
                />

                <input
                    type="text"
                    name={address.city}
                    value={address.city}
                    onChange={(e) => setAddess({ ...address, city: e.target.value })}
                    placeholder='City'
                    className='outline-0 border rounded-lg p-2 w-82 bg-primary'
                />

                <input
                    type="text"
                    name={address.state}
                    value={address.state}
                    onChange={(e) => setAddess({ ...address, state: e.target.value })}
                    placeholder='State'
                    className='outline-0 border rounded-lg p-2 w-82 bg-primary'
                />

                <input
                    type="text"
                    name={address.postalCode}
                    value={address.postalCode}
                    onChange={(e) => setAddess({ ...address, postalCode: e.target.value })}
                    placeholder='Postal Code'
                    maxLength={10}
                    className='outline-0 border rounded-lg p-2 w-82 bg-primary'
                />

                <select
                    name="country"
                    value={address.country}
                    onChange={(e) =>
                        setAddess({ ...address, country: e.target.value })
                    }
                    className='outline-0 border rounded-lg p-2 w-82 cursor-pointer bg-primary'
                >
                    <option value="">Select Country</option>

                    {Object.entries(Country[0]).map(([key, value]) => (
                        <option className='bg-secondary text-primary' key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>

                <div>
                    <button type='submit' className='bg-secondary text-primary w-82 p-2 rounded-xl cursor-pointer border hover:bg-primary hover:text-secondary hover:shadow duration-200 font-bold'>Submit</button>
                </div>

            </form>
        </div>
        </Pages>
    )
}

export default UserAddress