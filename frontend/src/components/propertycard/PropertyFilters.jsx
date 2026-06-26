import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import Switch from "../Switch";

export default function PropertyFilters({ categories, onSearch, onFilterChange }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "Any",
    status: "Any",
    minPrice: "",
    maxPrice: "",
    verified: false,
    bedrooms: "Any",
    propertyType: "Any",
    amenities: [],
  });

  const resetFilters = () => {
    setFilters({
      type: "Any",
      status: "Any",
      minPrice: "",
      maxPrice: "",
      verified: false,
      bedrooms: "Any",
      propertyType: "Any",
      amenities: [],
    });
  };

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="relative flex items-center w-full max-w-xl">
          <Search className="absolute left-4 text-gray-500 text-lg " />
          <input
            type="text"
            placeholder="Search by title, location..."
            className="input input-bordered w-full pl-12 pr-14 rounded-full bg-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
          />
          <SlidersHorizontal
            className="absolute right-4 text-primary  text-xl cursor-pointer hover:text-primary"
            onClick={() => setIsFilterOpen(true)}
          />
        </div>
      </div>

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
        <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
        <X
          className="w-5 h-5 cursor-pointer text-gray-500 hover:text-primary"
          onClick={() => setIsFilterOpen(false)}
        />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 rounded-b-3xl">
        {/* Property Type */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Property Type
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Any", "Apartment", "House", "Duplex", "Studio"].map((pt) => (
              <button
                key={pt}
                onClick={() => setFilters({ ...filters, propertyType: pt })}
                className={`px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.propertyType === pt
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </section>

        {/* Bedrooms */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Bedrooms
          </h4>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {["Any", 1, 2, 3, 4, 5].map((num) => (
              <button
                key={`bed-${num}`}
                onClick={() => setFilters({ ...filters, bedrooms: num })}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.bedrooms === num
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {num === "Any" ? "Any" : `${num}+`}
              </button>
            ))}
          </div>
        </section>

        {/* Bathrooms */}
        <section>
          <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
            Bathrooms
          </h4>
          <div className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {["Any", 1, 2, 3].map((num) => (
              <button
                key={`bath-${num}`}
                onClick={() => setFilters({ ...filters, bathrooms: num })}
                className={`flex-shrink-0 px-3 py-2 rounded-full text-sm font-medium border transition-all
                  ${filters.bathrooms === num
                    ? "bg-primary text-white border-primary shadow-md"
                    : "border-gray-300 hover:border-primary hover:text-primary"
                  }`}
              >
                {num === "Any" ? "Any" : `${num}+`}
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

        {/* Amenities */}
        <section>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
          >
            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Amenities
            </h4>
            <span className="text-primary text-sm font-medium">
              {isAmenitiesOpen ? "Hide" : "Show"}
            </span>
          </div>

          {isAmenitiesOpen && (
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
              {["Wifi", "Parking", "AC", "Security", "Water", "Balcony"].map(
                (amen) => (
                  <button
                    key={amen}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        amenities: filters.amenities.includes(amen)
                          ? filters.amenities.filter((a) => a !== amen)
                          : [...filters.amenities, amen],
                      })
                    }
                    className={`px-3 py-2 rounded-full text-sm border transition-all
                      ${
                        filters.amenities.includes(amen)
                          ? "bg-primary text-white border-primary shadow"
                          : "border-gray-300 hover:border-primary hover:text-primary"
                      }`}
                  >
                    {amen}
                  </button>
                )
              )}
            </div>
          )}
        </section>

       {/* Verified */}
<section className="flex items-center justify-between border-t pt-4">
  <span className="text-gray-800 font-medium">
    Show verified listings only
  </span>
  <Switch
    checked={filters.verified}
    onChange={() =>
      setFilters({ ...filters, verified: !filters.verified })
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
