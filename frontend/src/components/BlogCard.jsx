import { useAppContext } from "../context/AppContext";
import Moment from "moment";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const { navigate, axios, token, user } = useAppContext();
  const [likeCount, setLikeCount] = useState(blog.likeCount || 0);
  const [hasLiked, setHasLiked] = useState(user && blog.likes.includes(user.id ));
  const [isLiking, setIsLiking] = useState(false);

  // Check if current user has already liked this blog
  // useEffect(() => {
  //   if (user && blog.likes) {
  //     const userHasLiked = blog.likes.includes(user.id || user._id);
  //     setHasLiked(userHasLiked);
  //   }
  // }, [user, blog.likes]);

  const handleLike = async (e) => {
    e.stopPropagation(); 
    
    if (!token) {
      toast.error("Please login to like this blog");
      navigate('/login');
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    try {
      const { data } = await axios.post(`/user/like/${_id}`);
      setLikeCount(data.data.likeCount);
      setHasLiked(data.data.hasLiked);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like blog");
    } finally {
      setIsLiking(false);
    }
  };
  // if (!blog) {
  //   return <p className="text-center mt-10 text-gray-600">No blogs available.</p>;
  // }
 
  
  return (
    <>
      <div
        onClick={() => navigate(`/blog/${_id}`)}
        className=" max-w-64 h-[370px] border border-gray-200 rounded-lg relative overflow-hidden cursor-pointer hover:shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-200 "
      >
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover object-center mb-4"
        />
        <div className="flex justify-between items-center px-3 flex-wrap gap-2">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className="flex items-center gap-1 text-sm hover:scale-110 transition-all duration-150 disabled:opacity-50"
            title={token ? (hasLiked ? "Unlike" : "Like") : "Login to like"}
          >
            <FaHeart
              className={`${hasLiked ? "text-red-500" : "text-gray-400"}`}
            />
            <span className="text-gray-700 font-medium">{likeCount}</span>
          </button>

          <p className="text-xs px-3 py-1 bg-primary rounded-full text-white shadow-md">
            {Moment().diff(Moment(blog.createdAt), "hours") < 24
              ? Moment(blog.createdAt).fromNow()
              : Moment(blog.createdAt).format("MMMM Do, YYYY")}
          </p>
          <motion.p
            //infiite blinking animation
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className=" px-3 py-1 shadow-[10px_10px_30px_rgba(236,72,153,0.8)]  inline bg-pink-100 border border-pink-400 rounded-full text-black absolute top-2 right-1 text-xs  "
          >
            {category
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </motion.p>
        </div>

        <div className="p-2 overflow-hidden">
          <h5 className="font-medium mb-2 text-gray-900 ">{title}</h5>
          <p
            className="mb-1 text-xs text-gray-600"
            dangerouslySetInnerHTML={{
              __html: description.slice(0, 100) + " ...",
            }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
