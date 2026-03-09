import { useState } from "react";
import PropertyFilters from "../../components/propertycard/PropertyFilters";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { BadgeCheck, Car, Dumbbell, Wifi, Heart, MapPin } from "lucide-react";

// Sample listings
const listings = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "120000",
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
    price: "100000",
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
    price: "1200000",
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

export default function PropertyListing() {
  const [filteredListings, setFilteredListings] = useState(listings);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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

  // Called when filters change
  const applyFilters = (filters) => {
    setFilters(filters);
    filterListings(searchTerm, filters);
  };

  // Called when search changes
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterListings(term, filters);
  };

  // Main filtering logic
  const filterListings = (term, filters) => {
    const filtered = listings.filter((item) => {
      // 🔹 Search by title/location
      const matchesSearch =
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.location.toLowerCase().includes(term.toLowerCase());

      // 🔹 Property type
      const matchesType =
        !filters.propertyType || filters.propertyType === "Any"
          ? true
          : item.type === filters.propertyType;

      // 🔹 Bedrooms
      const matchesBedrooms =
        !filters.bedrooms || filters.bedrooms === "Any"
          ? true
          : item.bedrooms === filters.bedrooms;

      // 🔹 Bathrooms
      const matchesBathrooms =
        !filters.bathrooms || filters.bathrooms === "Any"
          ? true
          : item.bathrooms === filters.bathrooms;

      // 🔹 Min/Max Price
      const price = parseInt(item.price);
      const matchesMin =
        !filters.minPrice || price >= parseInt(filters.minPrice);
      const matchesMax =
        !filters.maxPrice || price <= parseInt(filters.maxPrice);

      // 🔹 Verified
      const matchesVerified =
        !filters.verified || item.verified === filters.verified;

      // 🔹 Amenities
      const matchesAmenities =
        !filters.amenities || filters.amenities.length === 0
          ? true
          : filters.amenities.every((amen) =>
              item.amenities.includes(amen)
            );

      return (
        matchesSearch &&
        matchesType &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesMin &&
        matchesMax &&
        matchesVerified &&
        matchesAmenities
      );
    });

    setFilteredListings(filtered);
  };

  return (
    <>
      <div className="max-w-7xl md:mt-5 mt-16 mx-auto p-4">
        {/* Filter + Search */}
        <PropertyFilters
          categories={categories}
          onSearch={handleSearch}
          onFilterChange={applyFilters}
        />

        {/* Showing text */}
        <div className="mb-4 text-gray-700 font-medium">
          {filteredListings.length >= 1000
            ? "Over 1,000 homes"
            : `Showing ${filteredListings.length} ${
                filteredListings.length === 1 ? "property" : "properties"
              }`}
        </div>

        {/* Property grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listing/${listing.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 overflow-hidden group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {listing.status}
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-lg rounded-full p-2 shadow-sm hover:bg-white/60 transition-all duration-300 transform hover:scale-110"
                >
                  <Heart className="w-5 h-5 text-gray-600 transition-colors duration-300 hover:text-red-500" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-[15px] font-semibold text-gray-900">
                  {listing.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm gap-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  {listing.location}
                </div>
                <div className="flex items-center gap-4 text-gray-600 text-sm mt-1">
                  {listing.amenities.map((amen) => (
                    <span key={amen} className="flex items-center gap-1">
                      {amen === "Wifi" && <Wifi className="w-4 h-4 text-primary" />}
                      {amen === "Parking" && <Car className="w-4 h-4 text-primary" />}
                      {amen === "Gym" && <Dumbbell className="w-4 h-4 text-primary" />}
                      {amen}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-[17px] font-bold text-black">
                    ₦{parseInt(listing.price).toLocaleString()}
                    <span className="text-gray-500 font-normal text-sm"> /year</span>
                  </p>

                  {listing.verified && (
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <BadgeCheck className="w-5 h-5 text-white bg-blue-500 rounded-full" />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

{/* Empty State */}
{filteredListings.length === 0 && (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    {/* Illustration */}
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
      alt="No properties"
      className="w-40 h-40 object-contain opacity-70 animate-bounce"
    />
    
    {/* Main message */}
    <h2 className="text-xl font-semibold text-gray-800">
      No properties match your search or filters
    </h2>
    
    {/* Subtext */}
    <p className="text-gray-500 text-center max-w-xs">
      Try adjusting your filters or search terms to see more properties.
    </p>
    
    {/* Reset button */}
    <button
      onClick={() => setFilters({})} // or your reset function
      className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition"
    >
      Reset Filters
    </button>
  </div>
)}

      </div>
    </>
  );
}
