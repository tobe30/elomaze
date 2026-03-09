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
  { id: 1, title: "Service Info", icon: Briefcase },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Details", icon: Home },
  { id: 4, title: "Media", icon: Send },
];

const SERVICE_CATEGORIES = [
  "Cleaning", "Moving & Relocation", "Plumbing", "Electrical", "Painting",
  "Carpentry", "Appliance Repair", "Pest Control", "Gardening", "Security",
  "Laundry", "Catering", "Photography", "Interior Design", "AC Repair",
  "Generator Repair", "Other",
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner", desc: "Less than 1 year" },
  { value: "intermediate", label: "Intermediate", desc: "1-3 years" },
  { value: "experienced", label: "Experienced", desc: "3-5 years" },
  { value: "expert", label: "Expert", desc: "5+ years" },
];

const AVAILABILITY_OPTIONS = [
  "Weekdays Only", "Weekends Only", "24/7 Available",
  "Mornings Only", "Evenings Only",
];

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

const WHATS_INCLUDED_OPTIONS = [
  "Materials Included",
  "Transport Included",
  "After-Service Support",
  "Warranty Available",
  "Free Consultation",
];

const WORKING_HOURS_OPTIONS = [
  "Morning", "Afternoon", "Evening", "Weekends", "Flexible"
];

const SERVICE_DURATION_OPTIONS = [
  "30 minutes", "1 hour", "2 hours", "Half Day", "Full Day", "Depends on Job"
];



const ListService = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isAreaFocused, setIsAreaFocused] = useState(false);


  const [formData, setFormData] = useState({
    title: "", 
    description: "", 
    category: "", 
    pricingType: "fixed", 
    price: "",
    priceNote: "",
    serviceAreas: "", 
    experience: "", 
    availability: [],
    images: [],
    whatsIncluded: [],      // multi-select array
    workingHours: [],       // multi-select array
    serviceDuration: "",    // single-select string
  });

 const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAvailability = (option) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(a => a !== option)
        : [...prev.availability, option],
    }));
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
          List Your Service
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
        Service Information
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Tell us about the service you offer.
      </p>
    </div>

    {/* Service Title */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Service Title *
      </label>
      <input
        type="text"
        className="input input-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="Professional Home Cleaning Service"
        value={formData.title}
        onChange={(e) => updateFormData("title", e.target.value)}
      />
      <p className="text-xs text-gray-400">
        A clear title helps customers find your service
      </p>
    </div>

    {/* Description */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        className="textarea textarea-bordered w-full min-h-[120px] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="Describe your service in detail..."
        value={formData.description}
        maxLength={500}
        onChange={(e) => updateFormData("description", e.target.value)}
      />
      <p className="text-xs text-gray-400">
        {formData.description.length}/500 characters
      </p>
    </div>

    {/* Service Category */}
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">
        Service Category *
      </label>

      <div className="flex flex-wrap gap-3">
        {SERVICE_CATEGORIES.map((cat) => {
          const active = formData.category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => updateFormData("category", cat)}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-base-300 text-gray-700 hover:border-primary"
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>

    {/* Pricing */}
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700">
        Pricing *
      </label>

      {/* Radio options */}
     <div className="flex items-center gap-6">
  {[
    { value: "fixed", label: "Fixed Price" },
    { value: "hourly", label: "Hourly Rate" },
    { value: "negotiable", label: "Negotiable" },
  ].map((opt) => (
    <label
      key={opt.value}
      className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
    >
      <input
        type="radio"
        name="pricingType"
        className="radio radio-sm border-gray-300 checked:bg-primary checked:border-primary"
        checked={formData.pricingType === opt.value}
        onChange={() => updateFormData("pricingType", opt.value)}
      />
      {opt.label}
    </label>
    
  ))}
</div>

      {/* Price input */}
    {/* Price input */}
<div className="space-y-1">
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
      ₦
    </span>

    <input
      type="number"
      className="input input-bordered w-full pl-10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
      placeholder={formData.pricingType === "hourly" ? "5,000" : "25,000"}
      value={formData.price}
      onChange={(e) => updateFormData("price", e.target.value)}
    />
  </div>

  {/* 👇 Helper text UNDER the input */}
  <p className="text-xs text-gray-400">
    Enter your {formData.pricingType === "hourly" ? "hourly rate" : "fixed price"} in Naira
  </p>
</div>
 <textarea
                className="textarea textarea-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Optional price note"
                value={formData.priceNote}
                onChange={(e) =>
                  updateFormData("priceNote", e.target.value)
                }
              />
    </div>
  </div>
)}

{step === 2 && (
  <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
    {/* Header */}
    <div className="space-y-1 sm:space-y-2">
      <h2 className="text-xl mt-5 sm:text-2xl font-semibold">Service Coverage</h2>
      <p className="text-sm sm:text-base text-gray-500">
        Where do you offer your services?
      </p>
    </div>

    <div className="space-y-4">
      {/* Service Area Input with Autocomplete */}
      <div className="space-y-2 relative">
        <label className="block text-sm font-medium">Service Area *</label>
<input
  type="text"
  placeholder="e.g., Ikeja, Lagos"
  value={formData.serviceAreas}
  onChange={(e) => updateFormData("serviceAreas", e.target.value)}
  onFocus={() => setIsAreaFocused(true)}
  onBlur={() => setTimeout(() => setIsAreaFocused(false), 100)} // slight delay so click on suggestion works
  className="input input-bordered h-11 sm:h-12 w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
/>

        {/* Autocomplete suggestions */}
        {formData.serviceAreas && isAreaFocused && (
  <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-auto border border-gray-200 rounded-md bg-white shadow-lg">
    {LOCATIONS.filter(loc =>
      loc.toLowerCase().includes(formData.serviceAreas.toLowerCase())
    ).map((loc) => (
      <li
        key={loc}
        onClick={() => updateFormData("serviceAreas", loc)}
        className="px-3 py-2 cursor-pointer hover:bg-primary/10"
      >
        {loc}
      </li>
    ))}
    {LOCATIONS.filter(loc =>
      loc.toLowerCase().includes(formData.serviceAreas.toLowerCase())
    ).length === 0 && (
      <li className="px-3 py-2 text-gray-400">No matching location</li>
    )}
  </ul>
)}

        <p className="text-xs text-gray-500">
          Select or type the main location where you provide your service
        </p>
      </div>

      {/* Experience Level */}
      <div className="space-y-3 pt-4">
        <label className="block text-sm font-medium">Experience Level *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPERIENCE_LEVELS.map((level) => (
            <div
              key={level.value}
              onClick={() => updateFormData("experience", level.value)}
              className={`border-2 p-4 cursor-pointer transition-all hover:border-primary/50 rounded-lg ${
                formData.experience === level.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.experience === level.value
                      ? "border-primary bg-primary"
                      : "border-gray-300"
                  }`}
                >
                  {formData.experience === level.value && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {level.label}
                    <Star className="h-3 w-3 text-amber-500" />
                  </p>
                  <p className="text-xs text-gray-500">{level.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}



{step === 3 && (
  <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
    <div className="space-y-1 sm:space-y-2">
      <h2 className="text-xl sm:text-2xl font-semibold">Service Details & Contact</h2>
      <p className="text-sm sm:text-base text-gray-500">
        Provide details about your service, working hours, and how customers can reach you.
      </p>
    </div>

    <div className="space-y-6">

      {/* What's Included */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">What's Included *</label>
        <div className="flex flex-wrap gap-2">
          {WHATS_INCLUDED_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setFormData(prev => ({
                  ...prev,
                  whatsIncluded: prev.whatsIncluded.includes(option)
                    ? prev.whatsIncluded.filter(i => i !== option)
                    : [...prev.whatsIncluded, option]
                }))
              }
              className={`px-3 py-2 rounded-full text-sm border transition
                ${
                  formData.whatsIncluded.includes(option)
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-base-300 text-gray-700 hover:border-primary"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Working Hours *</label>
        <div className="flex flex-wrap gap-2">
          {WORKING_HOURS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                setFormData(prev => ({
                  ...prev,
                  workingHours: prev.workingHours.includes(option)
                    ? prev.workingHours.filter(i => i !== option)
                    : [...prev.workingHours, option]
                }))
              }
              className={`px-3 py-2 rounded-full text-sm border transition
                ${
                  formData.workingHours.includes(option)
                    ? "bg-primary text-white border-primary"
                    : "bg-white border-base-300 text-gray-700 hover:border-primary"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Service Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Service Duration *</label>
        <select
          className="select select-bordered w-full"
          value={formData.serviceDuration}
          onChange={(e) => updateFormData("serviceDuration", e.target.value)}
        >
          <option value="">Select duration</option>
          {SERVICE_DURATION_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div className="space-y-3 pt-4">
        <label className="block text-sm font-medium text-gray-700">Availability *</label>
        <p className="text-sm text-gray-400">Select all that apply</p>
        <div className="flex flex-wrap gap-2">
          {AVAILABILITY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleAvailability(option)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm border transition-all 
                ${formData.availability.includes(option) 
                  ? "bg-primary text-white border-primary hover:bg-primary/90" 
                  : "bg-white border-base-300 text-gray-700 hover:border-primary hover:bg-base-100"}`}
            >
              <Clock className="h-3 w-3" />
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Inputs */}
    </div>
  </div>
)}


 {step === 4 && (
  <div className="space-y-8 mt-6">
    {/* Title */}
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Publish Your Service
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Add portfolio images and publish your service.
      </p>
    </div>

    {/* Upload box */}
    <div>
      <label className="text-sm font-medium">
        Portfolio Images <span className="text-error">*</span>
      </label>

      <label
        className="mt-2 flex flex-col items-center justify-center
                   border-2 border-dashed border-base-300
                   rounded-xl h-44 cursor-pointer
                   hover:border-primary transition"
      >
        <Upload size={28} className="text-gray-400 mb-2" />
        <p className="font-medium text-gray-700">
          Click to upload images
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PNG, JPG up to 5MB each. Maximum 10 images.
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={uploadImages}
        />
      </label>
    </div>

    {/* Image previews */}
{previews.length > 0 && (
  <div className="space-y-5">
    {/* COVER IMAGE – CROPPED (BEST UX) */}
    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border">
      <img
        src={previews[0]}
        alt="Cover"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <span className="absolute bottom-3 left-3
                       bg-primary text-white
                       text-xs px-3 py-1 rounded-full">
        Cover
      </span>

      <button
        type="button"
        onClick={() => setPreviews(p => p.slice(1))}
        className="absolute top-3 right-3
                   bg-black/60 text-white
                   rounded-full p-2 hover:bg-black"
      >
        <X size={16} />
      </button>
    </div>

    {/* THUMBNAILS */}
    {previews.length > 1 && (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {previews.slice(1).map((src, i) => (
          <div
            key={i}
            className="relative aspect-[4/3] rounded-lg overflow-hidden border"
          >
            <img
              src={src}
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() =>
                setPreviews(p => p.filter((_, x) => x !== i + 1))
              }
              className="absolute top-1.5 right-1.5
                         bg-black/60 text-white
                         rounded-full p-1 hover:bg-black"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}

    {/* Tip */}
    <p className="text-xs text-gray-500">
      Tip: The first image will be your cover photo
    </p>

  </div>
)}


        {/* Footer */}
        <div className="flex justify-between mt-10">
          <button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
          {step < 4 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("/properties")}>Publish <Send size={16} /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListService;
