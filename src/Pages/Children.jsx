import React, { useEffect, useState } from "react";
import { CATEGORY } from "../Constent/product";
import axiosInstance from "../Config/AxiosInstance";
import Pages from "../Component/Global/Pages";

const Children = () => {
  const [data, setData] = useState([]);
  const fetchChildren = async () => {
    try {
      const res = await axiosInstance.get(`/product?type=${CATEGORY.CHILDREN}`);
      console.log(res.data.product);
      setData(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);
  return (
    <Pages>
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.map((pro) => (
            <Link to={`/product/${pro.slug}`} key={pro._id}>
              <div className="group rounded-2xl overflow-hidden border transition duration-300 cursor-pointer">
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={`http://localhost:9090/${pro.image?.[0]}`}
                    alt={pro.productName}
                    className="w-full h-52 object-cover transition duration-500"
                  />
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <h2 className="text-base font-semibold truncate group-hover:text-black text-gray-700 transition">
                    {pro.productName}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Stock: {pro.stock}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold">₹{pro.price}.00</p>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {pro.colour?.slice(0, 4).map((c, index) => (
                      <span
                        key={index}
                        className="w-4 h-4 rounded-full border shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Pages>
  );
};

export default Children;
