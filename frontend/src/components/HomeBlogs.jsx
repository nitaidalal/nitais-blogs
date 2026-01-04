import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import BlogCard from './BlogCard';
import { ArrowBigRightIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Loader from './Loader';

const HomeBlogs = () => {
    const { axios } = useAppContext();
    const [blogs, setBlogs] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
              setIsLoading(true);
                const { data } = await axios.get('/user/view-all', {
                    params: {
                        page: 1,
                        limit: 4 
                    }
                });
                setBlogs(data.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Error fetching blogs");
            }finally{
              setIsLoading(false);
            }
        };
        fetchLatestBlogs();
    }, []);

return (
  <div className="max-w-full ">
    <h1 className="text-3xl font-bold text-center mt-10 mb-5">Latest Blogs</h1>
    {isLoading ? (
      
        <div className="flex flex-col justify-center items-center ">
          <div className="relative flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-transparent border-t-blue-500 border-b-orange-400"></div>
            <div className="absolute h-6 w-6 bg-white rounded-full shadow-lg"></div>
          </div>

          <p className="mt-6 sm:text-lg text-gray-700 font-semibold tracking-wide animate-pulse">
            Fetching blogs, <span className="text-primary">please wait...</span>
          </p>
        </div>
      
    ) : (
      <>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10  mt-10 gap-16 flex-wrap mx-auto  xl:mx-40">
          {blogs.map((blog) => (
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
        </div>
        <div className="text-center mb-10">
          <button
            className="bg-primary text-white px-3 py-1.5 rounded cursor-pointer  hover:shadow-[0_0_35px_rgba(59,130,246,1)] active:scale-95 transition-all duration-150"
            onClick={() => (window.location.href = "/blogs")}
          >
            View All Blogs
            <ArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </>
    )}
  </div>
);
}

export default HomeBlogs
