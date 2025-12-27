import React, { useState,useEffect, useRef } from 'react'
import {  blogCategories } from '../assets/assets'
import BlogCard from './BlogCard';
import { useAppContext } from "../context/AppContext";
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRight, Search } from 'lucide-react';
import { ImCross } from "react-icons/im";
import Loader from './Loader';



const BlogList = () => {
  const [menu, setMenu] = useState('all');
  const { blogs, searchInput, setSearchInput, loading } = useAppContext();
  const [localInput, setLocalInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 8;
  
  const inputRef = useRef();
  
    // --- DEBOUNCE SEARCH ---
    useEffect(() => {
      const timer = setTimeout(() => {
        setSearchInput(localInput);
      }, 500); // runs after 0.5 sec of no typing
  
      return () => clearTimeout(timer);
    }, [localInput]); // triggers on every keystroke


    const clearSearch = () => {
      inputRef.current.value = "";
      setLocalInput("");
    };
  
  
  const filteredBlogs = menu === 'all' ? blogs : blogs.filter(blog => (blog.category || '').toLowerCase() === menu);
  const searchedBlogs = filteredBlogs.filter(blog => ((blog.title || '') +(blog.category || '')).toLowerCase().includes((searchInput || '').toLowerCase()));

  // Determine which blogs to display (searched or filtered)
  const displayBlogs = (searchInput || "").length > 0 ? searchedBlogs : filteredBlogs;
  
  // Calculate pagination
  const totalPages = Math.ceil(displayBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage; 
  const currentBlogs = displayBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [menu, searchInput]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1)); // logic: cannot go below 1
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages)); // logic: cannot exceed totalPages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {blogs.length === 0 ? (
            <p className="text-center mt-10 text-gray-600">No blogs available.</p>
          ) : (
            <div >
              <h1 className="text-4xl  my-8 font-semibold text-primary text-center">All Blogs</h1>
          <div className="mx-5 sm:mx-auto flex mb-10 justify-center bg-white m-auto border border-gray-300 rounded shadow-sm max-w-md overflow-hidden">
            <input
              type="text"
              placeholder="Search blogs..."
              ref={inputRef}
              onChange={(e) => setLocalInput(e.target.value)}
              className=" outline-none py-3 px-4 w-full "
            />

            <div className="flex items-center">
              {inputRef.current?.value ? (
                <ImCross
                  onClick={clearSearch}
                  className="size-4 cursor-pointer mr-4"
                />
              ) : (
                <Search className="size-7 text-primary cursor-pointer mr-3" />
              )}
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            {blogCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setMenu(category.toLowerCase())}
                className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
                  menu === category.toLowerCase()
                    ? "bg-primary text-white"
                    : "bg-blue-100 hover:bg-blue-200 "
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10  mt-10 gap-16 flex-wrap mx-8  xl:mx-40">
            {console.log(blogs)}

            {currentBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto"
              >
                <BlogCard key={blog._id} blog={blog} />
              </motion.div>
            ))}

            {searchInput.length > 0 && searchedBlogs.length === 0 && (
              <p className="text-center mt-10 text-gray-600 col-span-full">
                ❌ No search results found for{" "}
                <span className="font-medium text-primary">
                  "{searchInput}"
                </span>{" "}
                .
              </p>
            )}

            {filteredBlogs.length === 0 && searchInput.length === 0 && (
              <p className="text-center mt-10 text-gray-600 col-span-full">
                No blogs available in this category.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {displayBlogs.length > blogsPerPage && (
            <div className="flex flex-col items-center gap-4 mb-10">
              {/* Page Info */}
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstBlog + 1} - {Math.min(indexOfLastBlog, displayBlogs.length)} of {displayBlogs.length} blogs
              </p>
              
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}

                  className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-purple-700 hover:shadow-lg'
                  }`}
                >
                  <ArrowLeftIcon className="w-4 h-4" /> Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageClick(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-primary text-white shadow-lg scale-110'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-purple-700 hover:shadow-lg'
                  }`}
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )}
    </div>
  );
}


export default BlogList
