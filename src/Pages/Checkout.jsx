import React, { useEffect, useState } from 'react';
import axiosInstance from '../Config/AxiosInstance';
import { showError, showSuccess } from '../Utils/toaster';
import Pages from '../Component/Global/Pages';
import { IndianRupee, CreditCard, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axiosInstance.get('/add-to-cart');
        setCart(data.cart);
      } catch (error) {
        showError("Failed to fetch cart details");
        navigate('/cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  // FRONTEND handlePayment FIXED

  const handlePayment = async () => {
    try {
      setProcessing(true);

      const { data } = await axiosInstance.post(
        "/payment/create-payment",
        {
          items: cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity
          }))
        }
      );

      const order = data.paymentOrder;

      if (!window.Razorpay) {
        showError("Razorpay not loaded");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_TEST_API,
        amount: order.amount,
        currency: order.currency,
        name: "Bravima",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            const verify = await axiosInstance.post(
              "/payment/verify-payment",
              response
            );

            if (verify.data.success) {
              await axiosInstance.delete("/add-to-cart/clear");
              showSuccess("Order Placed Successfully 🎉");
              navigate("/"); // Adjusted to /user/profile since /orders might not exist
            } else {
              showError("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            showError("An error occurred during payment verification");
          }
        }
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        showError(response.error.description);
      });

      razor.open();

    } catch (error) {
      showError(error.response?.data?.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Pages>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Pages>
    );
  }

  return (
    <Pages>
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Side: Order Review */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-500">Review your items and complete your purchase.</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Truck size={20} className="text-primary" />
                  Review Items ({cart?.items?.length})
                </h2>
              </div>
              <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
                {cart?.items?.map((item) => (
                  <div key={item.productId._id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                      <img
                        src={`http://localhost:9090/${item.productId.image?.[0]}`}
                        alt={item.productId.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{item.productId.productName}</h3>
                      <p className="text-sm text-gray-400">{item.productId.brand}</p>
                      <div className="flex justify-between mt-2 items-center">
                        <span className="text-sm font-semibold">Qty: {item.quantity}</span>
                        <span className="font-bold flex items-center">
                          <IndianRupee size={12} />
                          {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4 items-center">
                <div className="p-3 bg-blue-500 rounded-xl text-white">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase">Secure Payment</p>
                  <p className="text-sm text-blue-800">Your data is encrypted</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex gap-4 items-center">
                <div className="p-3 bg-green-500 rounded-xl text-white">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase">Fast Delivery</p>
                  <p className="text-sm text-green-800">3-5 Business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Summary */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <CreditCard className="text-primary" />
                Payment Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold flex items-center">
                    <IndianRupee size={14} />
                    {cart?.totalPrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Processing Fee</span>
                  <span className="font-semibold">₹0</span>
                </div>
                <div className="pt-6 mt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-3xl font-black text-secondary flex items-center">
                      <IndianRupee size={24} />
                      {cart?.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing || !cart || cart.items.length === 0}
                className="w-full bg-black hover:bg-gray-800 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 group shadow-lg shadow-gray-900/10"
              >
                {processing ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Payment
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <p className="mt-6 text-center text-sm text-gray-400 flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-green-500" />
                Powered by Razorpay Secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </Pages>
  );
};

export default Checkout;