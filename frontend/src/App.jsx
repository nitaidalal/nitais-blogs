import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Page404 from "./pages/Page404";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ListBlog from "./pages/admin/ListBlog";
import AddBlog from "./pages/admin/AddBlog";
import Comments from "./pages/admin/Comments";
import Login from "./pages/Login";
import About from "./pages/About";
import BlogList from "./components/BlogList";
import ContactForm from "./components/ContactForm";
import Registration from "./pages/Registration";
import UserProfile from "./pages/UserProfile";
import AllUserList from "./pages/admin/AllUserList";
import Unsubscribe from "./pages/Unsubscribe";

const App = () => {
  const { token, isTokenValid } = useAppContext();

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 80,
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "500px",
          },
          success: {
            duration: 3000,
            style: {
              background: "#d1fae5",
              color: "#065f46",
              border: "1px solid #10b981",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#fee2e2",
              color: "#7f1d1d",
              border: "1px solid #ef4444",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
          loading: {
            style: {
              background: "#dbeafe",
              color: "#1e3a8a",
              border: "1px solid #3b82f6",
            },
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <ScrollToTop />

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Route>

        <Route
          path="/admin"
          element={isTokenValid(token) ? <AdminLayout /> : <Login />}
          key={token}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="list-blog" element={<ListBlog />} />
          <Route path="all-users" element={<AllUserList />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
