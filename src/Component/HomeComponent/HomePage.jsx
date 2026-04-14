import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const categories = [
        {
            id: 'men',
            title: "Men's Collection",
            subtitle: "Uncompromising Style & Precision",
            image: "/Men1.png",
            link: "/men",
            color: "from-blue-900/40"
        },
        {
            id: 'women',
            title: "Women's Collection",
            subtitle: "Elegance in Every Detail",
            image: "/women1.png",
            link: "/women",
            color: "from-rose-900/40"
        },
        {
            id: 'kids',
            title: "Kids' Collection",
            subtitle: "Playful Comfort & Joy",
            image: "/kid1.png",
            link: "/children",
            color: "from-amber-900/40"
        }
    ];

    return (
        <div className="min-h-screen bg-[#fffff3] text-[#10100e] relative overflow-hidden font-sans">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Hero Section / Categories */}
            <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto relative z-10">
                <header className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 border border-black/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-white/50 backdrop-blur-sm"
                    >
                        New Season Arrival
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
                    >
                        THE FUTURE OF <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10100e] to-gray-400">FASHION</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium"
                    >
                        Discover a curated selection of premium apparel designed for the modern individual.
                        Where quality meets contemporary luxury.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                            className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_120px_rgba(0,0,0,0.12)] transition-all duration-700"
                        >
                            {/* Category Badge */}
                            <div className="absolute top-6 right-6 z-20">
                                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                                    Trending Now
                                </span>
                            </div>

                            {/* Image Container */}
                            <div className="relative h-[450px] md:h-[600px] w-full overflow-hidden">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-contain object-bottom md:scale-105"
                                />

                                {/* Overlay Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700`} />

                                {/* Content Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/20 to-transparent">
                                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]">
                                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-sm">
                                            {category.title.split("'")[0]}<span className="opacity-50">'s</span>
                                        </h2>
                                        <p className="text-white/80 mb-8 max-w-xs font-semibold text-base leading-relaxed">
                                            {category.subtitle}
                                        </p>

                                        <Link
                                            to={category.link}
                                            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#10100e] hover:text-white transition-all duration-500 shadow-xl"
                                        >
                                            Explore Collection
                                            <ArrowRight size={16} strokeWidth={3} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;