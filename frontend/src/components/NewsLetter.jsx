import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const NewsLetter = () => {
  const { axios,user,navigate } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    if(!user || !user.email){
      toast.error("Please login to subscribe to the newsletter.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `/newsletter/subscribe`,
        { user }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to subscribe. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-30 rounded-lg flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl md:text-4xl mb-2 font-medium ">
        Never miss a Blog!
      </h1>
      <p className="text-gray-600 md:text- mb-5">
        Subscribe to our newsletter to stay updated on the latest posts.
      </p>
      
        <button
        onClick={handleSubmit}
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-r hover:bg-blue-800 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Subscribing..." : "Click here to Subscribe"}
        </button>
    </div>
  );
};

export default NewsLetter;
