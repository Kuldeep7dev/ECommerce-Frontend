import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, IndianRupee, Star, MessageSquarePlus } from 'lucide-react'
import axiosInstance from '../Config/AxiosInstance'
import Pages from '../Component/Global/Pages'
import { CATEGORY } from '../Constent/product'
import { useAuth } from '../context/AuthContext'
import { showError, showSuccess } from '../Utils/toaster'

const ProductVew = () => {
  const [productView, setProductView] = useState({});
  const [menProduct, setMenProduct] = useState([])
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Bravima || ${slug} Product`
  }, [])

  const fetchProductView = async () => {
    try {
      const res = await axiosInstance.get(`/product/${slug}`);
      setProductView(res.data.product);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMenProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product`)
      setMenProduct(res.data.product);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchReviews = async (productId) => {
    try {
      const res = await axiosInstance.get(`/review/${productId}`)
      setReviews(res.data.review || []);
    } catch (error) {
      console.error("Failed to fetch reviews");
    }
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return navigate('/login');
    if (!newReview.comment.trim()) return showError("Please add a comment");

    setSubmitting(true);
    try {
      await axiosInstance.post('/review', {
        productId: productView._id,
        rating: newReview.rating,
        comment: newReview.comment
      });
      showSuccess("Review submitted! Thank you.");
      setNewReview({ rating: 5, comment: "" });
      fetchReviews(productView._id);
    } catch (error) {
      showError(error.response?.data?.message || "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  const handleAddToCart = async () => {
    try {
      if (!isAuthenticated) {
        navigate('/login')
      };

      const res = await axiosInstance.post('/add-to-cart', {
        userId: user._id,
        productId: productView._id,
        quantity: 1
      });
      showSuccess(`${productView.productName} added to Cart`)
    } catch (error) {
      showError("Failed to add");
      console.log(error?.response?.data?.message || "Failed to add")
    }
  }

  const handleWishlist = async () => {
    try {
      if (!isAuthenticated) {
        navigate('/')
      };

      const res = await axiosInstance.post('/wishlist', {
        userId: user._id,
        productId: productView._id
      });
      console.log(res.data.wishlist);
      showSuccess(`${productView.productName} added to wishlist`);
    } catch (error) {
      showError("Failed to add");
      console.log(error?.response?.data?.message || "Failed to add")
    }
  }

  useEffect(() => {
    const init = async () => {
      await fetchProductView();
      fetchMenProduct();
    }
    init();
    document.title = `Braviam || ${slug}`
  }, [slug]);

  useEffect(() => {
    if (productView._id) {
      fetchReviews(productView._id)
    }
  }, [productView._id]);

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
                  {productView.price}
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
                <button onClick={handleAddToCart} className='flex gap-1 items-center border p-3 font-bold tracking-wider w-44 justify-center cursor-pointer rounded-full bg-primary text-secondary hover:bg-secondary hover:text-primary transition-all duration-300'>
                  Add to cart
                </button>

                <button onClick={handleWishlist} className='flex gap-1 items-center border p-3 font-bold tracking-wider w-44 justify-center cursor-pointer rounded-full bg-accent hover:bg-secondary duration-300 hover:text-primary'>
                  Wishlist <Heart size={18} />
                </button>
              </div>

            </div>
          </div>


          {/* REVIEWS SECTION */}
          <div className='mt-16 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
              <div>
                <h2 className='text-3xl font-black text-secondary tracking-tight'>Customer Reviews</h2>
                <div className='flex items-center gap-2 mt-1'>
                  <div className='flex text-amber-500'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.round(productView.averageRating || 0) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className='text-sm font-bold text-gray-500'>{reviews.length} total reviews</span>
                </div>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className='flex items-center gap-2 px-6 py-3 bg-secondary text-primary rounded-full font-bold hover:bg-black transition-all'
                >
                  <MessageSquarePlus size={18} />
                  Write a review
                </button>
              )}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
              {/* Review List */}
              <div className='lg:col-span-2 space-y-8'>
                {reviews.length > 0 ? (
                  reviews.map((review, idx) => (
                    <div key={idx} className='pb-8 border-b border-gray-50 last:border-0'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-secondary uppercase'>
                          {review.user?.fullName?.charAt(0) || "C"}
                        </div>
                        <div>
                          <p className='font-bold text-secondary'>{review.user?.fullName || "Verified customer"}</p>
                          <div className='flex text-amber-500'>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className='text-gray-600 leading-relaxed'>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className='py-12 text-center bg-gray-50 rounded-2xl'>
                    <p className='text-gray-400 font-medium'>No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>

              {/* Review Form */}
              {isAuthenticated && (
                <div id="review-form" className='lg:col-span-1 bg-gray-50 p-6 rounded-2xl h-fit'>
                  <h3 className='font-bold text-lg text-secondary mb-4'>Share your feedback</h3>
                  <form onSubmit={handleReviewSubmit} className='space-y-4'>
                    <div>
                      <label className='block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2'>Rating</label>
                      <div className='flex gap-2'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={24}
                            className='cursor-pointer transition-colors'
                            fill={i < newReview.rating ? "#f59e0b" : "none"}
                            color={i < newReview.rating ? "#f59e0b" : "#d1d5db"}
                            onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className='block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2'>Your Comment</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className='w-full p-4 rounded-xl border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-secondary min-h-[120px] outline-none text-sm transition-all'
                        placeholder="What did you think of this product?"
                      />
                    </div>
                    <button
                      disabled={submitting}
                      className='w-full py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-black transition-all disabled:opacity-50'
                    >
                      {submitting ? "Submitting..." : "Post Review"}
                    </button>
                  </form>
                </div>
              )}
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
