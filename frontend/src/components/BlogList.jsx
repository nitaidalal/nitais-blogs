import React, { useState, useEffect } from 'react'
import { blogCategories } from '../assets/assets'
import BlogCard from './BlogCard';
import { useAppContext } from "../context/AppContext";
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRight, Search } from 'lucide-react';
import { ImCross } from "react-icons/im";
import Loader from './Loader';
import toast from 'react-hot-toast';

const BLOGS_PER_PAGE = 8;

const BlogList = () => {
  const [menu, setMenu] = useState('all');
  const { axios, searchInput, setSearchInput } = useAppContext();
  const [localInput, setLocalInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Backend pagination data
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalBlogs: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // --- DEBOUNCE SEARCH ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchInput(localInput);
    }, 500); // runs after 0.5 sec of no typing

    return () => clearTimeout(timer);
  }, [localInput, setSearchInput]);

  const clearSearch = () => {
    setLocalInput("");
  };

  // Fetch blogs from backend with pagination
  useEffect(() => {
    const abortController = new AbortController(); // to cancel fetch on unmount
    
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/user/view-all', {
          params: {
            page: currentPage,
            limit: BLOGS_PER_PAGE,
            category: menu,
            search: searchInput
          },
          signal: abortController.signal // attach signal to axios request
        });
        
        setBlogs(data.data);
        setPagination(data.pagination);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          toast.error(error.response?.data?.message || "Error fetching blogs");
          setBlogs([]);
          setPagination({
            totalPages: 0,
            totalBlogs: 0,
            hasNextPage: false,
            hasPrevPage: false,
          });
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    
    return () => abortController.abort();
  }, [currentPage, menu, searchInput, axios]);

  // Reset to page 1 when category or search changes (before fetch)
  useEffect(() => {
    setCurrentPage(1);
  }, [menu, searchInput]);

  const handlePrevPage = () => {
    if (pagination.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {loading && (
        <Loader />
      )} 
          <div>
            <h1 className="text-4xl my-8 font-semibold text-primary text-center">
              All Blogs
            </h1>

            {/* Search Bar */}
            <div className="mx-5 sm:mx-auto flex mb-10 justify-center bg-white m-auto border border-gray-300 rounded shadow-sm max-w-md overflow-hidden">
              <input
                type="text"
                placeholder="Search blogs..."
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                className="outline-none py-3 px-4 w-full"
              />
              <div className="flex items-center">
                {localInput ? (
                  <ImCross
                    onClick={clearSearch}
                    className="size-4 cursor-pointer mr-4"
                  />
                ) : (
                  <Search className="size-7 text-primary cursor-pointer mr-3" />
                )}
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center flex-wrap gap-4">
              {blogCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setMenu(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer ${
                    menu === category.toLowerCase()
                      ? "bg-primary text-white"
                      : "bg-blue-100 hover:bg-blue-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10 mt-10 gap-16 flex-wrap mx-8 xl:mx-40">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto"
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))
              ) : (
                <p className="text-center mt-10 text-gray-600 col-span-full">
                  {searchInput ? (
                    <>
                      ❌ No search results found for{" "}
                      <span className="font-medium text-primary">
                        "{searchInput}"
                      </span>
                    </>
                  ) : (
                    "No blogs available in this category."
                  )}
                </p>
              )}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col items-center gap-4 mb-10">
                {/* Page Info */}
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {pagination.totalPages} (
                  {pagination.totalBlogs} total blogs)
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevPage}
                    disabled={!pagination.hasPrevPage}
                    className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-200 ${
                      !pagination.hasPrevPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-purple-700 hover:shadow-lg"
                    }`}
                  >
                    <ArrowLeftIcon className="w-4 h-4" /> Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.totalPages ||
                        (pageNum >= currentPage - 1 &&
                          pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageClick(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                              currentPage === pageNum
                                ? "bg-primary text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="px-2 text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={!pagination.hasNextPage}
                    className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-200 ${
                      !pagination.hasNextPage
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-purple-700 hover:shadow-lg"
                    }`}
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        
      )
    </div>
  );
}


export default BlogList
