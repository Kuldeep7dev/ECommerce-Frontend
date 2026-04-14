import React, { useEffect, useLayoutEffect } from 'react'

const ReturnPolicy = () => {
    useEffect(() => {
        document.title = "Bravima || Return Policy"
    }, [])
    return (
        <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 border border-gray-100">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
                    Bravima Return Policy
                </h1>

                <p className="text-gray-600 text-lg leading-8 text-center mb-10">
                    At <span className="font-semibold text-black">Bravima</span>, customer
                    satisfaction is our priority. If you're not completely satisfied with
                    your purchase, we're here to help.
                </p>

                <div className="space-y-8">
                    {/* Eligibility */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            1. Return Eligibility
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-7">
                            <li>Returns are accepted within 7 days of delivery.</li>
                            <li>Shoes must be unused, unworn, and in original packaging.</li>
                            <li>Items with visible damage or signs of wear are not eligible.</li>
                            <li>Sale or discounted items are non-returnable.</li>
                        </ul>
                    </div>

                    {/* Exchange */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            2. Exchange Policy
                        </h2>
                        <p className="text-gray-600 leading-7">
                            Need a different size or color? We offer free exchanges subject to
                            stock availability.
                        </p>
                    </div>

                    {/* Refund */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            3. Refund Process
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-7">
                            <li>Once we receive and inspect your returned item.</li>
                            <li>Approved refunds are processed within 5-7 business days.</li>
                            <li>Refunds are sent to the original payment method.</li>
                        </ul>
                    </div>

                    {/* Shipping */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            4. Return Shipping
                        </h2>
                        <p className="text-gray-600 leading-7">
                            Customers are responsible for return shipping charges unless the
                            wrong or defective item was delivered.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                            5. Contact Support
                        </h2>
                        <p className="text-gray-600 leading-7">
                            For return requests, email us at{" "}
                            <a
                                href="mailto:support@bravima.com"
                                className="text-black font-medium underline hover:text-gray-700"
                            >
                                support@bravima.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReturnPolicy