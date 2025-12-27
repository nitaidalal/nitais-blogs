import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import imageKit from '../config/imageKit.js';
import main from '../config/gemini.js';
import User from '../models/User.js';
import Subscriber from '../models/Subscriber.js';
import { sendNewBlogEmail } from '../config/email.js'; 
import { generateUnsubscribeToken } from './newsletter.controller.js';



export const getAllBlogsAdmin = async (req,res) => {
    try {
        const blogs = await Blog.find().sort({createdAt: -1});
        // if(blogs.length === 0){
        //     return res.status(404).json({success:false, message: "No blogs posted yet"});
        // }
        res.status(200).json({success:true, data: blogs});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getBlogById = async (req,res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({success:false, message: "Blog not found"});
        }
        res.status(200).json({success:true, data: blog});
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllCommentsAdmin = async (req,res) => {
    try {
        const comments = await Comment.find().populate("blog").sort({createdAt: -1});
        if(comments.length === 0){
            return res.status(404).json({success:false, message: "No comments posted yet"});
        }
        res.status(200).json({success:true, data: comments});
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const dashboardData = async (req,res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const totalBlogs = await Blog.countDocuments();
        const totalComments = await Comment.countDocuments();
        const totalDrafts = await Blog.countDocuments({isPublished:false});
        const dashboardData = {
            recentBlogs, totalBlogs, totalComments, totalDrafts
        };

        res.status(200).json({success:true, data:dashboardData});
        
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteCommentById = async (req,res) => {
    try {
        const {id} = req.params;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Comment deleted successfully"});
        
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// export const approveCommentById = async (req,res) => {
//     try {
//         const {id} = req.params;
//         await Comment.findByIdAndUpdate(id, {isApproved:true});
//         res.status(200).json({success:true, message: "Comment approved successfully"});
//     } catch (error) {
//         console.error("Error approving comment:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// }


export const addBlog = async (req, res) => {
  try {
    const { title, description, category, isPublished } = req.body;
    const imageFile = req.file;
    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // upload image to imagekit
    const uploadResponse = await imageKit.upload({
      file: imageFile.buffer,
      fileName: `${Date.now()}-${imageFile.originalname}`,
      folder: "/blog_images",
    });

    //optimize image url
    const optimizedImageUrl = imageKit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // save blog post to database
    const newBlog = new Blog({
      title,
      description,
      category,
      isPublished,
      image: optimizedImageUrl,
    });
    await newBlog.save();

    // Send email to subscribers if published
    if (isPublished) {
      const subscribers = await Subscriber.find({ isSubscribed: true });
      subscribers.forEach(async (sub) => {
        try {
          const unsubscribeToken = generateUnsubscribeToken(sub);
          await sendNewBlogEmail(sub.email, sub.name, title, newBlog._id, unsubscribeToken);
        } catch (err) {
          console.error('Email send error:', err);
        }
      });
    }

    res.status(201).json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    blog.isPublished = !blog.isPublished;
    await blog.save();

    // Send email to subscribers if now published
    if (blog.isPublished) {

      const subscribers = await Subscriber.find({ isSubscribed: true });
      subscribers.forEach(async (sub) => {
        try {
          const unsubscribeToken = generateUnsubscribeToken(sub);
          await sendNewBlogEmail(sub.email, sub.name, blog.title, blog._id, unsubscribeToken);
        } catch (err) {
          console.error('Email send error:', err);
        }
      });
    }

    res
      .status(200)
      .json({
        success: true,
        data: blog,
        message: `Blog ${
          blog.isPublished ? "published" : "unpublished"
        } successfully`,
      });
  } catch (error) {
    console.error("Error toggling blog publish status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    // delete associated comments
    await Comment.deleteMany({ blog: id });

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const generateContent = async (req,res) => {
  try {
    const { prompt } = req.body;
    if(!prompt){
        return res.status(400).json({success:false, message: "Prompt is required"});
    }
    const content = await main(prompt + ` Generate a detailed blog post content for this topic. 
    
    IMPORTANT INSTRUCTIONS:
    - Write in proper Markdown format
    - Use code blocks with triple backticks (\`\`\`) for code snippets
    - Specify the language after the opening triple backticks (e.g., \`\`\`javascript, \`\`\`python, \`\`\`java)
    - Use headings (##, ###) to structure the content
    - Use bullet points or numbered lists where appropriate
    - Make the content engaging and informative
    - Don't start with phrases like "Here is your answer..." - just provide the content directly
    - At the end, write 1-2 lines encouraging readers to share their thoughts in comments
    
    Example code block format:
    \`\`\`javascript
    const example = "code here";
    \`\`\`
    `);
    res.status(200).json({success:true, data: content});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



export const editBlogById = async (req,res) => {
  try {
    const {id} = req.params;
    const { title, description, category, isPublished, existingImage } = req.body;
    const imageFile = req.file;

    const blog = await Blog.findById(id);
    if(!blog){
      return res.status(404).json({success:false, message:"Blog not found"});
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.category = category || blog.category;
    
    // Update isPublished if provided
    if (isPublished !== undefined) {
      blog.isPublished = isPublished === 'true' || isPublished === true;
    }

    if(imageFile){
      // upload new image to imagekit
      const uploadResponse = await imageKit.upload({
        file: imageFile.buffer,
        fileName: `${Date.now()}-${imageFile.originalname}`,
        folder: "/blog_images",
      });

      //optimize image url
      const optimizedImageUrl = imageKit.url({
        path: uploadResponse.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
      
      blog.image = optimizedImageUrl;
    }

    await blog.save();
    res.status(200).json({success:true, data: blog, message:"Blog updated successfully"});
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}


export const getAllUsers = async (req,res) => {
  try {
    const users = await User.find().select("-password").sort({createdAt:-1});
    if(users.length === 0){
        return res.status(404).json({success:false, message: "No users found"});
    }
    res.status(200).json({success:true, data: users});
    
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

