import { useState, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import "highlight.js/styles/github-dark.css";
import "../../assets/tiptap.css";

import { UploadCloud, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

// Create lowlight instance with common languages (includes js, python, php, java, css, html, etc.)
const lowlight = createLowlight(common);

const AddBlog = () => {
  const { axios } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { blogId, editMode } = location.state || {};

  const [isAdding, setIsAdding] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const fileInputRef = useRef(null);
  const [blogData, setBlogData] = useState(null);

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // Fetch blog data if in edit mode
  useEffect(() => {
    const fetchBlogData = async () => {
      if (editMode && blogId) {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`/admin/blog/${blogId}`);
          const blog = data.data;
          
          setTitle(blog.title);
          setCategory(blog.category);
          setIsPublished(blog.isPublished);
          setExistingImageUrl(blog.image);
          setImagePreview(blog.image);
          setBlogData(blog);
        } catch (error) {
          console.error(error);
          toast.error(error.response?.data?.message || "Error fetching blog data");
          navigate('/admin/list-blog');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [editMode, blogId, axios, navigate]);

  // Set editor content when both editor and blogData are available
  useEffect(() => {
    if (editor && blogData?.description) {
      editor.commands.setContent(blogData.description);
    }
  }, [editor, blogData]);

  const validateImage = (file) => {
    if (!file) return "No file selected";
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) return "Only JPG, PNG, and WebP files are allowed.";
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) return "Image must be smaller than 5MB.";
    return "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    const validation = validateImage(file);
    if (validation) {
      setImagePreview(null);
      setImageFile(null);
      setErrors(validation);
      setTimeout(() => setErrors(""), 3000);
      // also clear the file input so user can re-choose the same file later if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // valid file
    setErrors("");
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editor) {
      toast.error("Editor not initialized");
      return;
    }

    try {
      setIsAdding(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", editor.getHTML());
      formData.append("isPublished", isPublished ? "true" : "false");
      
      // Only append image if a new one was selected
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (editMode && existingImageUrl) {
        // Keep existing image URL when editing without new image
        formData.append("existingImage", existingImageUrl);
      }

      let response;
      if (editMode && blogId) {
        response = await axios.put(`/admin/updateBlog/${blogId}`, formData);
        toast.success(response.data.message || "Blog updated successfully");
        navigate('/admin/list-blog');
      } else {
        response = await axios.post("/admin/addBlog", formData);
        toast.success(response.data.message || "Blog added");
        // reset form
        setTitle("");
        setCategory("");
        removeImage();
        editor.commands.clearContent();
        setIsPublished(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || `Error ${editMode ? 'updating' : 'adding'} blog`);
    } finally {
      setIsAdding(false);
    }
  };

  const generateContent = async () => {
    if (!title) {
      toast.error("Please enter a title to generate content");
      return;
    }
    
    if (!editor) {
      toast.error("Editor not initialized");
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.post("/admin/generate-content", { prompt: title });

      // Convert markdown to HTML
      const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(data.data);

      const htmlContent = String(result);
      
      // Set HTML content in TipTap
      editor.commands.setContent(htmlContent);
      toast.success("Content generated");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error generating content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50/50 rounded shadow p-10 min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl font-bold mb-4">{editMode ? "Edit Blog" : "Add New Blog"}</h1>
      <div className="max-w-xl bg-white p-6 rounded shadow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Image Upload Box */}
          <label className="font-medium text-gray-700">Upload Cover Image</label>

          {imagePreview && !errors ? (
            <div className="relative w-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition">
              <UploadCloud className="text-gray-500 mb-2" size={32} />
              <p className="text-sm text-gray-600">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, Webp (Max 5MB)</p>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp"
              />
            </label>
          )}
          {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}

          {/* Title */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded focus:outline-primary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Category</label>
            <select
              className="border border-gray-300 p-2 rounded focus:outline-primary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="ai">AI</option>
              <option value="dsa">DSA</option>
              <option value="personal journey">Personal Journey</option>
            </select>
          </div>

          {/* HTML Description */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Description</label>
            
            {editor && (
              <div className="border border-gray-300 border-b-0 rounded-t bg-gray-50 p-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={`px-3 py-1 rounded text-sm ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={`px-3 py-1 rounded text-sm ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={`px-3 py-1 rounded text-sm ${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`px-3 py-1 rounded text-sm font-bold ${
                    editor.isActive("bold")
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`px-3 py-1 rounded text-sm italic ${
                    editor.isActive("italic")
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={`px-3 py-1 rounded text-sm font-mono ${
                    editor.isActive("codeBlock")
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {"</>"}
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={`px-3 py-1 rounded text-sm ${
                    editor.isActive("bulletList")
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={`px-3 py-1 rounded text-sm ${
                    editor.isActive("orderedList")
                      ? "bg-blue-500 text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  1. List
                </button>
              </div>
            )}

            {/* TipTap Editor */}
            <div className="border border-gray-300 rounded-b bg-white min-h-[300px]">
              <EditorContent editor={editor} />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="button"
              disabled={loading}
              onClick={generateContent}
              className="text-sm text-white bg-orange-500 px-2 py-1.5 rounded cursor-pointer  disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Description With AI"}
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <p>Publish now</p>
            <input
              type="checkbox"
              className="h-4 w-4 hover:scale-105 cursor-pointer"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg w-max hover:bg-blue-800 active:scale-95 transition-all duration-150"
            disabled={isAdding}
          >
            {isAdding ? (editMode ? "Updating..." : "Adding...") : (editMode ? "Update Blog" : "Add Blog")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;