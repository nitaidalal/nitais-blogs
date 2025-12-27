import React,{useState,useEffect} from 'react'
import Table from '../../components/admin/Table';
import { useAppContext } from '../../context/AppContext';
import Loader from '../../components/Loader';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const ListBlog =  () => {
    const {axios} = useAppContext();
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get('/admin/blogs');
            setBlogs(data.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);
    
  return loading ? (
    <Loader text="blogs" />
  ) : (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Manage Blogs
              </h1>
              <p className="text-gray-600">
                Create, edit and manage your blog posts
              </p>
            </div>

            {/* Stats & Add Button */}
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-linear-to-br from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl"
              >
                <div className="text-2xl font-bold">{blogs.length}</div>
                <div className="text-sm opacity-90">Total Blogs</div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/addBlog")}
                className="flex items-center gap-2 bg-linear-to-r cursor-pointer from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FaPlus />
                <span className="font-semibold">Add Blog</span>
              </motion.button>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="relative max-w-md mx-auto">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Table Header */}
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-lg">Blog Posts</h2>
              <div className="text-white text-sm">
                {filteredBlogs.length}{" "}
                {filteredBlogs.length === 1 ? "blog" : "blogs"}
              </div>
            </div>
          </div>

          {/* Content */}
          {filteredBlogs.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="text-7xl mb-4">📝</div>
                <p className="text-gray-700 text-xl font-semibold">
                  {searchTerm ? "No blogs found" : "No blogs yet"}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {searchTerm
                    ? "Try a different search term"
                    : "Create your first blog post to get started"}
                </p>
                {!searchTerm && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/admin/addBlog")}
                    className="mt-6 flex items-center gap-2 mx-auto bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <FaPlus />
                    <span className="font-semibold">Create Blog</span>
                  </motion.button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-purple-200">
                    <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider max-sm:hidden">
                      #
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Blog Title
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider max-sm:hidden">
                      Date
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider max-sm:hidden">
                      Status
                    </th>
                    <th className="py-4 px-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map((blog, index) => {
                    return (
                      <Table
                        key={blog._id}
                        blog={blog}
                        index={index}
                        fetchBlogs={fetchBlogs}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          Showing {filteredBlogs.length} of {blogs.length} blogs
        </motion.div>
      </div>
    </div>
  );
}

export default ListBlog
