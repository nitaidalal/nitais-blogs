// src/layouts/UserLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="w-full  min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Outlet /> {/* user pages like Home, Blog */}
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
