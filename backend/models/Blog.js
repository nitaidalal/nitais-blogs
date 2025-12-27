import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    likeCount:{
        type:Number,
        default:0
    }

}, {timestamps:true});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;