import { useState } from "react";
import {
  Flag,
  Eye,
  CheckCircle,
  AlertTriangle,
  User,
  Building2,
  Clock,
  Shield,
} from "lucide-react";
import { createPortal } from "react-dom";


const mockReports = [
  {
    id: 1,
    type: "Fraudulent Listing",
    targetType: "listing",
    target: "Luxury Apartment - Victoria Island",
    targetId: "L-4521",
    reporter: "Anonymous User",
    reporterEmail: null,
    description: "This listing appears to be fake. The images are stolen from another website.",
    severity: "high",
    status: "pending",
    createdAt: "30 minutes ago",
  },
  {
    id: 2,
    type: "Spam Account",
    targetType: "user",
    target: "fake_user_123",
    targetId: "U-8923",
    reporter: "System Auto-detect",
    reporterEmail: null,
    description: "Multiple spam messages detected from this account.",
    severity: "medium",
    status: "pending",
    createdAt: "1 hour ago",
  },
  {
    id: 3,
    type: "Inappropriate Content",
    targetType: "listing",
    target: "Service Listing #4521",
    targetId: "S-4521",
    reporter: "John Doe",
    reporterEmail: "john.d@email.com",
    description: "The listing contains inappropriate language and misleading information.",
    severity: "low",
    status: "pending",
    createdAt: "2 hours ago",
  },
  {
    id: 4,
    type: "Harassment",
    targetType: "user",
    target: "bad_actor_99",
    targetId: "U-1234",
    reporter: "Jane Smith",
    reporterEmail: "jane.s@email.com",
    description: "This user has been sending threatening messages.",
    severity: "high",
    status: "resolved",
    createdAt: "1 day ago",
    resolution: "User account banned",
    resolvedBy: "Admin",
    resolvedAt: "12 hours ago",
  },
];

const adminActionLog = [
  {
    id: 1,
    action: "Banned user",
    target: "bad_actor_99",
    admin: "Super Admin",
    timestamp: "12 hours ago",
  },
  {
    id: 2,
    action: "Removed listing",
    target: "Scam Property #123",
    admin: "Super Admin",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    action: "Verified agent",
    target: "Fatima Bello",
    admin: "Moderator",
    timestamp: "2 days ago",
  },
];

export default function AdminReports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedAction, setSelectedAction] = useState("");
  const [actionNote, setActionNote] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const getSeverityBadge = (severity) => {
    if (severity === "high") return <span className="badge badge-error text-white">High Priority</span>;
    if (severity === "medium") return <span className="badge badge-warning text-white">Medium</span>;
    if (severity === "low") return <span className="badge badge-info text-white">Low</span>;
    return <span className="badge">{severity}</span>;
  };

  const getStatusBadge = (status) => {
    if (status === "pending") return <span className="badge badge-outline">Pending</span>;
    if (status === "resolved") return <span className="badge badge-success">Resolved</span>;
    return <span className="badge">{status}</span>;
  };

  const pendingReports = mockReports.filter((r) => r.status === "pending");
  const resolvedReports = mockReports.filter((r) => r.status === "resolved");

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Reports & Safety</h1>
        <p className="text-sm text-gray-500">
          Review and manage user reports and platform safety issues.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card bg-base-100 shadow p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold">{pendingReports.length}</span>
          </div>
          <p className="text-xs text-gray-500">Pending Reports</p>
        </div>
        <div className="card bg-base-100 shadow p-6">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-500" />
            <span className="text-2xl font-bold">{pendingReports.filter(r => r.severity === "high").length}</span>
          </div>
          <p className="text-xs text-gray-500">High Priority</p>
        </div>
        <div className="card bg-base-100 shadow p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-2xl font-bold">{resolvedReports.length}</span>
          </div>
          <p className="text-xs text-gray-500">Resolved This Week</p>
        </div>
        <div className="card bg-base-100 shadow p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span className="text-2xl font-bold">2.4h</span>
          </div>
          <p className="text-xs text-gray-500">Avg. Resolution Time</p>
        </div>
      </div>

      {/* Tabs */}
<div className="space-y-4">
  <div className="flex gap-2 bg-gray-100 p-1 rounded-full w-fit">
    {["pending", "resolved"].map((tab) => (
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

        {/* Only show badge on Pending */}
        {tab === "pending" && pendingReports.length > 0 && (
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {pendingReports.length}
          </span>
        )}
      </button>
    ))}
  </div>

  {/* Reports List */}
  <div className="grid lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2 space-y-4">
      {(activeTab === "pending" ? pendingReports : resolvedReports).map((report) => (
        <div key={report.id} className="card bg-base-100 shadow hover:shadow-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div
                className={`rounded-full p-2 flex-shrink-0 ${
                  report.severity === "high"
                    ? "bg-red-100"
                    : report.severity === "medium"
                    ? "bg-yellow-100"
                    : "bg-gray-100"
                }`}
              >
                {report.targetType === "user" ? (
                  <User
                    className={`h-5 w-5 ${
                      report.severity === "high"
                        ? "text-red-500"
                        : report.severity === "medium"
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  />
                ) : (
                  <Building2
                    className={`h-5 w-5 ${
                      report.severity === "high"
                        ? "text-red-500"
                        : report.severity === "medium"
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-sm">{report.type}</p>
                  {getSeverityBadge(report.severity)}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Target: <span className="font-medium text-black text-sm">{report.target}</span>
                </p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{report.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>Reported by: {report.reporter}</span>
                  <span>{report.createdAt}</span>
                </div>
              </div>
            </div>
            <button
              className="btn btn-outline border border-gray-200 btn-sm flex items-center gap-1"
              onClick={() => setSelectedReport(report)}
            >
              <Eye className="h-3 w-3" /> Review
            </button>
          </div>
        </div>
      ))}

      {/* No reports placeholder */}
      {(activeTab === "pending" ? pendingReports : resolvedReports).length === 0 && (
        <div className="bg-white shadow rounded-lg p-12 text-center text-gray-400 col-span-full">
          <Building2 className="mx-auto h-12 w-12 opacity-50" />
          <p className="mt-2 text-sm">
            No {activeTab === "pending" ? "pending" : "resolved"} reports
          </p>
        </div>
      )}
    </div>

    {/* Admin Action Log */}
    <div className="card bg-base-100 shadow p-4 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-5 w-5" />
        <h3 className="font-medium text-black">Admin Action Log</h3>
      </div>
      <p className="text-xs text-gray-500 mb-2">Recent administrative actions</p>
      <div className="space-y-2">
        {adminActionLog.map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <div className="rounded-full p-1.5 bg-gray-100">
              <Shield className="h-3 w-3 text-gray-500" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium text-black">{log.action}</span> on{" "}
                <span className="text-primary">{log.target}</span>
              </p>
              <p className="text-xs text-gray-500">
                by {log.admin} • {log.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* Report Review Modal */}
{selectedReport &&
createPortal (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4 overflow-auto">
    <div className="bg-white rounded-lg w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 space-y-4 shadow-lg relative
                    max-h-[90vh] overflow-y-auto">
      
      {/* Close button */}
      <button
        className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-gray-700"
        onClick={() => setSelectedReport(null)}
      >
        ✕
      </button>

      {/* Header */}
      <h2 className="text-lg sm:text-xl font-semibold">Review Report</h2>
      <p className="text-sm text-gray-500">Take action on this report</p>

      {/* Type & Severity */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium">{selectedReport.type}</span>
        {getSeverityBadge(selectedReport.severity)}
      </div>

      {/* Report Info */}
      <div className="bg-gray-100 p-3 sm:p-4 rounded space-y-2">
        <p className="text-xs text-gray-500">Target</p>
        <p className="font-medium">{selectedReport.target}</p>
        <p className="text-xs text-gray-500">ID: {selectedReport.targetId}</p>

        <p className="text-xs text-gray-500 mt-2">Description</p>
        <p className="text-sm">{selectedReport.description}</p>

        <p className="text-xs text-gray-500 mt-2">Reported by</p>
        <p className="text-sm">{selectedReport.reporter}</p>
        {selectedReport.reporterEmail && <p className="text-xs text-gray-500">{selectedReport.reporterEmail}</p>}
      </div>

      {/* Action Selection */}
      <div>
        <label className="text-xs">Action</label>
        <select
          className="select select-bordered w-full mt-1 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
        >
          <option value="">Select action...</option>
          <option value="dismiss">Dismiss Report</option>
          <option value="warn">Warn User</option>
          <option value="remove">Remove Content</option>
          <option value="suspend">Suspend Account</option>
          <option value="ban">Ban Account</option>
        </select>
      </div>

      {/* Optional Note */}
      <div>
        <label className="text-xs">Note (optional)</label>
        <textarea
          className="textarea textarea-bordered w-full mt-1 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="Add a note about this action..."
          rows={3}
          value={actionNote}
          onChange={(e) => setActionNote(e.target.value)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
        <button
          className="btn border border-gray-200 w-full sm:w-auto"
          onClick={() => setSelectedReport(null)}
        >
          Cancel
        </button>
        <button
          className="btn bg-primary text-white w-full sm:w-auto"
          onClick={() => {
            setSelectedReport(null);
            setSelectedAction("");
            setActionNote("");
          }}
        >
          Take Action
        </button>
      </div>
    </div>
  </div>,
    document.body
)}

    </div>
  );
}
