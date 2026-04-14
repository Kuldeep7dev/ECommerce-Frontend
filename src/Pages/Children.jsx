import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Eye, Star } from "lucide-react";
import Pages from "../Component/Global/Pages";
import axiosInstance from "../Config/AxiosInstance";
import { CATEGORY } from "../Constent/product";

const Children = () => {
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
        document.title = "Bravima || Children collection"
    }, [debouncedSearch]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <Pages>
            <div className="min-h-screen bg-[#fffff3] pt-24 pb-20">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <motion.h1 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl md:text-6xl font-black text-[#10100e] tracking-tighter mb-2"
                            >
                                KIDS' <span className="text-gray-400">COLLECTION</span>
                            </motion.h1>
                            <p className="text-gray-500 font-medium">Joyful styles for the little ones</p>
                        </div>

                        {/* SEARCH BAR */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search size={20} className="text-gray-400 group-focus-within:text-[#16A34A] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white border-2 border-transparent focus:border-[#16A34A]/20 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none shadow-sm transition-all text-[#10100e] font-medium placeholder:text-gray-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6">
                    {/* LOADING */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A34A] mb-4"></div>
                            <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Curating selection...</p>
                        </div>
                    ) : (
                        <>
                            {/* EMPTY */}
                            {data.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-40 border-2 border-dashed border-gray-100 rounded-[3rem]"
                                >
                                    <p className="text-gray-400 text-lg font-medium">No products found for this collection</p>
                                    <button 
                                        onClick={() => setSearch("")}
                                        className="mt-4 text-[#16A34A] font-bold text-sm underline decoration-accent/30"
                                    >
                                        Clear search
                                    </button>
                                </motion.div>
                            ) : (
                                /* GRID */
                                <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {data.map((product) => (
                                            <motion.div
                                                key={product._id}
                                                layout
                                                variants={itemVariants}
                                                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                                            >
                                                {/* Image Workspace */}
                                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                                                    <img
                                                        src={`http://localhost:9090/${product.image[0]}`}
                                                        alt={product.productName}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    
                                                    {/* Quick Actions Overlay */}
                                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                        <Link 
                                                            to={`/product/${product.slug}`}
                                                            className="p-3 bg-white rounded-full text-[#10100e] hover:bg-[#16A34A] hover:text-white transition-colors shadow-lg"
                                                        >
                                                            <Eye size={18} />
                                                        </Link>
                                                        <button className="p-3 bg-white rounded-full text-[#10100e] hover:bg-[#16A34A] hover:text-white transition-colors shadow-lg">
                                                            <ShoppingCart size={18} />
                                                        </button>
                                                    </div>

                                                    {/* Price Tag */}
                                                    <div className="absolute top-4 right-4">
                                                        <span className="bg-[#10100e] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider">
                                                            CUTE
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 flex flex-col flex-grow">
                                                    <div className="flex items-center gap-1 mb-2">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={10} className="fill-[#16A34A] text-[#16A34A]" />
                                                        ))}
                                                        <span className="text-[10px] text-gray-400 ml-1 font-medium">(4.7)</span>
                                                    </div>
                                                    
                                                    <h3 className="text-sm font-black text-[#10100e] mb-2 line-clamp-1 group-hover:text-[#16A34A] transition-colors">
                                                        {product.productName}
                                                    </h3>
                                                    
                                                    <div className="mt-auto flex justify-between items-center">
                                                        <p className="text-lg font-black text-[#10100e]">
                                                            ₹{product.price.toLocaleString()}
                                                        </p>
                                                        <div className="flex -space-x-1">
                                                            {product.colour?.slice(0, 3).map((c, index) => (
                                                                <div 
                                                                    key={index} 
                                                                    className="w-3 h-3 rounded-full border border-white shadow-sm"
                                                                    style={{ backgroundColor: c }}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Hover Border Accent */}
                                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#16A34A]/20 rounded-2xl pointer-events-none transition-colors" />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Pages>
    );
};

export default Children;
