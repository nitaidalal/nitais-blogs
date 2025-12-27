// src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { navigate, setToken, user, setUser } = useAppContext();
  const location = useLocation(); // To determine current route
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null); //

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Close profile dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isDemo");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = ""; // Clear auth header
    navigate("/");
    toast.success("Logged out successfully");
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Function to get initials from full name
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };


  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm ">
      <div className="flex justify-between items-center h-16 px-4 sm:px-8 lg:px-20 xl:px-32 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          to={isAdminRoute ? "/admin/dashboard" : "/"}
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary hover:text-primary/80 transition-colors"
          onClick={closeMenu}
        >
          &lt;Nitai's Blogs /&gt;
        </Link>

        {!isAdminRoute ? (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 ">
              <div className="flex items-center gap-6 mr-20">
                <Link
                  to="/"
                  className={`text-base lg:text-lg font-medium transition-all duration-200 ${
                    location.pathname === "/"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`text-base lg:text-lg font-medium transition-all duration-200 ${
                    location.pathname === "/about"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/blogs"
                  className={`text-base lg:text-lg font-medium transition-all duration-200 ${
                    location.pathname === "/blogs"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary"
                  }`}
                >
                  Blogs
                </Link>

                <Link
                  to="/contact"
                  className={`text-base lg:text-lg font-medium transition-all duration-200 ${
                    location.pathname === "/contact"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary"
                  }`}
                >
                  Contact
                </Link>
              </div>

              {user ? (
                // Show user profile when logged in
                <div className="relative" ref={profileRef}>
                  <button
                    title="Tap to view your profile"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 cursor-pointer bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {getInitials(user.name)}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <FaUser className="text-primary" />
                        <span className="text-gray-700">My Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-200"
                      >
                        <FaSignOutAlt className="text-red-500" />
                        <span className="text-gray-700">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Show login button when not logged in
                <button
                  onClick={() => navigate("/login")}
                  className={`px-4 py-2 bg-primary cursor-pointer text-white rounded-lg font-medium hover:bg-primary-dark active:scale-95 transition-all duration-150 shadow-md
                    ${location.pathname === "/login" ? "hidden" : ""}
                  `}
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-2xl text-gray-700 hover:text-primary transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <>
                {/* Overlay */}
                <div
                  className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={closeMenu}
                ></div>

                {/* Mobile Menu Content */}
                <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
                  <div className="flex flex-col p-4 space-y-4">
                    <Link
                      to="/"
                      className={`text-lg font-medium py-2 px-4 transition-all duration-200 ${
                        location.pathname === "/"
                          ? "border-l-4 border-primary text-primary "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      className={`text-lg font-medium py-2 px-4 transition-all duration-200 ${
                        location.pathname === "/about"
                          ? "border-l-4 border-primary text-primary "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={closeMenu}
                    >
                      About
                    </Link>
                    <Link
                      to="/blogs"
                      className={`text-lg font-medium py-2 px-4 transition-all duration-200 ${
                        location.pathname === "/blogs"
                          ? "border-l-4 border-primary text-primary "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={closeMenu}
                    >
                      Blogs
                    </Link>
                    <Link
                      to="/contact"
                      className={`text-lg font-medium py-2 px-4 transition-all duration-200 ${
                        location.pathname === "/contact"
                          ? "border-l-4 border-primary text-primary "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={closeMenu}
                    >
                      Contact
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="text-lg font-medium py-2 px-4 transition-all duration-200 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                          onClick={closeMenu}
                        >
                          <FaUser className="text-primary" />
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left text-lg font-medium py-2 px-4 transition-all duration-200 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FaSignOutAlt className="text-red-500" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          navigate("/login");
                          closeMenu();
                        }}
                        className="px-4 py-3 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary-dark active:scale-95 transition-all duration-150 shadow-md"
                      >
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 active:scale-95 transition-all duration-150 shadow-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
