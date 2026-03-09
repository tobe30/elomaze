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
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Basic Info", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Details", icon: Home },
  { id: 4, title: "Media", icon: ImageIcon },
  { id: 5, title: "Review", icon: CheckCircle2 },
];

const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Studio",
  "Duplex",
  "Flat",
  "Self-Contain",
  "Room",
];

const AMENITIES = ["24/7 Power", "Water", "Security", "Parking", "Furnished", "Balcony"];

const ListProperty = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    propertyType: "",
    price: "",
    priceType: "yearly",
    area: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    amenities: [],
    videoUrl: "",
  });

  const update = (key, value) => setForm({ ...form, [key]: value });

  const toggleAmenity = (item) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(item)
        ? prev.amenities.filter((a) => a !== item)
        : [...prev.amenities, item],
    }));
  };

  const uploadImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setPreviews((p) => [...p, reader.result]);
      reader.readAsDataURL(file);
    });
    setImages((i) => [...i, ...files]);
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
          List Your Property
        </h1>
        <p className="text-sm text-gray-500">
          Step {step} of 5
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
    <div>
      <h2 className="text-xl font-semibold mt-4">Basic Information</h2>
      <p className="text-sm text-gray-500 mt-1">
        Let's start with the essentials about your property.
      </p>
    </div>

    {/* Property Title */}
    <div className="space-y-1">
      <label className="text-sm font-medium">
        Property Title <span className="text-error">*</span>
      </label>
      <input
        className="input input-bordered w-full rounded-xl h-12
focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="e.g. Spacious 2-Bedroom Apartment in Lekki"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
      />
      <p className="text-xs text-gray-500">
        A catchy title helps your listing stand out
      </p>
    </div>

    {/* Description */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Description</label>
      <textarea
        className="textarea textarea-bordered w-full rounded-xl min-h-[120px] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="Describe your property in detail. Mention unique features, nearby attractions, and what makes it special..."
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        maxLength={500}
      />
      <p className="text-xs text-gray-500">
        {form.description.length}/500 characters
      </p>
    </div>

    {/* Property Type */}
    <div className="space-y-1">
      <label className="text-sm font-medium">
        Property Type <span className="text-error">*</span>
      </label>
      <select
        className="select select-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        value={form.propertyType}
        onChange={(e) => update("propertyType", e.target.value)}
      >
        <option value="">Select property type</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>

    {/* Price */}
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Price (₦) <span className="text-error">*</span>
        </label>
        <input
          className="input input-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          placeholder="e.g. 1500000"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Price Type <span className="text-error">*</span>
        </label>
        <select
          className="select select-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={form.priceType}
          onChange={(e) => update("priceType", e.target.value)}
        >
          <option value="yearly">Per Year</option>
          <option value="monthly">Per Month</option>
        </select>
      </div>
    </div>
  </div>
)}

{step === 2 && (
  <div className="max-w-xl space-y-8">
    {/* Title */}
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Location Details
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Help potential tenants find your property easily.
      </p>
    </div>

    {/* Area / City */}
    <div className="space-y-1">
      <label className="text-sm font-medium">
        Area / City <span className="text-error">*</span>
      </label>
      <input
        className="input input-bordered w-full rounded-xl h-12
          focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="e.g., Lekki Phase 1, Lagos"
        value={form.area}
        onChange={(e) => update("area", e.target.value)}
      />
      <p className="text-xs text-gray-500">
        Enter the general area or neighborhood
      </p>
    </div>

    {/* Full Address */}
    <div className="space-y-1">
      <label className="text-sm font-medium">
        Full Address <span className="text-gray-400">(Optional)</span>
      </label>
      <input
        className="input input-bordered w-full rounded-xl h-12
          focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="e.g., 15 Admiralty Way, Lekki Phase 1"
      />
      <p className="text-xs text-gray-500">
        This will only be shared with serious inquiries
      </p>
    </div>

    {/* Nearby Landmark */}
    <div className="space-y-1">
      <label className="text-sm font-medium">
        Nearby Landmark <span className="text-gray-400">(Optional)</span>
      </label>
      <input
        className="input input-bordered w-full rounded-xl h-12
          focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="e.g., Shoprite Mall, IMAX Cinema"
      />
    </div>

    {/* Proximity Note */}
    <div className="space-y-1">
      <label className="text-sm font-medium">
        Proximity Note <span className="text-gray-400">(Optional)</span>
      </label>
      <input
        className="input input-bordered w-full rounded-xl h-12
          focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        placeholder="e.g., 5 minutes walk to the main bus stop"
      />
      <p className="text-xs text-gray-500">
        Helps tenants understand the convenience of the location
      </p>
    </div>
  </div>
)}


        {step === 3 && (
  <div className="space-y-10">
    {/* Title */}
    <div>
      <h2 className="text-xl mt-5 font-semibold text-gray-900">
        Property Details
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Provide specifics about rooms and amenities.
      </p>
    </div>

    {/* Rooms */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Bedrooms */}
      <div className="space-y-1">
        <label className="text-sm font-medium flex items-center gap-2">
          <Bed size={16} /> Bedrooms <span className="text-error">*</span>
        </label>
        <select
          className="select select-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={form.bedrooms}
          onChange={(e) => update("bedrooms", e.target.value)}
        >
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      {/* Bathrooms */}
      <div className="space-y-1">
        <label className="text-sm font-medium flex items-center gap-2">
          <Bath size={16} /> Bathrooms
        </label>
        <select
          className="select select-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={form.bathrooms}
          onChange={(e) => update("bathrooms", e.target.value)}
        >
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>

      {/* Toilets */}
      <div className="space-y-1">
        <label className="text-sm font-medium flex items-center gap-2">
          <DoorOpen size={16} /> Toilets
        </label>
        <select
          className="select select-bordered w-full rounded-xl h-12 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          value={form.toilets}
          onChange={(e) => update("toilets", e.target.value)}
        >
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Amenities */}
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium flex items-center gap-2">
          <Sparkles size={16} /> Amenities
        </p>
        <p className="text-sm text-gray-500">
          Select all that apply to your property
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          "24/7 Power Supply",
          "Running Water",
          "Security",
          "Parking Space",
          "Air Conditioning",
          "Furnished",
          "Balcony",
          "Swimming Pool",
          "Gym",
          "WiFi",
          "CCTV",
          "Gate",
          "Boys Quarters",
          "Serviced",
          "Tiled Floor",
          "POP Ceiling",
          "Kitchen Cabinet",
          "Wardrobe",
          "Water Heater",
          "Generator",
        ].map((item) => {
          const active = form.amenities.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggleAmenity(item)}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "border-base-300 hover:border-primary"
                }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>

    <hr />

    {/* Availability */}
   {/* Divider */}
<div className="border-t pt-8 space-y-8">

  {/* Available From */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-900">
      Available From
    </label>

    <div className="relative">
      <input
        type="date"
        className="input input-bordered w-full rounded-xl h-12 pl-11
                   focus:border-primary focus:ring-1 focus:ring-primary"
      />

      {/* Calendar Icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </span>
    </div>
  </div>

</div>

  </div>
)}


        {step === 4 && (
  <div className="space-y-8 mt-6">
    {/* Title */}
    <div>
      <h2 className="text-xl font-semibold text-gray-900">
        Property Media
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Great photos attract more inquiries. Add up to 10 images.
      </p>
    </div>

    {/* Upload box */}
    <div>
      <label className="text-sm font-medium">
        Property Images <span className="text-error">*</span>
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
<div className="space-y-2 pt-2">
  {/* Label */}
  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
    <Play size={16} className="text-blue-500" />
    <span>
      Video Tour URL{" "}
      <span className="text-gray-400 font-normal">(Optional)</span>
    </span>
  </div>

  {/* Input */}
  <input
    type="url"
    className="input input-bordered w-full rounded-xl h-12
               focus:border-primary focus:ring-1 focus:ring-primary"
    placeholder="e.g., https://youtube.com/watch?v=..."
    value={form.videoUrl}
    onChange={(e) => update("videoUrl", e.target.value)}
  />

  {/* Helper text */}
  <p className="text-xs text-gray-500">
    Add a YouTube or Vimeo link for a virtual tour
  </p>
</div>
  </div>
)}

        {step === 5 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Review</h3>
            <p>{form.title}</p>
            <p>{form.area}</p>
            <p>₦{form.price} / {form.priceType}</p>
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((a) => <span key={a} className="badge badge-secondary">{a}</span>)}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between mt-10">
          <button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
          {step < 5 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Continue <ArrowRight size={16} /></button>
          ) : (
            <button className="btn btn-primary" onClick={() => navigate("/properties")}>Publish</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
