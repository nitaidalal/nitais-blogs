// src/layouts/AdminLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../pages/admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  // Check if user is demo admin
  const isDemo = localStorage.getItem('isDemo') === 'true';
  console.log(isDemo);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50/50">
      <Navbar />
      
      
      {/* Demo Mode Banner */}
      {isDemo && (
        <div className="bg-orange-500 text-white px-4 py-2 text-center font-medium">
          🎭 DemoAdmin Mode - View Only Access (Changes won't be saved)
        </div>
      )}
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Outlet /> {/* Dashboard, AddBlog, Comments, etc. */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
