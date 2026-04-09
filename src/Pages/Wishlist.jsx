import React, { useEffect, useState } from 'react'
import Pages from '../Component/Global/Pages'
import axiosInstance from '../Config/AxiosInstance';
import { Heart, ShoppingBag, ShoppingBagIcon, ShoppingBasket, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../Utils/toaster';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const [wishList, setWishList] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const fetchWishlistData = async () => {
    try {
      const res = await axiosInstance.get('/wishlist');
      setWishList(res.data.wishlist);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    } finally {
      setLoading(false)
    }
  };

  const handleAddToCart = async (product) => {
    try {
      if (!isAuthenticated) {
        navigate('/login')
        return;
      };

      const res = await axiosInstance.post('/add-to-cart', {
        userId: user?._id,
        productId: product._id,
        quantity: 1
      });
      showSuccess(`${product.productName} added to Cart`)
    } catch (error) {
      showError("Failed to add");
      console.log(error?.response?.data?.message || "Failed to add")
    }
  }

  const handleDeleteWishlist = async (productId) => {
    try {
      const res = await axiosInstance.delete(`/wishlist/${productId}`);
      fetchWishlistData();
      showSuccess("Item removed from wishlist")
    } catch (error) {
      showError("Failed to remove item")
    }
  }

  useEffect(() => {
    document.title = "Bravima || My Wishlist"
    fetchWishlistData()
  }, [])

  if (loading) {
    return (
      <Pages>
        <div className='flex justify-center items-center h-[60vh]'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      </Pages>
    );
  }
  return (
    <Pages>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 min-h-[80vh]">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <ShoppingBag className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          </div>

          <span className='ml-4 bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
            {wishList.items.length} Items
          </span>
        </div>

        {/* Empty State */}
        {wishList.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-3xl bg-gray-50">
            <div className="bg-primary/10 p-6 rounded-full mb-6">
              <Heart size={40} className="text-primary" />
            </div>

            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6 text-center max-w-md">
              Save items you love to your wishlist and review them anytime.
            </p>

            <Link
              to="/"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (

          /* Grid Layout */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {wishList.items.map((item) => (
              <div
                key={item.productId._id}
                className="group bg-white border rounded-2xl overflow-hidden transition-all duration-300"
              >

                {/* Image */}
                <div className="h-52 flex items-center justify-center p-4">
                  <img
                    src={`http://localhost:9090/${item.productId.image?.[0]}`}
                    alt={item.productId.productName}
                    className="h-full object-contain transition"
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {item.productId.brand}
                    </p>

                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                      {item.productId.productName}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2">

                    <button
                      onClick={() => handleDeleteWishlist(item.productId._id)}
                      className='text-white bg-red-500 hover:text-red-500 hover:bg-white border p-2 rounded-xl transition-colors cursor-pointer'>
                      <span className='flex items-center gap-1'><Trash2 size={18} /></span>
                    </button>

                    <button
                      onClick={() => handleAddToCart(item.productId)}
                      className="text-white bg-secondary hover:text-secondary hover:bg-white border p-2 rounded-xl transition-colors cursor-pointer">
                      <ShoppingBasket size={18} />
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </Pages>
  );
}

export default Wishlist