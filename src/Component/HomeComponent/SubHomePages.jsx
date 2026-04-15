import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Config/AxiosInstance';

const SubHomePages = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/product');
        // Only take the first 10 products
        setProducts(res.data.product.slice(0, 10));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A34A]"></div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-[#fffff3]">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#16A34A] font-bold tracking-widest uppercase text-xs mb-3 block"
          >
            New Arrivals
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-[#10100e] tracking-tight"
          >
            Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10100e] to-gray-400">Products</span>
          </motion.h2>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image Workspace */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
              <img
                src={`https://bravimaserver.vercel.app/${product.image[0]}`}
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
              </div>

              {/* Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#fffff3]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#10100e]">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-[#16A34A] text-[#16A34A]" />
                ))}
                <span className="text-[10px] text-gray-400 ml-1 font-medium">(4.8)</span>
              </div>

              <h3 className="text-sm font-black text-[#10100e] mb-2 line-clamp-1 group-hover:text-[#16A34A] transition-colors">
                {product.productName}
              </h3>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-lg font-black text-[#10100e]">
                  ₹{product.price.toLocaleString()}
                </p>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                  In Stock
                </span>
              </div>
            </div>

            {/* Hover Border Accent */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#16A34A]/20 rounded-2xl pointer-events-none transition-colors" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SubHomePages;