import { useState } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Trash2,
  MoreHorizontal,
  Users,
  MapPin,
  Calendar,
  DollarSign,
} from "lucide-react";
import { createPortal } from "react-dom";

const mockRoommates = [
  {
    id: 1,
    name: "Adaeze Nwachukwu",
    avatar: null,
    age: 24,
    gender: "Female",
    occupation: "Medical Student",
    budget: "₦150,000 - ₦250,000",
    location: "Lekki, Lagos",
    status: "pending",
    preferences: ["Non-smoker", "Quiet environment", "Female only"],
    submitted: "2 hours ago",
    bio: "Final year medical student looking for a clean and quiet environment to study.",
  },
  {
    id: 2,
    name: "Chukwuemeka Obi",
    avatar: null,
    age: 28,
    gender: "Male",
    occupation: "Software Engineer",
    budget: "₦200,000 - ₦400,000",
    location: "Victoria Island, Lagos",
    status: "approved",
    preferences: ["Pet-friendly", "Working professional", "Gym access"],
    submitted: "1 day ago",
    bio: "Remote software engineer looking for a modern apartment with good internet.",
  },
  // ... add the rest of your mockRoommates
];

const AdminRoommates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRoommate, setSelectedRoommate] = useState(null);
  const [rejectDialog, setRejectDialog] = useState({ open: false, roommate: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, roommate: null });
  const [rejectionReason, setRejectionReason] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);


  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="bg-emerald-100 text-emerald-600 text-xs px-2 py-0.5 rounded-full">
            Approved
          </span>
        );
      case "pending":
        return (
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
            Rejected
          </span>
        );
      default:
        return (
          <span className="bg-gray-50 text-gray-500 text-xs px-2 py-0.5 rounded-full">
            {status}
          </span>
        );
    }
  };

  const filterByStatus = (status) => {
    return mockRoommates.filter((roommate) => {
      const matchesSearch =
        roommate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roommate.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roommate.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = status === "all" || roommate.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Roommates</h1>
          <p className="text-sm text-gray-500">
            Manage roommate finder profiles and connection requests.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-2xl font-bold">892</span>
          </div>
          <p className="text-xs text-gray-500">Total Profiles</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-600">15</span>
          </div>
          <p className="text-xs text-gray-500">Pending Review</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">845</span>
          </div>
          <p className="text-xs text-gray-500">Active Profiles</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">156</span>
          </div>
          <p className="text-xs text-gray-500">Matches Made</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, occupation, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-3 py-2 border rounded w-full focus:outline-none focus:ring focus:ring-primary"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["pending", "approved", "rejected", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-full font-medium ${
              activeTab === tab
                ? "bg-white shadow text-gray-900"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Roommate Cards */}
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 mt-4">
        {filterByStatus(activeTab).map((roommate) => (
          <div key={roommate.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-600">
                {roommate.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm truncate">{roommate.name}</h3>
                   <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                roommate.status === "pending"
                  ? "bg-yellow-500 text-white"
                  : roommate.status === "approved"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {roommate.status.charAt(0).toUpperCase() + roommate.status.slice(1)}
            </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {roommate.age} • {roommate.gender} • {roommate.occupation}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3" />
                  {roommate.location}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
              <DollarSign className="h-4 w-4" />
              {roommate.budget}
            </div>

            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{roommate.bio}</p>

            <div className="flex flex-wrap gap-1 mt-3">
              {roommate.preferences.slice(0, 3).map((pref, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 border rounded-full text-gray-600"
                >
                  {pref}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {roommate.submitted}
              </div>

              <div className="relative">
<button
  onClick={() =>
    setOpenDropdownId(
      openDropdownId === roommate.id ? null : roommate.id
    )
  }
  className="p-2 rounded-full hover:bg-gray-100"
>
  <MoreHorizontal className="h-5 w-5" />
</button>


        {/* Dropdown menu */}
{openDropdownId === roommate.id && (
  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border rounded shadow-lg z-[999]">
    <button
  onClick={() => {
    setSelectedRoommate(roommate);
    setOpenDropdownId(null);
  }}
  className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
>
  <Eye className="h-4 w-4" />
  View Profile
</button>

{roommate.status === "pending" && (
  <>
    <button
      onClick={() => {
        // APPROVE logic
        roommate.status = "approved";
        setOpenDropdownId(null);
      }}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
    >
      <CheckCircle className="h-4 w-4" />
      Approve
    </button>

    <button
      onClick={() => {
        setRejectDialog({ open: true, roommate });
        setOpenDropdownId(null);
      }}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
    >
      <XCircle className="h-4 w-4" />
      Reject
    </button>
  </>
)}

<button
  onClick={() => {
    setDeleteDialog({ open: true, roommate });
    setOpenDropdownId(null);
  }}
  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
>
  <Trash2 className="h-4 w-4" />
  Remove
</button>

  </div>
)}


      </div>
            </div>

            {roommate.rejectionReason && (
              <div className="mt-3 p-2 rounded bg-red-100 text-xs text-red-600">
                Reason: {roommate.rejectionReason}
              </div>
            )}
          </div>
        ))}
      </div>

      {filterByStatus(activeTab).length === 0 && (
        <div className="bg-white p-12 rounded shadow text-center text-gray-400">
          <Users className="mx-auto h-12 w-12 opacity-50" />
          <p className="mt-2 text-sm">No roommate profiles found</p>
        </div>
      )}

{selectedRoommate && 
createPortal(
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-lg rounded-xl shadow-xl relative">

      {/* Close button */}
      <button
        onClick={() => setSelectedRoommate(null)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Roommate Profile</h2>

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
              {selectedRoommate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            {/* Name + meta */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">
                  {selectedRoommate.name}
                </p>

                <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Pending
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {selectedRoommate.age} • {selectedRoommate.gender} •{" "}
                {selectedRoommate.occupation}
              </p>
            </div>
          </div>
        </div>

        {/* Budget */}
        <p className="text-xl font-bold text-primary">
          {selectedRoommate.budget}
        </p>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Location</p>
            <p className="font-medium text-gray-900">
              {selectedRoommate.location}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Submitted</p>
            <p className="font-medium text-gray-900">
              {selectedRoommate.submitted}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="text-sm text-gray-400 mb-1">Bio</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {selectedRoommate.bio}
          </p>
        </div>

        {/* Preferences */}
        <div>
          <p className="text-sm text-gray-400 mb-2">Preferences</p>
          <div className="flex flex-wrap gap-2">
            {selectedRoommate.preferences.map((pref, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-500 text-xs px-3 py-1 rounded-full"
              >
                {pref}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <button
            onClick={() => {
              setRejectDialog({ open: true, roommate: selectedRoommate });
              setSelectedRoommate(null);
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Reject
          </button>

          <button
            onClick={() => {
              // approve logic here
              setSelectedRoommate(null);
            }}
            className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  </div>,
  document.body
)}


 {rejectDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Reject Listing</h3>
            <p className="text-gray-500">
              Provide a reason for rejecting "{rejectDialog.roommate.name}"
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
                onClick={() => setRejectDialog({ open: false, listing: null })}
              >
                Cancel
              </button>
              <button
                className="btn bg-red-500 text-white"
                onClick={() => {
                  setRejectDialog({ open: false, listing: null });
                  setRejectionReason("");
                }}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}


{deleteDialog.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Remove Listing</h3>
            <p className="text-gray-500">
              Are you sure you want to permanently remove "{deleteDialog.roommate.name}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setDeleteDialog({ open: false, listing: null })}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => setDeleteDialog({ open: false, listing: null })}
              >
                Remove Listing
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};


export default AdminRoommates;
