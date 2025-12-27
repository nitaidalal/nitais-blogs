import React from 'react'
import { useAppContext } from '../context/AppContext'
import BlogCard from './BlogCard';
import { ArrowBigRightIcon, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomeBlogs = () => {
    const {blogs} = useAppContext();

return (
  <div className="max-w-full ">
    <h1 className="text-3xl font-bold text-center mt-10 mb-5">Latest Blogs</h1>
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10  mt-10 gap-16 flex-wrap mx-auto  xl:mx-40">
      {blogs.slice(0, 4).map((blog) => (
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
  </div>
);
}

export default HomeBlogs
