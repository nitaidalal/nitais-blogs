import { addComment,  getAllComments,  viewAllBlogs, viewSingleBlog, contactForm, getUserProfile, updateUserProfile, toggleLike } from "../controllers/user.controller.js";
import userAuth from "../middleware/userAuth.js";

import express from "express";

const userRouter = express.Router();



// Profile routes (protected)
userRouter.get("/profile", userAuth, getUserProfile);
userRouter.put("/profile", userAuth, updateUserProfile);

// Blog routes
userRouter.get("/view-all", viewAllBlogs);
userRouter.get("/view/:id", viewSingleBlog);

// Like route (protected)
userRouter.post("/like/:id", userAuth, toggleLike);

// Comment routes
userRouter.post("/comment/:id", addComment);
userRouter.get("/comments/:id", getAllComments);

// Contact route
userRouter.post("/contact", contactForm);

export default userRouter;