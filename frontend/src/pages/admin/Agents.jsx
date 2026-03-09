import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Clock,
  UserCheck,
  Download,
} from "lucide-react";
import { createPortal } from "react-dom";

const pendingVerifications = [
  { id: 1, name: "Adebayo Johnson", email: "adebayo.j@email.com", type: "agent", submitted: "2 hours ago", documents: ["NIN", "Business Certificate"], avatar: null },
  { id: 2, name: "Chioma Okafor", email: "chioma.o@email.com", type: "agent", submitted: "4 hours ago", documents: ["Driver's License", "CAC Certificate"], avatar: null },
  { id: 3, name: "Emeka Store", email: "emeka.store@email.com", type: "user", submitted: "1 day ago", documents: ["Business Registration", "Tax ID"], avatar: null },
];

const verifiedAgents = [
  { id: 1, name: "Fatima Bello", email: "fatima.b@email.com", type: "agent", verifiedDate: "Jan 15, 2024", listings: 24, rating: 4.8, avatar: null },
  { id: 2, name: "Ibrahim Musa", email: "ibrahim.m@email.com", type: "agent", verifiedDate: "Dec 8, 2023", listings: 56, rating: 4.9, avatar: null },
  { id: 3, name: "Grace Electronics", email: "grace.elec@email.com", type: "user", verifiedDate: "Feb 20, 2024", listings: 142, rating: 4.7, avatar: null },
];

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectDialog, setRejectDialog] = useState({ open: false, item: null });
  const [rejectionReason, setRejectionReason] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [reviewModal, setReviewModal] = useState({
  open: false,
  item: null,
});


  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Agents & Users</h1>
          <p className="text-sm text-gray-500">Verify and manage agents and Users on the platform.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Clock, value: pendingVerifications.length, label: "Pending Verification", color: "text-amber-500" },
          { icon: UserCheck, value: 4162, label: "Verified Agents", color: "text-emerald-500" },
          { icon: UserCheck, value: 2000, label: "Verified Users", color: "text-emerald-500" },
          { icon: XCircle, value: 45, label: "Rejected This Month", color: "text-red-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-5 flex flex-col items-start gap-2 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="space-y-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
  {["pending", "verified", "rejected"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-1.5 text-sm rounded-full font-medium ${
        activeTab === tab
          ? "bg-white shadow text-gray-900"
          : "text-gray-500"
      }`}
    >
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
      {tab === "pending" && (
        <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
          {pendingVerifications.length}
        </span>
      )}
    </button>
  ))}
</div>


        {/* Pending Tab */}
        {activeTab === "pending" && (
  <div className="space-y-4">

    {/* Section Header */}
    <div className="bg-white border rounded-xl p-5">
      <h2 className="text-base font-semibold text-gray-900">
        Pending Verification Queue
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Review and approve agent/seller verification requests
      </p>
    </div>

    {pendingVerifications.map((item) => (
      <div
        key={item.id}
        className="bg-white border rounded-xl px-5 py-4 flex items-center justify-between"
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
            {item.name.split(" ").map(n => n[0]).join("")}
          </div>

          {/* Info */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">
                {item.name}
              </p>
              <span className="px-2 py-0.5 text-xs rounded-full border capitalize">
                {item.type}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {item.email}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <FileText className="h-4 w-4" />
              {item.documents.join(", ")}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {item.submitted}
          </span>

          <button
  onClick={() => setReviewModal({ open: true, item })}
  className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:bg-gray-50"
>
  <Eye className="h-4 w-4" />
  Review
</button>


          <button className="flex items-center gap-1 px-4 py-1.5 bg-emerald-600 text-white rounded-full text-sm hover:bg-emerald-700">
            <CheckCircle className="h-4 w-4" />
            Approve
          </button>

          <button
            onClick={() => setRejectDialog({ open: true, item })}
            className="flex items-center gap-1 px-4 py-1.5 bg-red-500 text-white rounded-full text-sm hover:bg-red-600"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </button>
        </div>
      </div>
    ))}
  </div>
)}


        {/* Verified Tab */}
        {activeTab === "verified" && (
          <div className="space-y-4">
            {/* Title card */}
            <div className="bg-white shadow rounded-lg p-4 space-y-1">
              <h2 className="text-lg font-semibold text-gray-800">Verified Agents & Sellers</h2>
              <p className="text-sm text-gray-500">All verified members with the trusted badge</p>
            </div>

            <div className="flex justify-end mb-4 relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search verified..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-5">
              {verifiedAgents.map((agent) => (
                <div key={agent.id} className="bg-white border rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold">
                      {agent.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm truncate text-gray-800">{agent.name}</p>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-xs text-gray-500 truncate">{agent.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{agent.listings} listings</span>
                    <span>★ {agent.rating}</span>
                    <span className="px-2 py-0.5 border rounded text-[10px]">{agent.type}</span>
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">Verified on {agent.verifiedDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejected Tab */}
        {activeTab === "rejected" && (
          <div className="flex flex-col items-center justify-center p-12 border rounded-lg text-gray-400 bg-white shadow">
            <XCircle className="h-12 w-12 opacity-50" />
            <p className="mt-2 text-sm">No rejected applications to show</p>
          </div>
        )}
      </div>

      {/* Reject Dialog */}
      {rejectDialog.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Reject Verification</h2>
            <p className="text-sm text-gray-500">
              Provide a reason for rejecting {rejectDialog.item?.name}'s verification request
            </p>
            <textarea
              rows="4"
              placeholder="e.g., Documents are blurry and unreadable..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border rounded p-2 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 border rounded hover:bg-gray-50"
                onClick={() => setRejectDialog({ open: false, item: null })}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setRejectDialog({ open: false, item: null });
                  setRejectionReason("");
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

{reviewModal.open &&
  createPortal(
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
   <div className="bg-white rounded-xl w-full max-w-[520px] p-6 relative shadow-xl space-y-6">


      {/* X Close */}
      <button
        onClick={() => setReviewModal({ open: false, item: null })}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Review Verification Request
        </h2>
        <p className="text-sm text-gray-500">
          Review the submitted documents and information
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
          {reviewModal.item?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <p className="font-medium text-gray-900">
            {reviewModal.item?.name}
          </p>
          <p className="text-sm text-gray-500">
            {reviewModal.item?.email}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs border rounded-full capitalize">
            {reviewModal.item?.type}
          </span>
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-900">
          Submitted Documents
        </p>

        {reviewModal.item?.documents.map((doc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border rounded-lg px-4 py-3
                       hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FileText className="h-4 w-4 text-gray-500" />
              {doc}
            </div>

            {/* Download icon */}
          <div
  className="flex items-center justify-between border rounded-lg px-4 py-3
             hover:bg-gray-50 hover:border-gray-300 transition"
>
  {/* Left */}
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <FileText className="h-4 w-4 text-gray-500" />
    {doc}
  </div>

  {/* Right – View | Download */}
  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
    <button className="hover:text-gray-900">View</button>
    <span className="text-gray-300">|</span>
    <button className="hover:text-gray-900">
      <Download className="h-4 w-4" />
    </button>
  </div>
</div>

          </div>
        ))}
      </div>

      {/* Submitted time */}
      <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-500">
        Submitted {reviewModal.item?.submitted}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setReviewModal({ open: false, item: null });
            setRejectDialog({ open: true, item: reviewModal.item });
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reject
        </button>

        <button
          onClick={() => {
            // approve logic
            setReviewModal({ open: false, item: null });
          }}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Approve
        </button>
      </div>
    </div>
  </div>,
    document.body
  )}



    </div>
  );
};

export default Agents;
