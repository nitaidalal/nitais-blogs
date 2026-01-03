import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import moment from 'moment';
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Table = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const [published, setPublished] = useState(blog.isPublished);
  const [isDeleting, setIsDeleting] = useState(false);
  const { title, createdAt, category } = blog;
  const BlogDate = new Date(createdAt);


  const togglePublish = async () => {
    try {
      const { data } = await axios.put(`/admin/toggle-publish/${blog._id}`);
      setPublished(data.data.isPublished);
      toast.success(data.message);
      fetchBlogs();
    } catch (error) {
      toast.error(
        error.response.data.message || "Error toggling publish status"
      );
    }
  };

  const editBlog = () => {
    // Navigate to AddBlog page with blog ID in state
    navigate('/admin/addBlog', { state: { blogId: blog._id, editMode: true } });
  }

  const deleteBlog = async () => {
    try {
      const sure = window.confirm("Are you sure you want to delete this blog?");
      if (!sure) return;
      
      setIsDeleting(true);
      const { data } = await axios.delete(`/admin/deleteBlog/${blog._id}`);
      toast.success(data.message);
      fetchBlogs(); // Re-fetch blogs to update the UI
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
    >
      <td className="py-4 px-4 max-sm:hidden">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-100 to-purple-100 text-purple-700 font-semibold group-hover:scale-110 transition-transform">
          {index + 1}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="space-y-1">
          <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
            {title}
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gray-100 rounded-full">
              {category}
            </span>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 max-sm:hidden text-sm text-gray-600">
        {moment(BlogDate).format("MMM DD, YYYY")}
      </td>
      <td className="py-4 px-4 max-sm:hidden">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            published
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {published ? "✓ Published" : "○ Draft"}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePublish}
            className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
              published
                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
            title={published ? "Unpublish" : "Publish"}
          >
            {published ? (
              <FaEyeSlash className="w-4 h-4" />
            ) : (
              <FaEye className="w-4 h-4" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={editBlog}
            className="p-2 rounded-lg cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-200"
            title="Edit blog"
          >
            <FaEdit className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={deleteBlog}
            disabled={isDeleting}
            className="p-2 rounded-lg cursor-pointer bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete blog"
          >
            <FaTrash className="w-4 h-4" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default Table
