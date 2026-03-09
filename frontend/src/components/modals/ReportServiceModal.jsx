

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

export default function ReportServiceModal({ isOpen, onClose, onSubmit }) {
  const [selectedReason, setSelectedReason] = useState(null);
  const [reportDetails, setReportDetails] = useState("");

  if (!isOpen) return null;

  const reportReasons = [
    { id: "inaccurate", label: "Inaccurate information" },
    { id: "scam", label: "Suspected scam or fraud" },
    { id: "poor_quality", label: "Poor service quality" },
    { id: "inappropriate", label: "Inappropriate behavior" },
    { id: "not_available", label: "Service no longer available" },
    { id: "other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl animate-fadeIn relative max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold">Report this service</h2>
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            Help us keep Elomaze safe and trustworthy
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          {/* Report Options */}
          <div className="space-y-3">
            {reportReasons.map((reason) => (
              <label 
                key={reason.id}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition
                ${selectedReason === reason.id 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-200 hover:bg-gray-50"}`}
              >
                <span className="text-sm font-medium">{reason.label}</span>
                <input
                  type="radio"
                  name="reportReason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={() => setSelectedReason(reason.id)}
                  className="w-4 h-4 text-primary focus:ring-primary"
                />
              </label>
            ))}
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional details (optional)</label>
            <textarea
              value={reportDetails}
              onChange={(e) => setReportDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary text-sm"
              placeholder="Provide more information to help us investigate..."
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              onSubmit({
                reason: selectedReason,
                details: reportDetails,
              });
              onClose();
            }}
            disabled={!selectedReason}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium disabled:bg-gray-300"
          >
            Submit report
          </button>
        </div>
      </div>
    </div>
  );
}
