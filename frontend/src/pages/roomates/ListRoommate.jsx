import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  Home,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Upload,
  Play,
  Bed,
  Bath,
  DoorOpen,
  Sparkles,
  Check,
  DollarSign,
  Briefcase,
  Star,
  Clock,
  Send,
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Your Info", icon: Star },
  { id: 2, title: "Preferences", icon: MapPin },
  { id: 3, title: "Details", icon: Home },
];

const GENDER_OPTIONS = ["Male", "Female", "Any"];
const BUDGET_OPTIONS = ["<20k", "20k-50k", "50k-100k", "100k+"];


const LOCATIONS = [
  "Ikeja, Lagos",
  "Lekki, Lagos",
  "Victoria Island, Lagos",
  "Yaba, Lagos",
  "Ikoyi, Lagos",
  "Surulere, Lagos",
  "Ogudu, Lagos",
  "Ojota, Lagos",
  "Festac Town, Lagos",
  "Ajah, Lagos",
];



const ListRoommate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isAreaFocused, setIsAreaFocused] = useState(false);


  const [formData, setFormData] = useState({
    profession: "", 
    location: "", 
    genderPreference: "", 
    budget: "", 
    moveInDate: "",
    bio: "",
    interests: [], 
  });

 const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  return (
    <div className="min-h-screen bg-base-100">
     {/* Header */}

<div className="sticky top-0 z-40 bg-base-100 border-b">
  <div className="w-full px-6 py-4 flex items-center justify-between">
    {/* Left */}
    <div className="flex items-start gap-3">
      <button
        onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
        className="mt-1 text-gray-700 hover:text-primary transition"
      >
        <ArrowLeft size={20} />
      </button>

      <div>
        <h1 className="text-base font-semibold text-gray-900">
          List Your Roommates
        </h1>
        <p className="text-sm text-gray-500">
          Step {step} of 4
        </p>
      </div>
    </div>

    {/* Right */}
    <button
      onClick={() => navigate("/")}
      className="px-4 py-2 text-sm font-medium rounded-full
                 border border-base-300 hover:bg-base-200 transition"
    >
      Save & Exit
    </button>
  </div>
</div>


     {/* Steps */}
<div className="border-b">
  <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between">
    {STEPS.map((s, i) => {
  const Icon = s.icon;
  const isActive = step === s.id;
  const isCompleted = step > s.id;

  return (
    <div key={s.id} className="flex-1 flex items-center">
      {/* Step icon + label */}
      <div className="flex flex-col items-center min-w-[72px]">
        {/* Circle */}
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

        {/* Label */}
        <p
          className={`text-xs mt-2 font-medium
            ${isActive ? "text-primary" : "text-gray-400"}`}
        >
          {s.title}
        </p>
      </div>

      {/* 🔥 Middle indicator + connector */}
      {i < STEPS.length - 1 && (
        <div className="flex-1 flex items-center">
          {/* Short active line (the one in the image) */}
          <div
            className={`h-[2px] w-10 mx-auto transition
              ${
                isActive
                  ? "bg-primary"
                  : "bg-base-300"
              }`}
          />

          {/* Long connector */}
          <div
            className={`flex-1 h-px
              ${step > s.id ? "bg-primary" : "bg-base-300"}`}
          />
        </div>
      )}
    </div>
  );
})}



  </div>
</div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-24">
       {step === 1 && (
  <div className="space-y-8">
    {/* Title */}
    <div>
      <h2 className="text-2xl mt-5 font-semibold text-gray-900">
        Roommates Information
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Tell us about the roommates you're looking for.
      </p>
    </div>

    {/* Roommates Title */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Roomates Proffession *
      </label>
      <input
        type="text"
        className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="Enter profession"
        value={formData.profession}
        onChange={(e) => updateFormData("profession", e.target.value)}
      />
      <p className="text-xs text-gray-400">
        Enter your profession.
      </p>
    </div>

    {/* Location */}
    <div className="space-y-2 relative">
        <label className="block text-sm font-medium">Location *</label>
<input
  type="text"
  placeholder="e.g., Ikeja, Lagos"
  value={formData.location}
  onChange={(e) => updateFormData("location", e.target.value)}
  onFocus={() => setIsAreaFocused(true)}
  onBlur={() => setTimeout(() => setIsAreaFocused(false), 100)} // slight delay so click on suggestion works
  className="input input-bordered h-11 sm:h-12 w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
/>

        {/* Autocomplete suggestions */}
        {formData.location && isAreaFocused && (
    <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-auto border border-gray-200 rounded-md bg-white shadow-lg">
    {LOCATIONS.filter(loc =>
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
    {LOCATIONS.filter(loc =>
      loc.toLowerCase().includes(formData.location.toLowerCase())
    ).length === 0 && (
      <li className="px-3 py-2 text-gray-400">No matching location</li>
    )}
  </ul>
)}

        <p className="text-xs text-gray-500">
          Select or type your location 
        </p>
      </div>

    
  

  </div>
)}

    {/* Step 2: Preferences */}

  {step === 2 && (
          <div className="space-y-6 mt-6">
            <h2 className="text-2xl font-semibold">Roommate Preferences</h2>
           {/* Interests as tags */}
               <div className="space-y-2">
  <label className="block text-sm font-medium">Interests / Preferences</label>

  <div className="flex flex-wrap gap-2 border border-base-300 rounded-md p-2 min-h-[44px]
                  hover:border-primary focus-within:border-primary transition-colors">
    {formData.interests.map((tag, idx) => (
      <span
        key={idx}
        className="flex items-center bg-primary/20 text-primary px-2 py-1 rounded-full text-sm"
      >
        {tag}
        <button
          type="button"
          onClick={() =>
            updateFormData(
              "interests",
              formData.interests.filter((_, i) => i !== idx)
            )
          }
          className="ml-1 hover:text-red-500"
        >
          <X size={12} />
        </button>
      </span>
    ))}

    <input
      type="text"
      className="flex-1 min-w-[120px] border-none focus:ring-0 focus:outline-none text-sm"
      placeholder="Type and press Enter"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === ",") {
          e.preventDefault();
          const value = e.target.value.trim();
          if (value && !formData.interests.includes(value)) {
            updateFormData("interests", [...formData.interests, value]);
          }
          e.target.value = "";
        }
      }}
    />
  </div>

  <p className="text-xs text-gray-500">
    Examples: Non-smoker, Pet-friendly, Gamer, Early riser
  </p>
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

                  <div className="space-y-1">
        <label className="text-sm font-medium">
          budget (₦) <span className="text-error">*</span>
        </label>
        <input
          className="input input-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="e.g. ₦1500000"
          value={formData.budget}
          onChange={(e) => updateFormData("budget", e.target.value)}
        />
      </div>

            <div>
              <label className="block text-sm font-medium mb-2">Move-In Date</label>
              <input
                type="date"
                className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
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
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[120px] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Tell roommates about yourself..."
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
              />
            </div>
          </div>
        )}


        {/* Footer */}
        <div className="flex justify-between mt-10">
          <button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
          {step < 3 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("/properties")}>Publish <Send size={16} /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListRoommate;
