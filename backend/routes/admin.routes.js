import {addBlog, dashboardData, deleteBlogById, deleteCommentById, editBlogById, generateContent, getAllBlogsAdmin, getAllCommentsAdmin, getAllUsers, togglePublish, getBlogById} from '../controllers/admin.controller.js';
import express from 'express';
import upload from "../middleware/multer.js";
import adminAuth from '../middleware/adminAuth.js';
import { blockDemoWrites } from '../middleware/demoCheck.js';
const adminRouter = express.Router();

// adminRouter.post('/login', adminLogin);
adminRouter.get('/dashboard',adminAuth, dashboardData);
adminRouter.get('/blogs',adminAuth, getAllBlogsAdmin);
adminRouter.get('/blog/:id',adminAuth, getBlogById);
adminRouter.get('/comments',adminAuth, getAllCommentsAdmin);
adminRouter.post("/addBlog", upload.single("image"),adminAuth, blockDemoWrites, addBlog);
// adminRouter.post('/approve-comment/:id',adminAuth, approveCommentById);
adminRouter.delete('/delete-comment/:id',adminAuth, blockDemoWrites, deleteCommentById);
adminRouter.delete("/deleteBlog/:id", adminAuth, blockDemoWrites, deleteBlogById);
adminRouter.put("/toggle-publish/:id", adminAuth, blockDemoWrites, togglePublish);

adminRouter.post("/generate-content",adminAuth, blockDemoWrites, generateContent);

//update blog route
adminRouter.put("/updateBlog/:id", upload.single("image"), adminAuth, blockDemoWrites, editBlogById);

//Get all users
adminRouter.get("/allUsers", adminAuth, getAllUsers);

export default adminRouter;
