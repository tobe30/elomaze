import { useState } from "react";
import {
  MessageSquare,
  Flag,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  EyeIcon,
} from "lucide-react";

const mockPosts = [
  {
    id: 1,
    title: "Best areas in Lagos for students?",
    content:
      "I'm looking for affordable areas in Lagos that are safe and close to UNILAG. Any recommendations?",
    author: "Adebayo Johnson",
    authorEmail: "adebayo.j@email.com",
    category: "Housing Tips",
    replies: 12,
    status: "published",
    reported: false,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Warning: Fake agent in Yaba area",
    content:
      "I encountered a scam agent who collected viewing fees but never showed the apartment. Be careful!",
    author: "Chioma Okafor",
    authorEmail: "chioma.o@email.com",
    category: "Safety",
    replies: 45,
    status: "published",
    reported: true,
    reportReason: "Potentially defamatory content",
    createdAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Selling my furniture - Moving out",
    content:
      "I'm moving out of Lagos and need to sell my furniture. DM for prices.",
    author: "Emeka Store",
    authorEmail: "emeka.s@email.com",
    category: "Marketplace",
    replies: 8,
    status: "pending",
    reported: false,
    createdAt: "1 day ago",
  },
];

const mockComments = [
  {
    id: 1,
    postTitle: "Best areas in Lagos for students?",
    content: "This is spam content trying to sell something unrelated",
    author: "spam_user_123",
    status: "reported",
    reportReason: "Spam",
    createdAt: "1 hour ago",
  },
  {
    id: 2,
    postTitle: "Warning: Fake agent in Yaba area",
    content: "Check out my website for more deals!",
    author: "promo_account",
    status: "reported",
    reportReason: "Promotional content",
    createdAt: "3 hours ago",
  },
];

const AdminCommunity = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    item: null,
  });
const [rejectDialog, setRejectDialog] = useState({ open: false, post: null });
  const [rejectionReason, setRejectionReason] = useState("");

  
const reportedPosts = mockPosts.filter((post) => post.reported);
const pendingPosts = mockPosts.filter((post) => post.status === "pending");

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <span className="badge badge-success text-white">Published</span>;
      case "pending":
        return <span className="badge badge-warning text-white">Pending</span>;
      case "reported":
        return <span className="badge badge-error text-white">Reported</span>;
      default:
        return <span className="badge badge-outline text-white">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="text-sm text-gray-500">
          Moderate Q&A posts, discussions, and community content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card bg-base-100 shadow">
          <div className="card-body pt-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold">1,234</span>
            </div>
            <p className="text-xs text-gray-500">Total Posts</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body pt-6">
            <span className="text-2xl font-bold text-amber-600">5</span>
            <p className="text-xs text-gray-500">Pending Approval</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body pt-6">
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-error" />
              <span className="text-2xl font-bold text-error">8</span>
            </div>
            <p className="text-xs text-gray-500">Reported Content</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body pt-6">
            <span className="text-2xl font-bold">156</span>
            <p className="text-xs text-gray-500">Posts Today</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {/* Custom Rounded Tabs */}
<div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
  {["posts", "reported", "pending"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-1.5 text-sm rounded-full font-semibold flex items-center gap-2 transition ${
        activeTab === tab
          ? "bg-white shadow text-gray-900"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}

      {/* Badge for Reported */}
      {tab === "reported" && reportedPosts.length > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {reportedPosts.length}
        </span>
      )}

      {/* Badge for Pending */}
      {tab === "pending" && pendingPosts.length > 0 && (
        <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
          {pendingPosts.length}
        </span>
      )}
    </button>
  ))}
</div>


      {/* POSTS TAB */}
      {activeTab === "posts" && (
        <div className="space-y-4">

          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered pl-9 w-full"
            />
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body space-y-4">
              {mockPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div className="flex gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-xs font-semibold">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium text-sm">{post.title}</p>

                        {post.reported && (
                          <span className="badge badge-error text-white badge-sm">
                            <Flag className="h-3 w-3 mr-1" />
                            Reported
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>by {post.author}</span>
                        <span>{post.category}</span>
                        <span>{post.replies} replies</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {getStatusBadge(post.status)}

                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => setSelectedPost(post)}
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() =>
                        setDeleteDialog({ open: true, item: post })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REPORTED TAB */}
{activeTab === "reported" && (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold text-gray-900">
      Reported Content
    </h2>
    <p className="text-sm text-gray-500 mb-6">
      Posts and comments flagged by users
    </p>

    {mockPosts
      .filter((post) => post.reported)
      .map((post) => (
        <div
          key={post.id}
          className="flex items-start justify-between p-5 rounded-xl border border-red-300 bg-red-50"
        >
          {/* LEFT SIDE */}
          <div className="flex-1 pr-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Warning: {post.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              {post.content}
            </p>

            <p className="text-xs text-red-500 mt-3">
              Report reason: {post.reportReason}
            </p>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex items-center gap-3">
            <button
            onClick={() => setSelectedPost(post)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition"
            >
              <EyeIcon className="w-4 h-4" />
              Review
            </button>

            <button
            onClick={() =>
                        setDeleteDialog({ open: true, item: post })
                      }
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      ))}

    {mockPosts.filter((post) => post.reported).length === 0 && (
      <p className="text-sm text-gray-500">
        No reported posts.
      </p>
    )}
  </div>
)}


{/* PENDING TAB */}
{activeTab === "pending" && (
  <div className="card bg-base-100 shadow">
    <div className="card-body space-y-4">
      {pendingPosts.map((post) => (
        <div
          key={post.id}
          className="flex items-start justify-between p-4 rounded-lg border"
        >
          <div className="flex gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-xs font-semibold">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{post.title}</p>
                <span className="badge badge-warning text-white badge-sm">
                  Pending
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {post.content}
              </p>

              <div className="text-xs text-gray-500 mt-2">
                <p>Submitted {post.createdAt}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button className="btn btn-success text-white btn-sm">
              <CheckCircle className="h-4 w-4" /> Approve
            </button>

            <button onClick={() => setRejectDialog({ open: true, post })} className="btn btn-error text-white btn-sm">
              <XCircle className="h-4 w-4" /> Reject
            </button>
          </div>
        </div>
      ))}

      {pendingPosts.length === 0 && (
        <p className="text-sm text-gray-500">
          No pending posts.
        </p>
      )}
    </div>
  </div>
)}



      {/* VIEW POST MODAL */}
      {selectedPost && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">Post Details</h3>

            <h4 className="font-semibold">{selectedPost.title}</h4>
            <p className="text-sm text-gray-500 mt-2">
              {selectedPost.content}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <div>
                <p className="text-gray-500">Author</p>
                <p className="font-medium">{selectedPost.author}</p>
              </div>
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{selectedPost.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Replies</p>
                <p className="font-medium">{selectedPost.replies}</p>
              </div>
              <div>
                <p className="text-gray-500">Posted</p>
                <p className="font-medium">{selectedPost.createdAt}</p>
              </div>
            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedPost(null)}
              >
                Close
              </button>
              <button className="btn btn-error text-white">
                Remove Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteDialog.open && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Content</h3>
            <p className="py-4">
              Are you sure you want to delete this content?
            </p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() =>
                  setDeleteDialog({ open: false, item: null })
                }
              >
                Cancel
              </button>
              <button
                className="btn btn-error text-white"
                onClick={() =>
                  setDeleteDialog({ open: false, item: null })
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Reject Post</h3>
            <p className="text-gray-500">
              Provide a reason for rejecting "{rejectDialog.post?.title}"
            </p>
            <textarea
              className="textarea textarea-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Images are misleading or low quality..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setRejectDialog({ open: false, post: null })}
              >
                Cancel
              </button>
              <button
                className="btn bg-red-500 text-white"
                onClick={() => {
                  setRejectDialog({ open: false, post: null });
                  setRejectionReason("");
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommunity;
