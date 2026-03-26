import React from 'react'
import Navbar from '../Component/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Component/Footer'

const WebLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">

            <Navbar />

            <main className="flex-grow py-10">
                <Outlet />
            </main>

            <Footer />

        </div>
    )
}

export default WebLayout