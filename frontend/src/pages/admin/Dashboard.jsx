import React from 'react'
import { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Table from '../../components/admin/Table';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import { FaUser, FaBlog, FaComments, FaFileAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const {axios} = useAppContext();
    const [dashboardData, setDashboardData] = useState({
        totalBlogs: 0,
        totalComments: 0,
        totalDrafts: 0,
        recentBlogs: [],
    });
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get("/admin/dashboard");
          setDashboardData(data.data);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          toast.error(error.response.data.message || "Error fetching dashboard data");
        } finally {
          setLoading(false);
        }
    };
    

    const getTotalUser = async () => {
      const { data } = await axios.get("/admin/allUsers");
      setTotalUsers(data.data.length);
    };

    useEffect(() => {
        fetchDashboardData();
        getTotalUser();
    }, []);

    

    return loading ? (
      <Loader text="dashboard data" />
    ) : (
      <div className="flex flex-col p-4 md:p-10 min-h-[calc(100vh-64px)] gap-8 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your blog.</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative overflow-hidden bg-linear-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white cursor-pointer group"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-6 -translate-y-6">
              <FaBlog size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FaBlog size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{dashboardData.totalBlogs}</p>
              <p className="text-blue-100 text-sm font-medium">Total Blogs</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/40 transition-all duration-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative overflow-hidden bg-linear-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white cursor-pointer group"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-6 -translate-y-6">
              <FaComments size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FaComments size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{dashboardData.totalComments}</p>
              <p className="text-green-100 text-sm font-medium">Total Comments</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/40 transition-all duration-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative overflow-hidden bg-linear-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white cursor-pointer group"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-6 -translate-y-6">
              <FaFileAlt size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FaFileAlt size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{dashboardData.totalDrafts}</p>
              <p className="text-orange-100 text-sm font-medium">Draft Blogs</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/40 transition-all duration-300" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative overflow-hidden bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white cursor-pointer group"
          >
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-6 -translate-y-6">
              <FaUser size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FaUser size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{totalUsers}</p>
              <p className="text-purple-100 text-sm font-medium">Total Users</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 group-hover:bg-white/40 transition-all duration-300" />
          </motion.div>
        </div>

        {/* Recent Blogs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3 text-white">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <FaClock size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Latest Blogs</h2>
                <p className="text-blue-100 text-sm">Your most recent blog posts</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {dashboardData.recentBlogs.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th scope="col" className="py-4 px-6 max-sm:hidden font-semibold">
                      #
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      Blog Title
                    </th>
                    <th scope="col" className="py-4 px-6 max-sm:hidden font-semibold">
                      Date
                    </th>
                    <th scope="col" className="py-4 px-6 max-sm:hidden font-semibold">
                      Status
                    </th>
                    <th scope="col" className="py-4 px-6 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentBlogs.map((blog, index) => {
                    return (
                      <Table
                        key={blog._id}
                        blog={blog}
                        fetchBlogs={fetchDashboardData}
                        index={index}
                      />
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="p-6 bg-linear-to-br from-blue-100 to-purple-100 rounded-full mb-4">
                  <FaBlog size={48} className="text-blue-600" />
                </div>
                <p className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</p>
                <p className="text-gray-500 mb-6">Start creating amazing content for your audience!</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
}

export default Dashboard
