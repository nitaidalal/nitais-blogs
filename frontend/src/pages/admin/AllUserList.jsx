import React,{useState,useEffect} from 'react'
import { useAppContext } from '../../context/AppContext';
import Loader from '../../components/Loader';
import moment from 'moment';
import toast from 'react-hot-toast';
import { FaUser, FaEnvelope, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';




const AllUserList = () => {

    const [users, setUsers] = useState([]);
    const {axios} = useAppContext();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDemoAdmin, setIsDemoAdmin] = useState(false);

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchUsers = async()=>{
        try{
            setLoading(true);
            const {data} = await axios.get("/admin/allUsers");
            setUsers(data.data);
        }catch(error){
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || "Error fetching users");
        }finally{
            setLoading(false);
        }
    }

    const checkDemoAdmin = () => {
      const token = localStorage.getItem('isDemo');
      if(token === 'true'){
        setIsDemoAdmin(true);
        toast.error(" Some data may be hidden ");
      }
    }

    useEffect(() => {
        fetchUsers();
        checkDemoAdmin();
    }, []);
    return (
     loading ? (
      <Loader />
     ):
      <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col   md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  User Management
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  Manage and view all registered users
                </p>
              </div>
              
              {/* Stats Card */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className=" bg-linear-to-br from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl
                 shadow-xl"
              >
                <div className="text-3xl font-bold">{users.length}</div>
                <div className="text-sm opacity-90">Total Users</div>
              </motion.div>
            </div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 "
            >
              <div className="relative max-w-md mx-auto">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
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
                <h2 className="text-white font-semibold text-lg flex items-center gap-2">
                  <FaUser />
                  Users List
                </h2>
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <Loader />
                  <p className="text-gray-600 mt-4 font-medium">Loading users...</p>
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-7xl mb-4">🔍</div>
                  <p className="text-gray-700 text-xl font-semibold">
                    {searchTerm ? 'No users found' : 'No users registered yet'}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {searchTerm ? 'Try a different search term' : 'Users will appear here once they register'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-purple-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-blue-500" />
                          Name
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <FaEnvelope className="text-purple-500" />
                          Email
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <div className="flex items-center  gap-2">
                          <FaCalendarAlt className="text-pink-500" />
                          Joined Date
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => {
                      const joinDate = new Date(user.createdAt);
                      const formattedDate = moment(joinDate).format("MMM DD, YYYY");
                      
                      return (
                        <motion.tr 
                          key={user._id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                        >
                          <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-100 to-purple-100 text-purple-700  ">
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm">
                            <div className="flex items-center gap-3">
                              <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {user.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="truncate max-w-xs">{isDemoAdmin?("❌ email can't be displayed"):user.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm">
                            <div className="space-y-1">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-linear-to-r from-blue-100 to-purple-100 text-purple-700 shadow-sm">
                                {formattedDate}
                              </span>
                              
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
}

export default AllUserList
