import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        document.title = "Bravima || FAQ"
    }, [])

    const faqs = [
        {
            question: "What is Bravima?",
            answer:
                "Bravima is a premium footwear brand focused on stylish, comfortable, and durable shoes designed for everyday wear.",
        },
        {
            question: "What types of shoes does Bravima offer?",
            answer:
                "Bravima offers sneakers, casual shoes, formal shoes, running shoes, and lifestyle footwear for modern customers.",
        },
        {
            question: "Are Bravima shoes comfortable for daily use?",
            answer:
                "Yes. Bravima shoes are designed with cushioned soles, breathable materials, and ergonomic support for all-day comfort.",
        },
        {
            question: "How do I choose the right size?",
            answer:
                "Use our size chart on the product page. If you're between sizes, we recommend choosing the larger size for extra comfort.",
        },
        {
            question: "Do you offer returns or exchanges?",
            answer:
                "Yes. Bravima offers easy returns and exchanges within the eligible return period, subject to product condition.",
        },
        {
            question: "How long does shipping take?",
            answer:
                "Standard shipping usually takes 3–7 business days depending on your location.",
        },
        {
            question: "How should I clean my Bravima shoes?",
            answer:
                "Use a soft brush or cloth with mild soap. Avoid machine washing unless specifically mentioned on the product label.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach our support team through the Contact Us page or official support email.",
        },
    ];
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                        Support
                    </p>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Everything you need to know about Bravima shoes.
                    </p>
                </div>

                {/* FAQ Box */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <span className="text-lg font-medium text-gray-900">
                                    {faq.question}
                                </span>

                                <span className="text-2xl font-light text-gray-500">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${openIndex === index
                                    ? "grid-rows-[1fr] opacity-100"
                                    : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-6 py-3 pb-5 text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-gray-600">
                        Still have questions?{" "}
                        <Link to="/contact-us" className="font-semibold text-black cursor-pointer hover:underline">
                            Contact Bravima Support
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default FAQ