import React, { useState } from 'react'
import axiosInstance from '../Config/AxiosInstance';
import Pages from '../Component/Global/Pages';
import { useNavigate } from 'react-router';
import { showError } from '../Utils/toaster';
import { Country } from '../Constants/Country';

const UserAddress = () => {
    const [address, setAddess] = useState({
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: ""
    });
    const navigate = useNavigate();

    const handleAddAddress = async (e, id) => {
        e.preventDefault();

        if (condition) {

        }
        try {
            const res = await axiosInstance.put(`/auth/shipping-address/${id}`, address);
            console.log(res.data.user);
            navigate('/user/profile');
        } catch (error) {
            showError("Some problem to add you address");
        }
    }
    return (
        // <Pages>
        <div className='flex flex-col justify-center items-center h-screen'>
            <div>
                <h1 className='' style={{ fontFamily: "Poppins" }}>Address</h1>
            </div>

            <form onSubmit={handleAddAddress}>
                <input
                    type="text"
                    name={address.street}
                    value={address.street}
                    onChange={(e) => setAddess({ ...address, street: e.target.value })}
                    placeholder='Street'
                />

                <input
                    type="text"
                    name={address.city}
                    value={address.city}
                    onChange={(e) => setAddess({ ...address, city: e.target.value })}
                    placeholder='City'
                />

                <input
                    type="text"
                    name={address.state}
                    value={address.state}
                    onChange={(e) => setAddess({ ...address, state: e.target.value })}
                    placeholder='State'
                />

                <input
                    type="text"
                    name={address.postalCode}
                    value={address.postalCode}
                    onChange={(e) => setAddess({ ...address, postalCode: e.target.value })}
                    placeholder='Postal Code'
                />

                <select
                    name="country"
                    value={address.country}
                    onChange={(e) =>
                        setAddess({ ...address, country: e.target.value })
                    }
                >
                    <option value="">Select Country</option>

                    {Object.entries(Country[0]).map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
                </select>


            </form>
        </div>
        // </Pages>
    )
}

export default UserAddress