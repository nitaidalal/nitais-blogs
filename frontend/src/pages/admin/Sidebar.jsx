import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div
      className="flex flex-col border-r border-gray-200 min-h-full pt-6 
      w-[60px] md:w-[220px] transition-all duration-300"
    >
      <NavLink
        end
        to="/admin/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-2 md:px-6 relative cursor-pointer transition-all
          ${
            isActive
              ? "bg-primary/10 md:border-r-4 md:border-primary text-primary"
              : "text-gray-700"
          }`
        }
      >
        {/* ✅ Active side highlight only visible on desktop, removed absolute element */}
        <img
          src={assets.home_icon}
          alt="dashboard"
          className="w-6 mx-auto md:mx-0"
        />

        {/* ✅ Hide text on mobile */}
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        end
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-2 md:px-6 relative cursor-pointer transition-all
          ${
            isActive
              ? "bg-primary/10 md:border-r-4 md:border-primary text-primary"
              : "text-gray-700"
          }`
        }
      >
        <img
          src={assets.add_icon}
          alt="add blog"
          className="w-6 mx-auto md:mx-0"
        />

        <p className="hidden md:inline-block">Add blogs</p>
      </NavLink>

      <NavLink
        end
        to="/admin/list-blog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-2 md:px-6 relative cursor-pointer transition-all
          ${
            isActive
              ? "bg-primary/10 md:border-r-4 md:border-primary text-primary"
              : "text-gray-700"
          }`
        }
      >
        <img
          src={assets.list_icon}
          alt="list blog"
          className="w-6 mx-auto md:mx-0"
        />

        <p className="hidden md:inline-block">List blogs</p>
      </NavLink>

      <NavLink
        end
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5  px-2 md:px-6 relative cursor-pointer transition-all
          ${
            isActive
              ? "bg-primary/10 md:border-r-4 md:border-primary text-primary"
              : "text-gray-700"
          }`
        }
      >
        <img
          src={assets.comment_icon}
          alt="list blog"
          className="w-6 mx-auto md:mx-0"
        />

        <p className="hidden md:inline-block">Comments</p>
      </NavLink>

      <NavLink
        end to = "/admin/all-users"
        className = {({ isActive }) =>
          `flex items-center gap-3 py-3.5  px-2 md:px-6 relative cursor-pointer transition-all
          ${
            isActive
              ? "bg-primary/10 md:border-r-4 md:border-primary text-primary"
              : "text-gray-700"
          }`
        }
      >
        <img
          src={assets.user_icon}
          alt="users"
          className="w-6 mx-auto md:mx-0"
        />

        <p className="hidden md:inline-block">Users</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
