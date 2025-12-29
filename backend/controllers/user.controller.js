import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";



// Get User Profile for logged in user in frontend
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;

        if (!name || name.trim() === '') {
            return res.status(400).json({ success: false, message: "Name is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: name.trim() },
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const viewAllBlogs = async (req,res) => {
    try {
        // Pagination parameters from query string
        const page = parseInt(req.query.page) || 1; // default page 1
        const limit = parseInt(req.query.limit) || 8; // default 8 blogs per page
        const category = req.query.category || ''; // filter by category
        const search = req.query.search || ''; // search query

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Build query object
        let query = { isPublished: true };
        
        // Add category filter if provided and not 'all'
        if (category && category !== 'all') {
            query.category = new RegExp(category, 'i'); // case-insensitive match
        }

        // Add search filter if provided
        if (search) {
            query.$or = [
                { title: new RegExp(search, 'i') },
                { category: new RegExp(search, 'i') }
            ];
        }

        // Get total count for pagination metadata
        const totalBlogs = await Blog.countDocuments(query);
        
        // Fetch paginated blogs
        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Calculate total pages
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            success: true,
            data: blogs,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalBlogs: totalBlogs,
                blogsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const viewSingleBlog = async (req,res) => {
    try {
        const {id} = req.params;
        const blog =  await Blog.findById(id);
        if(!blog){
            return res.status(404).json({success:false, message: "Blog not found"});
        }
        res.status(200).json({success:true, data: blog});
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}




 export const addComment = async (req, res) => {
    try {
        const { id } = req.params; // blog id
        const { name, content } = req.body;
        if (!name || !content) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const newComment = new Comment({
            blog: id,
            name,
            content
        });
        await newComment.save();
        res.status(201).json({ success: true,data: newComment,  message: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getAllComments = async (req, res) => {
    try {
        const { id } = req.params; // blog id
        const comments = await Comment.find({ blog: id}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}



export const contactForm = async (req, res) => {
    try {
        const {name, email, message} = req.body;

        if(!name || !email || !message){
            return res.status(400).json({success:false, message: "All fields are required"});
        }
        // Save contact to database
        const newContact = new Contact({name, email, message});
        await newContact.save();
        
        res.status(201).json({success:true, message: "Message sent successfully"});
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export const toggleLike = async (req, res) => {
    try {
        const {id} = req.params; // blog id
        const userId = req.user.id;

        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({success:false, message: "Blog not found"});
        }
        // Check if user already liked the blog
        const alreadyLiked = blog.likes.includes(userId);
        if(alreadyLiked){
            blog.likes = blog.likes.filter(uid => uid.toString() !== userId);
        } else {
            blog.likes.push(userId);
        }
        
        blog.likeCount = blog.likes.length;
        await blog.save();
        
        res.status(200).json({
            success:true, 
            message: alreadyLiked ? "Blog unliked" : "Blog liked", 
            data: {
                likeCount: blog.likeCount,
                hasLiked: !alreadyLiked 
            }
        });
        
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

