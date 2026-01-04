import { assets } from "../assets/assets";
import {motion} from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket, FaUsers } from 'react-icons/fa';
import { useAppContext } from "../context/AppContext";
const Header = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative mt-10">
      <div className="flex gap-8 flex-col-reverse sm:flex-row justify-between items-center sm:py-16">
        <div className="flex-1 text-center sm:text-left">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            
            className=" mb-4"
          >
            <span className="bg-linear-to-r from-primary to-purple-600 text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
              <span className="text-lg">👋</span>
              Welcome To My Blogs
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            
            className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-gray-700 leading-tight"
          >
            Hey, I'm <span className="text-primary">Nitai Dalal</span>
            <br />
            Full Stack Developer & Tech Writer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mt-6 font-medium sm:text-lg max-w-2xl sm:mx-0 mx-auto"
          >
            Building modern web applications with the MERN stack. Here, I share
            tutorials, insights, and practical solutions from my development
            journey.
          </motion.p>

          <div className="flex gap-10 flex-col sm:flex-row  mt-18 sm:justify-start justify-center text-white">
            <button
              onClick={() => navigate("/blogs")}
              className="px-6 py-2.5 rounded-lg border-2 border-primary text-primary font-medium cursor-pointer relative overflow-hidden group transition-colors duration-300 hover:text-white"
            >
              <span className="relative z-10">Read Blogs</span>
              <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </button>
            <button onClick={() => navigate("/contact")} className="px-6 py-2.5 rounded-lg bg-primary font-medium cursor-pointer hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Contact Me
            </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex items-center justify-center sm:justify-end shrink-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ boxShadow: "0 0 40px 0 #a855f7" }}
            className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 rounded-full p-2 bg-linear-to-tr from-primary via-purple-400 to-blue-400 shadow-2xl hover:shadow-purple-300 transition-all duration-300 group"
          >
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img
                src="dp.jpeg"
                alt="Nitai Dalal"
                className="h-full w-full object-cover rounded-full  shadow-xl"
                draggable={false}
                /* Prevent image copy */
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <img
        src={assets.linearBackground}
        alt=""
        className="absolute -z-1 -top-50 "
      />
    </div>
  );
};

export default Header;
