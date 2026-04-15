import React, { useEffect, useState } from "react";
import axiosInstance from "../../Config/axiosConfig";
import { Link } from "react-router-dom";
import Pages from "../Globel/Pages";

const SubSection = () => {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/product");
      setProduct(res.data.product);
    } catch (error) {
      console.log("Error in fetchProduct", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Pages>
      <div className="px-10 md:px-20 py-10">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Our Top Products
        </h1>

        {product.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {product.slice(0, 10).map((pro) => (
              <Link to={`/product/${pro.slug}`} key={pro._id}>
                <div className="rounded-xl overflow-hidden border hover:shadow-lg transition cursor-pointer">

                  {/* IMAGE */}
                  <img
                    src={`https://bravimaserver.vercel.app/${pro.image[0]}`}
                    alt={pro.productName}
                    className="w-full h-48 p-2"
                  />

                  {/* DETAILS */}
                  <div className="p-4">
                    <h2 className="text-lg font-medium truncate">
                      {pro.productName}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Stock: {pro.stock}
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      ₹{pro.price}.00
                    </p>

                    {/* COLORS */}
                    <div className="flex items-center gap-2 mt-3">
                      {pro.colour?.map((c, index) => (
                        <span
                          key={index}
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Pages>
  );
};

export default SubSection;
