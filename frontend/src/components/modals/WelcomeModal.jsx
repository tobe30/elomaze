import { ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomeModal({ onClose }) {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    onClose();
    navigate("/settings");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-7 h-7 text-primary" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Welcome to Elomaze!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Complete your profile to increase trust with other students and agents on the platform.
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleCompleteProfile}
            className="w-full h-11 bg-primary text-white rounded-xl font-medium"
          >
            Complete Profile
          </button>
          <button
            onClick={onClose}
            className="w-full h-11 text-gray-500 text-sm font-medium hover:text-gray-700"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}