import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, IndianRupee } from 'lucide-react'
import axiosInstance from '../Config/AxiosInstance'
import Pages from '../Component/Global/Pages'
import { CATEGORY } from '../Constent/product'

const ProductVew = () => {
  const [productView, setProductView] = useState({});
  const [menProduct, setMenProduct] = useState([])
  const { slug } = useParams()

  const fetchProductView = async () => {
    try {
      const res = await axiosInstance.get(`/product/${slug}`);
      setProductView(res.data.product)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMenProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product`)
      setMenProduct(res.data.product)
      console.log(res.data.product)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProductView()
    fetchMenProduct()
  }, [slug]);

  const handleCart = () => {
    alert(`${slug} in cart`)
  }

  return (
    <Pages>
      <div className="min-h-screen">

        {/* MAIN PRODUCT SECTION */}
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10 rounded-2xl border mt-5">

            {/* IMAGE */}
            <div className="flex justify-center items-center rounded-xl p-6">
              <img
                src={`http://localhost:9090/${productView?.image?.[0]}`}
                alt={productView.productName}
                className="w-full max-w-md object-contain"
              />
            </div>

            {/* PRODUCT INFO (YOUR CARD UI — untouched structure) */}
            <div className="flex flex-col justify-center">

              <p className='text-2xl font-semibold mb-6'>{productView.productName}</p>

              <div className="mb-6">
                <p className='flex items-center text-xl font-bold'>
                  <IndianRupee size={18} />
                  {productView.price}.00
                </p>
                <p className='text-gray-500 font-bold text-xs tracking-wider'>
                  Inclusive of all taxes
                </p>
              </div>

              {/* COLORS */}
              <div className="flex items-center gap-2 mb-8">
                {productView.colour?.map((c, index) => (
                  <span
                    key={index}
                    className="w-6 h-6 rounded-full border-2 transition"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              {/* BUTTONS */}
              <div className='flex gap-4'>
                <button onClick={handleCart} className='flex gap-1 items-center border p-3 font-bold tracking-wider w-44 justify-center cursor-pointer rounded-full bg-primary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300'>
                  Add to cart
                </button>

                <button className='flex gap-1 items-center border p-3 font-bold tracking-wider w-44 justify-center cursor-pointer rounded-full bg-accent hover:bg-secondary duration-300 hover:text-primary'>
                  Wishlist <Heart size={18} />
                </button>
              </div>

            </div>
          </div>





          {/* MORE PRODUCTS */}
          <div className='mt-14'>
            <h1 className='text-2xl font-bold mb-6'>More Men Shoes</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {menProduct?.slice(0, 4)?.map((men) => (
                <Link to={`/${men.slug}`} key={men._id}>
                  <div className="rounded-xl overflow-hidden border hover:shadow-lg transition cursor-pointer">

                    {/* IMAGE */}
                    <img
                      src={`http://localhost:9090/${men.image?.[0]}`}
                      alt={men?.productName}
                      className="w-full h-48 p-2"
                    />

                    {/* DETAILS */}
                    <div className="p-4">
                      <h2 className="text-lg font-medium truncate">
                        {men.productName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        Stock: {men.stock}
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        ₹{men.price}.00
                      </p>

                      {/* COLORS */}
                      <div className="flex items-center gap-2 mt-3">
                        {men.colour?.map((c, index) => (
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
          </div>

        </div>
      </div>
    </Pages>
  )
}

export default ProductVew
