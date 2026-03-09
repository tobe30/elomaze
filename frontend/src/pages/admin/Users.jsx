import { useState, useEffect, useRef } from "react";
import {
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  UserCheck,
  AlertTriangle,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */
const mockUsers = [
  {
    id: 1,
    name: "Adebayo Johnson",
    email: "adebayo.j@email.com",
    role: "user",
    status: "active",
    verified: true,
    joined: "Jan 15, 2024",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Chioma Okafor",
    email: "chioma.o@email.com",
    role: "agent",
    status: "active",
    verified: true,
    joined: "Dec 8, 2023",
    lastActive: "5 mins ago",
  },
  {
    id: 3,
    name: "Emeka Nnamdi",
    email: "emeka.n@email.com",
    role: "user",
    status: "suspended",
    verified: false,
    joined: "Feb 20, 2024",
    lastActive: "3 days ago",
  },
  {
    id: 4,
    name: "Fatima Bello",
    email: "fatima.b@email.com",
    role: "user",
    status: "active",
    verified: true,
    joined: "Mar 1, 2024",
    lastActive: "1 hour ago",
  },
  {
    id: 5,
    name: "Ibrahim Musa",
    email: "ibrahim.m@email.com",
    role: "agent",
    status: "banned",
    verified: false,
    joined: "Nov 15, 2023",
    lastActive: "1 month ago",
  },
];

/* ---------------- COMPONENT ---------------- */
const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
   const menuRef = useRef(null);
   const [actionModal, setActionModal] = useState({
            open: false,
            type: "",
            user: null,
            });


useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpenMenu(null);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = mockUsers.filter((u) => {
    return (
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())) &&
      (roleFilter === "all" || u.role === roleFilter) &&
      (statusFilter === "all" || u.status === statusFilter)
    );
  });

  /* Reset page when filters/search change */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">
                Manage all platform users, their roles, and permissions.
          </p>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export Users
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          ["Total Users", "24,582"],
          ["Agents", "4,162"],
          ["Users", "2,000"],
        ].map(([label, value]) => (
          <div key={label} className="card bg-base-100 shadow-sm">
            <div className="card-body p-7">
              <p className="text-xl font-semibold">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Search */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Selects */}
          <div className="flex gap-2">
            <select
              className="px-3 py-2 text-sm border rounded-lg"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="agent">Agent</option>
              <option value="user">User</option>
            </select>

            <select
              className="px-3 py-2 text-sm border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-500 tracking-wide">
                <th className="px-5 py-3 text-left">User</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Verified</th>
                <th className="px-5 py-3 text-left">Joined</th>
                <th className="px-5 py-3 text-left">Last Active</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                        {u.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.role === "agent"
                          ? "bg-blue-500 text-white"
                          : u.role === "user"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.status === "active"
                          ? "bg-primary text-white"
                          : u.status === "suspended"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {u.verified ? (
                      <UserCheck className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-500">
                    {u.joined}
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">
                    {u.lastActive}
                  </td>

                 <td className="px-5 py-4 text-right relative">
  <MoreHorizontal
    className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
    onClick={() =>
      setOpenMenu(openMenu === u.id ? null : u.id)
    }
  />

{openMenu === u.id && (
  <div className="absolute right-6 top-10 w-56 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
    
    {/* View Profile */}
    <button
      onClick={() => {
        setActionModal({ open: true, type: "view", user: u });
        setOpenMenu(null);
      }}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
    >
      <Eye className="h-4 w-4" />
      View Profile
    </button>

    {/* Verify / Revoke */}
    {u.status !== "banned" && (
      <button
        onClick={() => {
          setActionModal({ open: true, type: "verify", user: u });
          setOpenMenu(null);
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
      >
        <UserCheck className="h-4 w-4" />
        {u.verified ? "Revoke Verification" : "Verify User"}
      </button>
    )}

    {/* Suspend */}
    {u.status === "active" && (
      <button
        onClick={() => {
          setActionModal({ open: true, type: "suspend", user: u });
          setOpenMenu(null);
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-orange-600 hover:bg-orange-50"
      >
        <AlertTriangle className="h-4 w-4" />
        Suspend User
      </button>
    )}

    {/* Ban */}
    {u.status !== "banned" && (
      <button
        onClick={() => {
          setActionModal({ open: true, type: "ban", user: u });
          setOpenMenu(null);
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
      >
        <Ban className="h-4 w-4" />
        Ban User
      </button>
    )}
  </div>
)}

</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 text-sm">
          <p className="text-gray-500">
            Showing {(currentPage - 1) * usersPerPage + 1}–
            {Math.min(currentPage * usersPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border rounded-lg disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 rounded-lg border text-sm ${
                  currentPage === i + 1
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border rounded-lg disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {actionModal.open && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-scaleIn">
      
      {/* Close */}
      <button
        onClick={() => setActionModal({ open: false, type: "", user: null })}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {actionModal.type === "view" && "User Profile"}
        {actionModal.type === "suspend" && "Suspend User"}
        {actionModal.type === "ban" && "Ban User"}
        {actionModal.type === "verify" &&
          (actionModal.user?.verified
            ? "Revoke Verification"
            : "Verify User")}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4">
        {actionModal.type === "suspend" &&
          `Are you sure you want to suspend ${actionModal.user?.name}? They won’t be able to access their account.`}

        {actionModal.type === "ban" &&
          `Are you sure you want to permanently ban ${actionModal.user?.name}? This action cannot be easily reversed.`}

        {actionModal.type === "verify" &&
          `Are you sure you want to ${
            actionModal.user?.verified ? "revoke verification for" : "verify"
          } ${actionModal.user?.name}?`}

        {actionModal.type === "view" &&
          "Below is the user’s profile information."}
      </p>

      {/* View Profile Content */}
      {actionModal.type === "view" && (
  <div className="space-y-5">
    {/* Profile Header */}
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
        {actionModal.user?.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      {/* Name & Email */}
      <div>
        <p className="font-semibold text-gray-900">
          {actionModal.user?.name}
        </p>
        <p className="text-sm text-gray-500">
          {actionModal.user?.email}
        </p>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-1">
          <span className="px-2.5 py-1 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
            {actionModal.user?.role}
          </span>

          <span
            className={`px-2.5 py-1 text-xs rounded-full font-medium ${
              actionModal.user?.status === "active"
                ? "bg-primary text-white"
                : actionModal.user?.status === "suspended"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {actionModal.user?.status}
          </span>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="border-t pt-4" />

    {/* Meta Info */}
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Joined</p>
        <p className="font-medium text-gray-900">
          {actionModal.user?.joined}
        </p>
      </div>

      <div>
        <p className="text-gray-500">Last Active</p>
        <p className="font-medium text-gray-900">
          {actionModal.user?.lastActive}
        </p>
      </div>

      <div>
        <p className="text-gray-500">Verified</p>
        <p className="font-medium text-gray-900">
          {actionModal.user?.verified ? "Yes" : "No"}
        </p>
      </div>
    </div>
  </div>
)}

      {/* Actions */}
      {actionModal.type !== "view" && (
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setActionModal({ open: false, type: "", user: null })}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 text-sm rounded-lg text-white ${
              actionModal.type === "ban"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
            onClick={() =>
              setActionModal({ open: false, type: "", user: null })
            }
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Users;
