import { Search, SlidersHorizontal, X, Clock, Star, Briefcase, DollarSign } from "lucide-react";
import { useState } from "react";
import Switch from "../Switch";

const SERVICE_CATEGORIES = [
  "Cleaning", "Moving & Relocation", "Plumbing", "Electrical", "Painting",
  "Carpentry", "Appliance Repair", "Pest Control", "Gardening", "Security",
  "Laundry", "Catering", "Photography", "Interior Design", "AC Repair",
  "Generator Repair", "Other",
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "experienced", label: "Experienced" },
  { value: "expert", label: "Expert" },
];

const AVAILABILITY_OPTIONS = [
  "Weekdays Only", "Weekends Only", "24/7 Available", "Mornings Only", "Evenings Only"
];

const SERVICE_DURATION_OPTIONS = [
  "30 minutes", "1 hour", "2 hours", "Half Day", "Full Day", "Depends on Job"
];

export default function ServiceFilters({ onSearch, onFilterChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    experience: "",
    availability: [],
    serviceDuration: "",
    minPrice: "",
    maxPrice: "",
    location: "",
  });

  const resetFilters = () => {
    setFilters({
      category: "",
      experience: "",
      availability: [],
      serviceDuration: "",
      minPrice: "",
      maxPrice: "",
      location: "",
    });
  };

  const toggleAvailability = (option) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter(a => a !== option)
        : [...prev.availability, option]
    }));
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center w-full max-w-xl">
          <Search className="absolute left-4 text-primary text-lg" />
          <input
            type="text"
            placeholder="Search for services or location…"
            className="input input-bordered w-full pl-12 pr-14 rounded-full bg-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <SlidersHorizontal
            className="absolute right-4 text-blue-500 text-xl cursor-pointer hover:text-primary"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

  {/* Service Filter Modal - Property Style */}
{/* Service Filter Modal - Property Style */}
{isFilterOpen && (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
    onClick={() => setIsFilterOpen(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-full sm:w-[90%] md:w-[600px] bg-white rounded-3xl shadow-2xl max-h-[95vh] flex flex-col animate-slideUp"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
        <h3 className="text-xl font-semibold text-gray-900">Service Filters</h3>
        <X
          className="w-5 h-5 cursor-pointer text-gray-500 hover:text-primary"
          onClick={() => setIsFilterOpen(false)}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 rounded-b-3xl">
        {/* Service Category */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Service Category
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Any", ...SERVICE_CATEGORIES].map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setFilters({ ...filters, category: cat === "Any" ? "" : cat })
                }
                className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.category === cat || (cat === "Any" && filters.category === "")
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Experience Level */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Experience Level
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() =>
                  setFilters({ ...filters, experience: level.value })
                }
                className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.experience === level.value
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </section>

        {/* Availability */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Availability
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {AVAILABILITY_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleAvailability(opt)}
                className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.availability.includes(opt)
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {/* Service Duration */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Service Duration
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Any", ...SERVICE_DURATION_OPTIONS].map((opt) => (
              <button
                key={opt}
                onClick={() =>
                  setFilters({ ...filters, serviceDuration: opt === "Any" ? "" : opt })
                }
                className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.serviceDuration === opt || (opt === "Any" && filters.serviceDuration === "")
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Price Range (₦)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </section>

        {/* Verified Toggle */}
       {/* Verified */}
<section className="border-t pt-5 mt-5 flex items-center justify-between">
  <span className="text-gray-800 font-medium">Show verified roommates only</span>
  <Switch
    checked={filters.verified === true}
    onChange={() =>
      setFilters((prev) => ({
        ...prev,
        verified: prev.verified === true ? null : true,
      }))
    }
  />
</section>

      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 rounded-b-3xl">
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-gray-600 hover:text-primary"
        >
          Clear all
        </button>
        <button
          onClick={handleApply}
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform w-full sm:w-auto"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
