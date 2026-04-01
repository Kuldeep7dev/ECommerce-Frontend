import React, { useEffect, useState } from "react";
import { CATEGORY } from "../Constent/product";
import axiosInstance from "../Config/AxiosInstance";
import Pages from "../Component/Global/Pages";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Children = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchdata = async () => {
    try {
      setLoading(true);

      let url = `/product?type=${CATEGORY.CHILDREN}`;

      if (debouncedSearch.trim() !== "") {
        url += `&q=${debouncedSearch}`;
      }

      const res = await axiosInstance.get(url);
      setData(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <Pages>


      <div className="flex items-center gap-2 border w-100 p-2 mt-20 ml-10 rounded-xl">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-0 w-93"
        />
      </div>


      {loading && (
        <p className="text-center text-gray-500 flex justify-center items-center h-[60vh]">Loading...</p>
      )}

      {/* EMPTY */}
      {!loading && data.length === 0 && (
        <p className="text-center text-gray-500 flex justify-center items-center h-[60vh]">
          No data product are available
        </p>
      )}
      <div className="flex justify-center items-center ">
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
