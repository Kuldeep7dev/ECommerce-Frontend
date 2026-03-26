import React from "react";
import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, User, MessageCircleWarning } from "lucide-react";

const Sidebar = () => {
    const sideLinks = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Users",
            path: "/users",
            icon: User,
        },
        {
            title: "Products",
            path: "/products",
            icon: ShoppingCart,
        },
        {
            title: "Contact",
            path: "/contact",
            icon: MessageCircleWarning,
        },
    ];

    return (
        <aside className="w-64 h-screen bg-secondary border-r text-primary flex flex-col">

            {/* Logo */}
            <div className="p-4 border-b flex justify-center text-xl font-semibold">
                <Link to="/dashboard" className="flex gap-2 items-center">
                    <span style={{ fontFamily: "Dancing Script" }}>bravima</span>
                    AdminPanel
                </Link>
            </div>

            {/* Links */}
            <ul className="flex-1 p-4 space-y-2">
                {sideLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.title}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2 rounded-md transition-all
                  ${isActive
                                        ? "bg-primary w-61 text-secondary font-semibold"
                                        : "hover:bg-primary hover:text-secondary hover:w-61"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>

        </aside>
    );
};

export default Sidebar;