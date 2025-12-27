import React, { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import {motion} from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const {axios,navigate} = useAppContext();




  const handleChange = (e) => {
    const {id,value} = e.target;
    setFormData((prev) => ({
      ...prev, [id]:value
    }))
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {

        toast.error("All fields are required.");
        return;      
    }

    if(formData.name.length < 3) {
        toast.error("Name should be at least 3 characters long.");
        return;      
    }
    //regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;      
    }
    if (formData.message.length < 10) {
        toast.error("Message should be at least 10 characters long.");
        return;      
    }
    try {
      // Send data to backend
      const response = await axios.post("/user/contact", formData);
      const { data } = response;
      toast.success(data.message);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while sending the message.");
      return;
    }
    
  }

  return (
    <div className="h-screen mx-auto mt-15">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-screen text-center   flex flex-col gap-8 items-center justify-center font-semibold"
        >
          {/* add an avatar of saying thank you */}
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=thankyou"
            alt="Thank you avatar"
            className="w-24 h-24 rounded-full"
          />
          <p className="p-4 bg-blue-50  rounded text-green-600 text-2xl">
            🎉 Thank you for reaching out! We'll get back to you soon.
          </p>
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer flex bg-primary text-white px-4 py-3 rounded-full gap-2 hover:bg-purple-700 active:scale-95 transition duration-300 "
          >
            {" "}
            <ArrowLeft /> Back to Home
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto  my-5 text-center"
          >
            <h1 className="text-4xl font-semibold text-primary">
              Get in Touch
            </h1>
          </motion.div>

          <div className="border border-gray-300 rounded-lg p-8 shadow-lg max-w-2xl mx-4 sm:mx-auto">
            <form>
              <div className="flex flex-col gap-6 mx-auto ">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-medium text-gray-700 px-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-medium text-gray-700 px-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="font-medium text-gray-700 px-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="5"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  onKeyDown={HandleSubmit}
                  onClick={HandleSubmit}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ContactForm
