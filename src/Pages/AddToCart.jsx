import React, { useEffect, useState } from 'react';
import Pages from '../Component/Global/Pages';
import axiosInstance from '../Config/AxiosInstance';
import { showError, showSuccess } from '../Utils/toaster';
import { Trash2, IndianRupee, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AddToCart = () => {
    const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCartData = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/add-to-cart');
            setCart(res.data.cart);
        } catch (error) {
            // showError("Failed to fetch cart data");
            console.error("Cart fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Bravima || Your Shopping Cart";
        fetchCartData();
    }, []);

    // Replace ONLY handleUpdateQuantity function

    const handleUpdateQuantity = async (productId, delta) => {
        // backup old cart
        const oldCart = cart;

        // update current json instantly (no flicker)
        const updatedItems = cart.items.map((item) => {
            if (item.productId._id === productId) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity + delta)
                };
            }
            return item;
        });

        const totalPrice = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const totalItems = updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        // instant UI update
        setCart({
            ...cart,
            items: updatedItems,
            totalPrice,
            totalItems
        });

        try {
            // send api request in background
            await axiosInstance.post('/add-to-cart', {
                productId,
                quantity: delta
            });

            showSuccess("Cart updated");
        } catch (error) {
            // rollback if api fail
            setCart(oldCart);
            showError("Failed to update cart");
        }
    };

    const handleCartDelete = async (productId) => {
        try {
            await axiosInstance.delete(`/add-to-cart/${productId}`);
            fetchCartData();
            showSuccess("Item removed from cart");
        } catch (error) {
            showError("Failed to remove item");
        }
    };

    if (loading) {
        return (
            <Pages>
                <div className='flex justify-center items-center h-[60vh]'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
                </div>
            </Pages>
        );
    }

    const handleNavigate = () => {
        navigate('')
    }

    return (
        <Pages>
            <div className='max-w-7xl mx-auto px-4 md:px-10 py-12 min-h-[80vh]'>
                <div className='flex items-center gap-2 mb-8'>
                    <ShoppingBag className='text-primary' />
                    <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
                    <span className='ml-4 bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
                        {cart.items.length} Items
                    </span>
                </div>

                {cart.items.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-20 bg-primary rounded-3xl border-2 border-dashed'>
                        <div className='bg-secondary p-6 rounded-full mb-6'>
                            <ShoppingBag size={48} className='text-accent' />
                        </div>
                        <h2 className='text-2xl font-semibold text-secondary mb-2'>Your cart is empty</h2>
                        <p className='text-secondary mb-8'>Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            to="/"
                            className='bg-secondary text-primary px-8 py-3 hover:px-9 hover:py-4 rounded-full font-bold hover:bg-primary hover:text-secondary hover:border transition-all duration-300'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                        {/* Cart Items List */}
                        <div className='lg:col-span-2 space-y-6'>
                            {cart.items.map((item) => (
                                <div
                                    key={item.productId._id}
                                    className='flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border transition hover:shadow-md'
                                >
                                    {/* Product Image */}
                                    <div className='w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center'>
                                        <img
                                            src={`http://localhost:9090/${item.productId.image?.[0]}`}
                                            alt={item.productId.productName}
                                            className='max-w-full max-h-full object-contain'
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className='flex-grow flex flex-col justify-between'>
                                        <div className='flex justify-between items-start'>
                                            <div>
                                                <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-1'>{item.productId.brand}</p>
                                                <h3 className='text-lg font-semibold text-gray-800'>{item.productId.productName}</h3>
                                            </div>
                                            <button onClick={() => handleCartDelete(item.productId._id)} className='text-white bg-red-500 hover:text-red-500 hover:bg-white border p-1 rounded-full  transition-colors p-2 cursor-pointer'>
                                                <span className='flex items-center gap-1 '><Trash2 size={18} /></span>
                                            </button>
                                        </div>

                                        <div className='flex justify-between items-end mt-4'>
                                            <div className='flex items-center border rounded-full p-1 bg-gray-50'>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.productId._id, -1)}
                                                    className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition cursor-pointer'
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className='w-12 text-center font-bold'>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.productId._id, +1)}
                                                    className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-white transition cursor-pointer'
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <div className='text-xl font-bold flex items-center text-primary'>
                                                <IndianRupee size={10} />
                                                {(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white p-8 rounded-3xl border sticky top-24'>
                                <h2 className='text-xl font-bold mb-6'>Order Summary</h2>

                                <div className='space-y-4 mb-8'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Subtotal</span>
                                        <span className='flex items-center font-semibold'>
                                            <IndianRupee size={14} />
                                            {cart.totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Shipping</span>
                                        <span className='text-green-600 font-semibold'>Free</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Estimated Tax</span>
                                        <span className='flex items-center font-semibold'>
                                            <IndianRupee size={14} />
                                            0
                                        </span>
                                    </div>
                                </div>

                                <div className='border-t pt-6 mb-8'>
                                    <div className='flex justify-between items-center bg-primary/5 p-4 rounded-2xl'>
                                        <span className='text-lg font-bold'>Total Price: </span>
                                        <span className='text-lg font-bold flex items-center text-secondary'>
                                            <IndianRupee size={15} />
                                            <span>{cart.totalPrice.toLocaleString()}</span>
                                        </span>
                                    </div>
                                </div>

                                <button onClick={() => navigate('/checkout')} className='w-full bg-secondary hover:border text-primary cursor-pointer py-4 rounded-full font-bold text-lg hover:shadow-xl hover:bg-primary hover:text-secondary transition-all duration-300 transform active:scale-95'>
                                    Checkout Now
                                </button>

                                <p className='mt-6 text-center text-xs text-gray-400'>
                                    Taxes and shipping calculated at checkout
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Pages>
    );
};

export default AddToCart;