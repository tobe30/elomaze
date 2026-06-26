import { AlertCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfileCompletionBanner() {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-4 py-3 sm:px-6 sm:py-4">
      <div className="max-w-6xl mx-auto flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-900">
              Complete your profile
            </p>
            <p className="text-sm text-amber-800 mt-1">
              Complete your profile to increase trust with other students and agents on the platform.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate("/settings")}
            className="px-3 py-1.5 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition whitespace-nowrap"
          >
            Complete now
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
