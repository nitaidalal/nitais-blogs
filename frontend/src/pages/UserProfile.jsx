import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaUser, FaCalendar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const navigate = useNavigate();
  const { axios, setUser: setContextUser, token, isAuthLoading } = useAppContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Wait for auth to finish loading
    if (isAuthLoading) {
      return;
    }

    // Now check if user is authenticated
    if (!token) {
      toast.error("Please login to access your profile");
      navigate("/login");
      return;
    }

    // User is authenticated, fetch profile
    fetchUserProfile();
  }, [isAuthLoading, token]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await axios.get("/user/profile");
      setUser(data.data);
      setEditName(data.data.name);
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        // Token is invalid or expired, clear auth and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setContextUser(null);
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(error.response?.data?.message || "Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdating(true);
    try {
      const { data } = await axios.put("/user/profile", { name: editName });
      setUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
      setContextUser(data.data); // Update context so navbar updates immediately
      toast.success(data.message);
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to get initials from full name
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      // If only one name, return first letter
      return nameParts[0].charAt(0).toUpperCase();
    }
    // Return first letter of first name and first letter of last name
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  if (isAuthLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-slate-500 to-slate-600 p-8 text-white text-center">
            <div className="w-32 h-32 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-6xl font-bold text-primary shadow-lg">
              {getInitials(user?.name)}
            </div>
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-white/80">Manage your account information</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Name Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Full Name
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <FaEdit />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your name"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={updating}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSave />
                      {updating ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(user.name);
                      }}
                      disabled={updating}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                      <FaTimes />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-semibold text-gray-800">
                    {user?.name}
                  </p>
                </div>
              )}
            </div>

            {/* Email Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-primary">✉️</span>
                Email Address
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-lg text-gray-700">{user?.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* Account Created Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendar className="text-primary" />
                Member Since
              </h2>
              <div className="bg-linear-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <p className="text-lg font-semibold text-gray-800">
                  {formatDate(user?.createdAt)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Thank you for being part of our community! 🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
