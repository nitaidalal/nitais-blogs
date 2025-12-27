import { createContext, useContext,useState,useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user/view-all");
      setBlogs(data.data);
    } catch (error) {
      toast.error(error.response.data.message || "Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  //  Token Validation Helper
  // --------------------------
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
        return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // --------------------------
  //  Load Token from Storage
  // --------------------------
  useEffect(() => {
    setIsAuthLoading(true);
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    fetchBlogs();

    if (isTokenValid(savedToken)) {
      setToken(savedToken);
      // Set axios default header so all requests include token after refresh
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
      
      // Load user data if exists
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("user");
        }
      }
    } else {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = "";
    }
    setIsAuthLoading(false);
  }, []);


  const value = {
    axios,
    navigate,
    token,
    setToken,
    user,
    setUser,
    isTokenValid,
    blogs,
    setBlogs,
    searchInput,
    setSearchInput,
    isAuthLoading,
    loading
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
    return useContext(AppContext);
}