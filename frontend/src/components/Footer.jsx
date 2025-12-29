import React from 'react'
//import 4 social icons from react-icons
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <footer className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300  py-10">
        <div className=" flex flex-col md:flex-row  sm:justify-between lg:mr-15 gap-10 px-5  md:px-10 lg:px-40 ">
          {/* Brand */}
          <div className="text-center">
            <h1
              className="text-xl md:text-2xl text-blue-500 font-medium cursor-pointer"
              onClick={() => navigate("/")}
            >
              &lt;Nitai's Blogs /&gt;
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Sharing tutorials, experiences, and stories from my coding
              journey.
            </p>
          </div>

          <div className='flex justify-around  gap-10 md:gap-20 '>
            {/* Quick Links */}

            <div>
              <h3 className="font-medium text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li
                  onClick={() => navigate("/")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  Home
                </li>
                <li
                  onClick={() => navigate("/blogs")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  Blogs
                </li>
                <li
                  onClick={() => navigate("/about")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  About
                </li>
                <li
                  onClick={() => navigate("/contact")}
                  className="cursor-pointer hover:text-blue-500"
                >
                  Contact
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-medium text-white mb-3">Follow</h3>
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center gap-2 text-sm group">
                  <FaTwitter
                    className="h-5 w-5 p-1 rounded-full bg-slate-700 
        group-hover:shadow-[0_0_20px_rgba(100,116,139,0.8)] 
        transition-all duration-300"
                  />
                  Twitter
                </a>

                <a href="#" className="flex items-center gap-2 text-sm group">
                  <FaFacebookF
                    className="h-5 w-5 p-1 rounded-full bg-blue-600
        group-hover:shadow-[0_0_20px_rgba(37,99,235,0.8)]
        transition-all duration-300"
                  />
                  Facebook
                </a>

                <a
                  href="https://www.instagram.com/nitai_dalal_98/"
                  target="_blank"
                  className="flex items-center gap-2 text-sm group"
                >
                  <FaInstagram
                    className="h-5 w-5 p-1 rounded-full bg-pink-500
        group-hover:shadow-[0_0_20px_rgba(236,72,153,0.8)]
        transition-all duration-300"
                  />
                  Instagram
                </a>

                <a href="#" className="flex items-center gap-2 text-sm group">
                  <FaLinkedinIn
                    className="h-5 w-5 p-1 rounded-full bg-blue-700
        group-hover:shadow-[0_0_20px_rgba(29,78,216,0.8)]
        transition-all duration-300"
                  />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
          © 2025 Nitai's Blogs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer
