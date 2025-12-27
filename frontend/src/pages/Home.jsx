import React from 'react'
import Header from '../components/Header'
import NewsLetter from '../components/NewsLetter'
import HomeBlogs from '../components/HomeBlogs'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaDatabase, FaPython, FaJs, FaGitAlt } from 'react-icons/fa'
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript } from 'react-icons/si'
import { ArrowRight } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Home = () => {
  const { navigate } = useAppContext();
  const skills = [
    { icon: <FaReact className="text-4xl text-blue-500" />, name: "React" },
    { icon: <FaNodeJs className="text-4xl text-green-600" />, name: "Node.js" },
    { icon: <SiExpress className="text-4xl text-gray-700" />, name: "Express" },
    { icon: <SiMongodb className="text-4xl text-green-500" />, name: "MongoDB" },
    { icon: <FaJs className="text-4xl text-yellow-500" />, name: "JavaScript" },
    { icon: <SiTailwindcss className="text-4xl text-cyan-500" />, name: "Tailwind" },
    { icon: <FaPython className="text-4xl text-blue-600" />, name: "Python" },
    { icon: <FaGitAlt className="text-4xl text-orange-600" />, name: "Git" }
  ];

  const featured = [
    {
      icon: "🎨",
      title: "Frontend Development",
      description: "Learn React, modern CSS, and responsive design patterns",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: "⚙️",
      title: "Backend Engineering",
      description: "Master Node.js, Express, REST APIs, and database design",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: "🚀",
      title: "Full Stack Projects",
      description: "Build complete applications from scratch to deployment",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Implement AI features using modern APIs and tools",
      color: "bg-pink-50 border-pink-200"
    }
  ];

  return (
    <div className="w-full mx-auto">
      <Header />

      {/* What I Write About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-8 sm:mx-16 xl:mx-24 my-20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4">
          What I Write About
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Practical tutorials and insights from real-world development
          experience
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {featured.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${item.color} p-6 rounded-xl border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-br from-gray-50 to-gray-100 py-16 my-20"
      >
        <div className="mx-8 sm:mx-16 xl:mx-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            Technologies I Work With
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Building with modern tools and frameworks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center"
              >
                {skill.icon}
                <p className="text-gray-700 font-medium mt-3 text-sm">
                  {skill.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Blogs */}
      <HomeBlogs />

      {/* My Journey Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-8 sm:mx-16 xl:mx-24 my-20"
      >
        <div className="flex gap-6 flex-col-reverse sm:flex-row  bg-gray-100 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-slate-900">
              My Developer Journey
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed mb-6">
                I'm Nitai Dalal, a full-stack developer passionate about
                creating modern web applications. My journey started with
                curiosity about how websites work, and now I build complete
                applications using the MERN stack.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Through this blog, I document what I learn - the successes, the
                challenges, and everything in between. Each post reflects real
                problems I've solved and lessons I've learned while building
                projects.
              </p>

              <button
                onClick={() => navigate("/about#meet-nitai")}
                className="w-full bg-primary hover:scale-105 active:scale-95 transition duration-300 text-white py-2 rounded cursor-pointer 
              "
              >
                Know More <ArrowRight className="inline ml-1" />{" "}
              </button>
            </div>
          </div>
          <div className="flex items-center mx-auto ">
            <img
              src="developer.png"
              alt="Developer"
              className="max-w-xm md:max-w-md rounded-lg overflow-hidden object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  );
}

export default Home
