import  { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaHeart } from 'react-icons/fa'; 
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import { assets } from "../assets/assets";


const Blog = () => {
  const {axios, token, user,navigate} = useAppContext();
  const { id } = useParams();
  const [data,setData]  = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false); 
  const [isLiking, setIsLiking] = useState(false);


  const fetchBlogData = async () => {
    const { data } = await axios.get(`/user/view/${id}`); // 
    console.log("Fetched blog data:", data);
    setData(data.data);
    setLikeCount(data.data.likeCount || 0);
    setLoading(false);
  }

  // Check if current user has already liked this blog whenever user or data changes
  useEffect(() => {
    if (user && data && data.likes) {
      setHasLiked(data.likes.includes(user.id));
    }
  }, [user, data]);

  const fetchComments = async () => {
    const {data} = await axios.get(`/user/comments/${id}`);
    setComments(data.data);
  }
  
  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like this blog");
      navigate('/login');
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    try {
      const { data } = await axios.post(`/user/like/${id}`);
      setLikeCount(data.data.likeCount);
      setHasLiked(data.data.hasLiked);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like blog");
    } finally {
      setIsLiking(false);
    }
  };
  
  const addComment = async (e) => {
    e.preventDefault();
    const {data} = await axios.post(`/user/comment/${id}`, {
      name,
      content
    });
    setComments([data.data, ...comments]);
    toast.success(data.message);
    setName('');
    setContent('');
    console.log('Comment added:', data.data);
  }

  useEffect(() => {
    setLoading(true);
    fetchBlogData();
    fetchComments();
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply syntax highlighting to all code blocks after content is loaded
    if (data) {
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          block.removeAttribute('data-highlighted');
          hljs.highlightElement(block);
          
          // Add copy button if not already added
          const pre = block.parentElement;
          if (pre && !pre.querySelector('.copy-btn')) {
            // Make pre relative for absolute positioning of button
            pre.style.position = 'relative';
            
            // Create copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>';
            copyBtn.title = 'Copy code';
            
            // Add click handler
            copyBtn.addEventListener('click', () => {
              const code = block.textContent;
              navigator.clipboard.writeText(code).then(() => {
                // Change icon to checkmark
                copyBtn.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';
                copyBtn.classList.add('copied');
                toast.success('Code copied to clipboard!');
                
                // Reset after 2 seconds
                setTimeout(() => {
                  copyBtn.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>';
                  copyBtn.classList.remove('copied');
                }, 2000);
              }).catch(err => {
                toast.error('Failed to copy code');
                console.error('Copy failed:', err);
              });
            });
            
            pre.appendChild(copyBtn);
          }
        });
      }, 500);
    }
  }, [data]);


  return loading || !data ? (
    <Loader />
  ) : (
    <>
      <div className="relative ">
        <img
          src={assets.gradientBackground}
          alt=""
          className="absolute -top-50 -z-1 opacity-50"
        />
        <div className="text-center mt-20 text-gray-600">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-primary py-4 font-medium"
          >
            Published on {Moment(data.createdAt).format(" Do MMMM YYYY")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-5xl mb-6 font-semibold text-gray-500 mx-auto max-w-2xl"
          >
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex px-3 py-1.5 text-primary border border-gray-400 bg-primary/10 rounded-3xl"
          >
            Nitai Dalal
          </motion.p>
        </div>
        {/* Blog Image and Content */}
        <div className=" max-w-5xl mx-auto my-10 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-3xl aspect-video overflow-hidden rounded-3xl shadow-md mx-auto mb-6"
          >
            <img
              src={data.image}
              alt={data.title}
              className="object-cover transition-transform duration-500 hover:scale-105 rounded-3xl "
            />
          </motion.div>
          
          {/* Like Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto max-w-3xl mb-6"
          >
            <button
              onClick={handleLike}
              disabled={isLiking}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title={token ? (hasLiked ? "Unlike" : "Like") : "Login to like"}
            >
              <FaHeart className={`text-xl ${hasLiked ? "text-red-500" : "text-gray-400"}`} />
              <span className="font-medium text-gray-700">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
            </button>
          </motion.div>

          { /* Blog Description */}
          <motion.div
            initial={{ opacity: 0 , y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rich-text mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></motion.div>
          <div className="lg:my-10 mx-auto max-w-3xl">
            <p className="font-medium">Comments ({comments.length})</p>
            <div className="flex flex-col gap-4 mt-6">
              {comments.map((comment) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  key={comment._id}
                  className=" bg-primary/10 border border-gray-300 rounded-lg p-4 relative"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={assets.user_icon}
                      alt={comment.name}
                      className="w-10 mr-2"
                    />
                    <p className="font-semibold">{comment.name}</p>
                  </div>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                  <p className=" text-xs font-medium px-2 py-1 border bg-green-100 rounded-4xl text-green-500 absolute top-2 right-1 sm:right-4 ">
                    {Moment(comment.createdAt).fromNow()}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          { /* Add Comment Section */}
          <div className="my-10 mx-auto max-w-3xl">
            <h2 className="mb-6 font-semibold">Add a Comment</h2>
            <form onSubmit={addComment} className="flex flex-col gap-4">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Your Comment"
                rows={4}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-lg w-max hover:bg-blue-800 active:scale-95 transition-all duration-150"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Social Share Buttons */}
          <div className="flex gap-4 mt-10 items-center max-w-3xl mx-auto">
            <p className="text-gray-600 font-semibold">✅ Share this post:</p>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-white h-7 w-7 rounded-full bg-slate-700 p-1 hover:scale-110 transition-all duration-150" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-white h-7 w-7 rounded-full bg-blue-600 p-1 hover:scale-110 transition-all duration-150" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-white h-7 w-7 rounded-full bg-blue-700 p-1 hover:scale-110 transition-all duration-150" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default Blog;
