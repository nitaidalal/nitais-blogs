import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const NotFound = () => {
  const {navigate,user} = useAppContext();
  const location = useLocation();

  const backToHome = () => {
    if(location.pathname.startsWith('/admin')){
      navigate('/admin');
    } else {
      navigate('/');
    }
  }

  return (
    <div className="mb-10 flex flex-col items-center justify-center h-screen bg-linear-to-b from-blue-50 to-white text-center px-6">
      {/* Animated 404 Number */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 select-none"
      >
        404
      </motion.h1>

      {/* Subheading */}
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold text-gray-700 mt-4"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Message */}
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-gray-500 mt-4 max-w-md"
      >
        The page you’re looking for doesn’t exist or has been moved. Let’s take
        you back home safely.
      </motion.p>

      {/* Floating Animation for Illustration */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="mt-8"
      >
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Illustration"
          className="w-72 md:w-96 mx-auto rounded-lg shadow-md"
        />
      </motion.div>

      <motion.button
        onClick={backToHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 flex items-center gap-2 bg-linear-to-r from-orange-500 to-yellow-600 text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200"
      >
        <FaHome /> Back to Home
      </motion.button>
    </div>
  );
};

export default NotFound;
