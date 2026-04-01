import React, { useEffect, useState } from 'react'
import Pages from '../Component/Global/Pages'
import { Link } from 'react-router-dom'
import { Search as SearchIcon } from 'lucide-react'
import axiosInstance from '../Config/AxiosInstance'

const Search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchdata = async () => {
    try {
      setLoading(true);

      let url = `/product`;

      if (debouncedSearch.trim() !== "") {
        url += `?q=${debouncedSearch}`;
      }

      const res = await axiosInstance.get(url);
      setData(res.data.product || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [debouncedSearch]);

  return (
    <Pages>
      <div className='px-10 py-10'>
        <div className="flex items-center gap-2 border w-100 p-2 mt-20 ml-10 rounded-xl">
          <SearchIcon size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full max-w-lg"
          />
        </div>

        <div className="px-6 py-10">
          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500 flex justify-center items-center h-[60vh]">Loading...</p>
          )}

          {/* EMPTY */}
          {!loading && data.length === 0 && (
            <p className="text-center text-gray-500">
              No products available matching your search.
            </p>
          )}

          {/* RESULTS */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-3 mt-10">
            {data.map((pro) => (
              <Link to={`/product/${pro.slug}`} key={pro._id}>
                <div className="group rounded-2xl overflow-hidden border transition duration-300 cursor-pointer">

                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <img
                      src={`http://localhost:9090/${pro.image[0]}`}
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
      </div>
    </Pages>
  )
}

export default Search