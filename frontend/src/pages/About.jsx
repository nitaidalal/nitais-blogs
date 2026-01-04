import { FaBook, FaComments, FaLightbulb, FaRocket, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaHeart, FaCoffee } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {motion} from 'framer-motion';

const About = () => {
    const location = useLocation();
    
    useEffect(() => {
        // Check if there's a hash in the URL
        if (location.hash) {
            // Remove the # from the hash
            const id = location.hash.replace('#', '');
            // Find the element with that ID
            const element = document.getElementById(id);
            if (element) {
                // Scroll to the element with smooth behavior
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    const features = [
        { icon: <FaBook className="text-3xl text-indigo-600" />, title: "Learn & Grow", description: "Access tutorials, guides, and insights on web development, AI, algorithms, and more" },
        { icon: <FaComments className="text-3xl text-purple-600" />, title: "Engage & Share", description: "Share your thoughts and questions in the comments section of each blog post" },
        { icon: <FaLightbulb className="text-3xl text-yellow-500" />, title: "Practical Solutions", description: "Get real-world examples and code snippets you can use in your projects" },
        { icon: <FaRocket className="text-3xl text-blue-600" />, title: "Stay Updated", description: "Discover the latest trends and best practices in software development" }
    ];

    return (
      <div className="bg-linear-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl leading-relaxed font-bold text-center bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-3"
            >
              Welcome to My Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-gray-700 text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto"
            >
              This is a platform where I share my journey in software
              development. Whether you're a beginner learning to code or an
              experienced developer looking for insights, you'll find helpful
              content, tutorials, and real-world solutions here.
            </motion.p>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-3xl">📚</p>
                <p className="text-gray-800 font-semibold mb-1">Learn</p>
                <p className="text-gray-600 text-sm">Step-by-step tutorials</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="p-4 bg-purple-50 rounded-lg"
              >
                <p className="text-3xl">💡</p>
                <p className="text-gray-800 font-semibold mb-1">Discover</p>
                <p className="text-gray-600 text-sm">Tips & best practices</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="p-4 bg-green-50 rounded-lg"
              >
                <p className="text-3xl">🚀</p>
                <p className="text-gray-800 font-semibold mb-1">Build</p>
                <p className="text-gray-600 text-sm">Real-world projects</p>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* What You'll Find Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              What You'll Find Here
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Author Section - Enhanced */}
          <motion.div
            // initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // viewport={{ once: true }}
            // transition={{ duration: 0.6 }}
            id="meet-nitai"
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          >
            {/* Header with linear */}
            <div className="bg-linear-to-br from-primary to-green-600 text-white p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 rounded-full mx-auto mb-6  shadow-2xl transform hover:scale-110 transition-transform duration-300  overflow-hidden">
                  <img
                    src="dp.jpeg"
                    alt="Nitai Dalal"
                    className="object-cover h-full w-full"
                  />
                </div>
                <h2 className="text-4xl md:text-5xl  mb-4">
                  Meet <span className="font-bold">Nitai Dalal</span>
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  Full-Stack Developer | Tech Enthusiast | Knowledge Sharer
                </p>
                <div className="flex justify-center gap-4 flex-wrap mb-6">
                  <span className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-300 flex items-center gap-2">
                    <FaCode /> Developer
                  </span>
                  <span className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors duration-300 flex items-center gap-2">
                    <FaHeart /> Learner
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                {/* Introduction */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl">👋</span> Hello There!
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    I'm{" "}
                    <span className="font-bold text-primary text-xl">
                      Nitai Dalal
                    </span>
                    , a passionate full-stack developer who loves turning ideas
                    into reality through code. This blog is my digital
                    playground where I share my journey, learnings, and
                    discoveries in the vast world of software development.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    What started as a personal project to document my coding
                    journey has evolved into a comprehensive platform where I
                    share tutorials, insights, and real-world solutions with the
                    developer community.
                  </p>
                </div>

                {/* Skills & Technologies */}
                <div className="mb-10 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-3xl">🛠️</span> Tech Stack & Skills
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                        Frontend Development
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React",
                          "JavaScript",
                          "Tailwind CSS",
                          "HTML5",
                          "CSS3",
                          "Vite",
                        ].map((tech, index) => (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                            key={tech}
                            className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium shadow-sm border border-blue-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                        Backend Development
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Node.js",
                          "Express",
                          "MongoDB",
                          "REST APIs",
                          "JWT",
                        ].map((tech, index) => (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                            key={tech}
                            className="px-3 py-1 bg-white text-green-600 rounded-full text-sm font-medium shadow-sm border border-green-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                        Tools & Services
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Git", "GitHub", "Postman", "VS Code"].map(
                          (tech, index) => (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: index * 0.2 }}
                              key={tech}
                              className="px-3 py-1 bg-white text-purple-600 rounded-full text-sm font-medium shadow-sm border border-purple-200"
                            >
                              {tech}
                            </motion.span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3 text-lg">
                        Currently Learning
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "TypeScript",
                          "Next.js",
                          "Docker",
                          "AWS",
                          "GraphQL",
                        ].map((tech,index) => (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                            key={tech}
                            className="px-3 py-1 bg-white text-orange-600 rounded-full text-sm font-medium shadow-sm border border-orange-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why This Blog */}
                <div className="mb-10 bg-linear-to-r from-indigo-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-3xl">💭</span> Why I Created This Blog
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-start  gap-3">
                      <span className="text-xl mt-1">✅</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">
                          Document My Journey:
                        </span>{" "}
                        Keep track of what I learn, the challenges I face, and
                        how I overcome them.
                      </p>
                    </div>
                    <div className="flex items-center justify-start gap-3">
                      <span className="text-xl mt-1">✅</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">Help Others:</span> If
                        my tutorials and experiences can save someone hours of
                        debugging, it's all worth it.
                      </p>
                    </div>
                    <div className="flex items-center justify-start gap-3">
                      <span className="text-xl mt-1">✅</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">Stay Accountable:</span>{" "}
                        Writing about development keeps me motivated and
                        continuously learning.
                      </p>
                    </div>
                    <div className="flex items-center justify-start gap-3">
                      <span className="text-xl mt-1">✅</span>
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold">
                          Connect with Community:
                        </span>{" "}
                        Meet like-minded developers and learn from their
                        experiences too.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fun Facts */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="text-3xl">⚡</span> Quick Facts About Me
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-2xl">🌙</span>
                      <p className="text-gray-700">
                        Night owl - Best code happens at 2 AM
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-2xl">📚</span>
                      <p className="text-gray-700">
                        Always learning something new
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Connect */}
                <div className="bg-linear-to-r from-gray-800 to-slate-600 text-white rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Let's Connect!</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    I'd love to hear from you! Whether you have questions,
                    suggestions, or just want to chat about tech, feel free to
                    reach out.
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap mb-4">
                    <a
                      href="https://github.com/nitaidalal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <FaGithub className="text-xl" />
                      <span className="font-medium">GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/nitaidalal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <FaLinkedin className="text-xl" />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                    <a
                      href="https://twitter.com/nitaidalal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <FaTwitter className="text-xl" />
                      <span className="font-medium">Twitter</span>
                    </a>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105"
                    >
                      <FaEnvelope className="text-xl" />
                      <span className="font-medium">Contact</span>
                    </Link>
                  </div>
                  <p className="text-white/80 text-sm">
                    💡 Pro tip: The best way to learn is to teach. That's why I
                    write!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg mb-4">
              Ready to start learning? Dive into my blog posts!
            </p>
            <Link
              to="/blogs"
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-primary-dark transition-colors duration-300"
            >
              Explore Blogs
            </Link>
          </div>
        </motion.div>
      </div>
    );
};

export default About;