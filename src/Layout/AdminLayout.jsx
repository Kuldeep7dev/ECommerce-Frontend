import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Component/DashComponent/Sidebar";
import Dashbar from "../Component/DashComponent/Dashbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-primary overflow-y-auto">
        <Dashbar />
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;