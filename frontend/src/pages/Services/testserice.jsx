import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Home,
  Upload,
  CheckCircle2,
  X,
  Star,
  Clock,
  Send,
} from "lucide-react";

// Steps same UI
const STEPS = [
  { id: 1, title: "Your Info", icon: Star },
  { id: 2, title: "Preferences", icon: MapPin },
  { id: 3, title: "Details", icon: Home },
  { id: 4, title: "Media", icon: Upload },
];

// Sample options
const LOCATIONS = [
  "Ikeja, Lagos",
  "Lekki, Lagos",
  "Victoria Island, Lagos",
  "Yaba, Lagos",
  "Ikoyi, Lagos",
];

const GENDER_OPTIONS = ["Male", "Female", "Any"];
const BUDGET_OPTIONS = ["<20k", "20k-50k", "50k-100k", "100k+"];

const ListRoommate = ({ userProfile }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isAreaFocused, setIsAreaFocused] = useState(false);

  const [formData, setFormData] = useState({
    // pulled from profile
    name: userProfile?.name || "",
    age: userProfile?.age || "",
    gender: userProfile?.gender || "",

    // roommate info
    location: "",
    genderPreference: "",
    budget: "",
    moveInDate: "",
    bio: "",
    interests: [],
    images: [],
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setPreviews((p) => [...p, reader.result]);
      reader.readAsDataURL(file);
    });
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-base-100 border-b">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
              className="mt-1 text-gray-700 hover:text-primary transition"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                List Your Roommate
              </h1>
              <p className="text-sm text-gray-500">Step {step} of 4</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium rounded-full border border-base-300 hover:bg-base-200 transition"
          >
            Save & Exit
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="flex-1 flex items-center">
                <div className="flex flex-col items-center min-w-[72px]">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition
                      ${
                        isCompleted
                          ? "bg-gray-200 text-primary"
                          : isActive
                          ? "bg-primary border-primary text-white"
                          : "bg-base-200 border-base-300 text-gray-400"
                      }`}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>
                  <p className={`text-xs mt-2 font-medium ${isActive ? "text-primary" : "text-gray-400"}`}>
                    {s.title}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 flex items-center">
                    <div className={`h-[2px] w-10 mx-auto transition ${isActive ? "bg-primary" : "bg-base-300"}`} />
                    <div className={`flex-1 h-px ${step > s.id ? "bg-primary" : "bg-base-300"}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-24">
        {/* Step 1: Your Info */}
        {step === 1 && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold">Your Info</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={formData.name}
                readOnly
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" className="input input-bordered w-full" value={formData.age} readOnly />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <input type="text" className="input input-bordered w-full" value={formData.gender} readOnly />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold">Roommate Preferences</h2>
            <div className="space-y-3">
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., Lekki, Lagos"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
                onFocus={() => setIsAreaFocused(true)}
                onBlur={() => setTimeout(() => setIsAreaFocused(false), 100)}
              />
              {formData.location && isAreaFocused && (
                <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-auto border border-gray-200 rounded-md bg-white shadow-lg">
                  {LOCATIONS.filter((loc) =>
                    loc.toLowerCase().includes(formData.location.toLowerCase())
                  ).map((loc) => (
                    <li
                      key={loc}
                      onClick={() => updateFormData("location", loc)}
                      className="px-3 py-2 cursor-pointer hover:bg-primary/10"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Gender Preference</label>
              <div className="flex gap-3">
                {GENDER_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => updateFormData("genderPreference", g)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      formData.genderPreference === g
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-base-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Budget</label>
              <div className="flex gap-3">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => updateFormData("budget", b)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                      formData.budget === b
                        ? "bg-primary text-white border-primary"
                        : "bg-white border-base-300 text-gray-700 hover:border-primary"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Move-In Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formData.moveInDate}
                onChange={(e) => updateFormData("moveInDate", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold">Details & Bio</h2>
            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[120px]"
                placeholder="Tell roommates about yourself..."
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Interests</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="e.g., Reading, Gaming, Cooking"
                value={formData.interests.join(", ")}
                onChange={(e) =>
                  updateFormData("interests", e.target.value.split(",").map((i) => i.trim()))
                }
              />
            </div>
          </div>
        )}

        {/* Step 4: Media */}
        {step === 4 && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold">Photos</h2>
            <label
              className="mt-2 flex flex-col items-center justify-center
                         border-2 border-dashed border-base-300
                         rounded-xl h-44 cursor-pointer
                         hover:border-primary transition"
            >
              <Upload size={28} className="text-gray-400 mb-2" />
              <p className="font-medium text-gray-700">Click to upload images</p>
              <input type="file" multiple accept="image/*" hidden onChange={uploadImages} />
            </label>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border">
                    <img src={src} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPreviews((p) => p.filter((_, x) => x !== i))}
                      className="absolute top-1.5 right-1.5 bg-black/60 text-white rounded-full p-1 hover:bg-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between mt-10">
          <button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>
            Back
          </button>
          {step < 4 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("/roommates")}>
              Publish <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListRoommate;
