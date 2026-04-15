import React, { useEffect } from "react";
import Pages from "../Component/Global/Pages";
import { Award, ShieldCheck, Truck, Footprints } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Bravima || About Us";
    }, []);

    const features = [
        {
            icon: Award,
            title: "Premium Shoes",
            desc: "Carefully selected footwear from trusted brands with premium quality and modern style.",
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            desc: "Quick and secure shipping so your favorite shoes arrive on time.",
        },
        {
            icon: ShieldCheck,
            title: "Original Products",
            desc: "100% authentic branded shoes with trusted customer support.",
        },
        {
            icon: Footprints,
            title: "Comfort First",
            desc: "Shoes designed for everyday comfort, performance, and confidence.",
        },
    ];

    return (
        <Pages>
            <div className="w-full min-h-screen bg-primary">
                {/* Hero */}
                <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
                    <p className="text-sm uppercase tracking-[4px] text-gray-500 mb-3">
                        About Bravima
                    </p>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                        Built For People Who Love Shoes
                    </h1>

                    <p className="mt-6 text-gray-600 text-lg leading-8 max-w-3xl mx-auto">
                        Bravima is a modern shoe brand focused only on footwear. We bring
                        stylish, comfortable, and premium shoes for every step of your life.
                    </p>
                </section>

                {/* Story */}
                <section className="max-w-7xl mx-auto px-4 pb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-5">
                                Our Mission
                            </h2>

                            <p className="text-gray-600 leading-8 mb-4">
                                At Bravima, shoes are not just products — they are confidence,
                                movement, and personal style.
                            </p>

                            <p className="text-gray-600 leading-8">
                                Our goal is to deliver quality footwear that feels good, looks
                                sharp, and lasts longer.
                            </p>
                        </div>

                        <div className="bg-black rounded-2xl p-8 md:p-12 text-white">
                            <h2 className="text-3xl font-semibold mb-5">
                                Our Shoe Categories
                            </h2>

                            <ul className="space-y-4 text-gray-300 leading-7">
                                <li>• Sneakers</li>
                                <li>• Running Shoes</li>
                                <li>• Casual Shoes</li>
                                <li>• Formal Shoes</li>
                                <li>• Sandals & Slippers</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="max-w-7xl mx-auto px-4 pb-20">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-5">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-600 text-sm leading-7">
                                        {item.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-black py-16">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">
                            Step Into Style With Bravima
                        </h2>

                        <p className="text-gray-300 mt-4 text-lg">
                            Premium shoes made for comfort, movement, and everyday confidence.
                        </p>

                        <button onClick={() => navigate('/')} className="mt-8 px-8 py-3 bg-white text-black rounded-full font-medium hover:scale-105 duration-300">
                            Shop Shoes
                        </button>
                    </div>
                </section>
            </div>
        </Pages>
    );
};

export default About;