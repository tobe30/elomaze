import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Switch from "../Switch";

export default function RoommateFilters({ onSearch, onFilterChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const PREFERENCE_OPTIONS = [
    "non_smoker",
    "pet_friendly",
    "gaming",
    "cooking",
    "quiet",
    "clean",
    "social",
    "night_owl",
    "early_riser",
    "drinking",
  ];

  const [filters, setFilters] = useState({
    nameOrLocation: "",
    gender: "Any",
    verified: null,
    minBudget: "",
    maxBudget: "",
    interests: [],
  });

  const resetFilters = () => {
    setFilters({
      nameOrLocation: "",
      gender: "Any",
      verified: null,
      minBudget: "",
      maxBudget: "",
      interests: [],
    });
  };

  const toggleInterest = (interest) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
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
            placeholder="Search by name or location..."
            className="input input-bordered w-full pl-12 pr-14 rounded-full bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              const term = e.target.value;
              setSearchTerm(term);
              onSearch(term);
            }}
          />
<SlidersHorizontal
            className="absolute right-4 text-blue-500 text-xl cursor-pointer hover:text-primary"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="w-full sm:w-[90%] md:w-[600px] bg-white rounded-3xl shadow-2xl max-h-[95vh] flex flex-col animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
              <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
              <X
                className="w-5 h-5 cursor-pointer text-gray-500 hover:text-primary"
                onClick={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 rounded-b-3xl">
              {/* Gender */}
              <section>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                  Gender
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Any", "Male", "Female"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setFilters({ ...filters, gender: g })}
                      className={`px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                        filters.gender === g
                          ? "bg-primary text-white border-primary shadow-md"
                          : "border-gray-300 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </section>

              {/* Verified */}
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


              {/* Budget */}
              <section>
                <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                  Budget (₦)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minBudget}
                    onChange={(e) =>
                      setFilters({ ...filters, minBudget: e.target.value })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxBudget}
                    onChange={(e) =>
                      setFilters({ ...filters, maxBudget: e.target.value })
                    }
                    className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </section>

              {/* Preferences */}
              <section>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
                >
                  <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Preferences
                  </h4>
                  <span className="text-primary text-sm font-medium">
                    {isPreferencesOpen ? "Hide" : "Show"}
                  </span>
                </div>
                {isPreferencesOpen && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {PREFERENCE_OPTIONS.map((pref) => (
                      <button
                        key={pref}
                        onClick={() => toggleInterest(pref)}
                        className={`px-3 py-2 rounded-full text-sm border transition-all ${
                          filters.interests.includes(pref)
                            ? "bg-primary text-white border-primary shadow-md"
                            : "border-gray-300 hover:border-primary hover:text-primary"
                        }`}
                      >
                        {pref.replace("_", " ").toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 rounded-b-3xl">
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
