import { useMemo, useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import PropertyCard from "../../components/cards/PropertyCard";
import PropertyFilters from "../../components/propertycard/PropertyFilters";
import { filterItems } from "../../utils/filterEngine"; // 👈 your reusable engine

const listings = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Lekki Phase 1, Lagos",
    price: 120000,
    image: "/home.jpg",
    status: "Sale",
    sponsored: true,
    verified: true,
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Parking"],
  },
  {
    id: 2,
    title: "Spacious 2-Bedroom Flat",
    location: "Victoria Island, Lagos",
    price: 100000,
    image: "/b-11.jpg",
    status: "Rent",
    sponsored: true,
    verified: false,
    type: "Duplex",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Wifi", "Parking", "AC"],
  },
  {
    id: 3,
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: 1200000,
    image: "/IMG_4430.jpg",
    status: "Fractional Ownership",
    sponsored: true,
    verified: true,
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Wifi", "AC", "Security"],
  },
];

const categories = [
  "All",
  "Mansion",
  "Ranch House",
  "Apartment",
  "Penthouse",
  "Villa",
  "Mobile Home",
  "Duplex",
  "Farmhouse",
  "Townhouse",
];

const initialFilters = {
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  minPrice: "",
  maxPrice: "",
  verified: false,
  amenities: [],
};

export default function PropertyListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [filterKey, setFilterKey] = useState(0);

  // ✅ SINGLE SOURCE OF TRUTH (no duplicated logic)
  const filteredListings = useMemo(() => {
    return filterItems(listings, searchTerm, filters);
  }, [searchTerm, filters]);

  const applyFilters = (nextFilters) => {
    setFilters(nextFilters);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setFilterKey((k) => k + 1);
  };

  return (
    <div className="max-w-7xl md:mt-5 mt-16 mx-auto p-4">
      <PropertyFilters
        key={filterKey}
        categories={categories}
        onSearch={handleSearch}
        onFilterChange={applyFilters}
      />

      <div className="mb-4 text-gray-700 font-medium">
        {filteredListings.length >= 1000
          ? "Over 1,000 homes"
          : `Showing ${filteredListings.length} ${
              filteredListings.length === 1 ? "property" : "properties"
            }`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <PropertyCard key={listing.id} property={listing} />
        ))}
      </div>

      {filteredListings.length === 0 && (
        <EmptyState
          imageSrc="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          imageAlt="No properties"
          title="No properties match your search or filters"
          message="Try adjusting your filters or search terms to see more properties."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
}