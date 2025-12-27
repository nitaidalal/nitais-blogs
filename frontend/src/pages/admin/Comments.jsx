import React, { useEffect, useState } from "react";
import { assets, comments_data } from "../../assets/assets";
import { MdDelete } from "react-icons/md";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([]);
  // const [filteredComments, setFilteredComments] = useState(false); // false = not approved, true = approved
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/admin/comments");
      setComments(data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error(error.response.data.message || "Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // // ✅ Approve a comment
  // const handleApprove = (id) => {
  //   setComments((prev) =>
  //     prev.map((c) => (c._id === id ? { ...c, isApproved: true } : c)) 
  //   );
  // };

  // // ✅ Disapprove a comment
  // const handleDisapprove = (id) => {
  //   setComments((prev) =>
  //     prev.map((c) => (c._id === id ? { ...c, isApproved: false } : c))
  //   );
  // };
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
      if (!confirmDelete) return;
      const { data } = await axios.delete(`/admin/delete-comment/${id}`);
      setComments((prev) => {
        return prev.filter((c) => c._id !== id);
      });
      toast.success(data.message);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting comment");
    }
  };

  // // ✅ Filter comments based on state
  // const filteredList = comments.filter((c) =>
  //   filteredComments ? c.isApproved === true : c.isApproved === false
  // );

  return (
    loading ? <Loader text = "comments" /> :
    <div className="bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 sm:pl-16 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex max-sm:flex-col gap-4 max-w-4xl justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Comments Management</h1>

        {/* <div className="flex gap-4">
          <button
            className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer  ${
              filteredComments
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => setFilteredComments(true)}
          >
            Approved
          </button>

          <button
            className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-full cursor-pointer  ${
              !filteredComments
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => setFilteredComments(false)}
          >
            Not Approved
          </button>
        </div> */}
        <div >
          <p className="text-white px-6 py-4 bg-linear-to-r from-blue-600 to-indigo-500 rounded-2xl text-center text-xl shadow-md border border-gray-300">
            Total Comments: <span className="font-semibold ">{comments.length}</span>
          </p>
        </div>
      </div>

      <div className="h-4/5 max-w-4xl overflow-x-auto shadow-2xl rounded-xl bg-white mt-8 border border-gray-200">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-700 uppercase border-b-2 bg-linear-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="px-3 md:px-6 py-4 text-left font-semibold">#</th>
              <th className="px-3 md:px-6 py-4 text-left font-semibold">
                Blog Title & Comment
              </th>
              <th className="max-sm:hidden px-3 md:px-6 py-4 text-center font-semibold">
                Date
              </th>
              <th className="px-3 md:px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment, index) => ( 
              
              <tr key={comment._id} className="border-b hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                <td className="px-3 md:px-6 py-5 font-semibold text-gray-900">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 text-white text-sm font-bold shadow-md">
                    {index + 1}
                  </span>
                </td>

                <td className="px-3 md:px-6 py-5">
                  <p className="font-semibold text-gray-900 text-base mb-2">
                    <span className="text-blue-600">📝</span> {comment.blog.title}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-xs font-medium text-gray-600 pr-1">
                      By:
                    </p>
                    <span className="ml-1 px-3 py-1 bg-linear-to-r from-green-100 to-emerald-100 border border-green-300 rounded-full text-green-700 text-xs font-semibold shadow-sm">
                      {comment.name}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <img src={assets.comment_icon} alt="" className="h-5 w-5 mt-1 opacity-70" />
                    <p className="text-sm text-gray-700 p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </td>

                <td className="px-3 md:px-6 py-5 max-sm:hidden">
                  <div className="font-semibold text-gray-800 px-4 py-2 bg-linear-to-r from-orange-100 to-amber-100 rounded-full text-center text-xs shadow-md border border-orange-200">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </td>

                <td className="px-3 md:px-6 py-5 text-center  gap-3">
                  <div className="flex justify-center items-center gap-3">
                    {/* {!comment.isApproved ? (
                      <button
                        onClick={() => handleApprove(comment._id)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs cursor-pointer"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDisapprove(comment._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs cursor-pointer"
                      >
                        Disapprove
                      </button>
                    )} */}
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="group p-2 bg-red-100 hover:bg-red-500 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                      title="Delete comment"
                    >
                      <MdDelete
                        className="text-red-600 group-hover:text-white transition-colors duration-200"
                        size={22}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {comments.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">💬</span>
                    <p className="text-gray-500 text-lg font-medium">No comments yet</p>
                    <p className="text-gray-400 text-sm">Comments will appear here once users start engaging</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
