import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceFilters from "../../components/services/ServiceFilters";
import { Users, CheckCircle, Star, MapPin, Clock, BadgeCheck } from "lucide-react";

// Sample providers data
const providers = [
  {
    id: 1,
    name: "John's Repair Services",
    category: "Home Repair",
    rating: 4.9,
    reviews: 112,
    hourlyRate: "₦45,000",
    responseTime: "1 hour",
    verified: true,
    location: "Downtown Area",
    image: "/service.png",
    description: "Professional handyman with 10+ years experience. Specializing in home repairs and maintenance.",
    views: "4.7k",
  },
  {
    id: 2,
    name: "Sarah's Tailoring Studio",
    category: "Tailoring",
    rating: 5.0,
    reviews: 112,
    hourlyRate: "₦30,000",
    responseTime: "30 min",
    verified: true,
    location: "City Center",
    image: "/eee.webp",
    description: "Expert tailor offering alterations, custom fitting, and clothing repairs. Quick turnaround guaranteed.",
    views: "3.2k",
  },
  {
    id: 3,
    name: "Mike's Tech Solutions",
    category: "Tech Support",
    rating: 4.8,
    reviews: 112,
    hourlyRate: "₦50,000",
    responseTime: "2 hours",
    verified: true,
    location: "Tech District",
    image: "/e.webp",
    description: "Computer repair, software installation, and tech setup. Same-day service available.",
    views: "5.1k",
  },
  {
    id: 4,
    name: "Tobe's Repaire Solutions",
    category: "Tech Support",
    rating: 4.8,
    reviews: 112,
    hourlyRate: "₦50,000",
    responseTime: "2 hours",
    verified: true,
    location: "Tech District",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    description: "Computer repair, software installation, and tech setup. Same-day service available.",
    views: "5.1k",
  },
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    experience: "",
    availability: [],
    serviceDuration: "",
    minPrice: "",
    maxPrice: "",
    verified: false,
  });
  const navigate = useNavigate();

  // Filter providers based on searchTerm + filters
  const filteredProviders = providers.filter((p) => {
    // Search term match
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory = !filters.category || p.category === filters.category;

    // Experience filter
    const matchesExperience = !filters.experience || p.experience === filters.experience;

    // Availability filter
    const matchesAvailability =
      filters.availability.length === 0 ||
      filters.availability.every((a) => p.availability?.includes(a));

    // Service duration filter
    const matchesDuration = !filters.serviceDuration || p.serviceDuration === filters.serviceDuration;

    // Price filter
    const minPrice = parseInt(filters.minPrice.replace(/\D/g, "")) || 0;
    const maxPrice = parseInt(filters.maxPrice.replace(/\D/g, "")) || Infinity;
    const providerPrice = parseInt(p.hourlyRate.replace(/\D/g, "")) || 0;
    const matchesPrice = providerPrice >= minPrice && providerPrice <= maxPrice;

    // Verified filter
    const matchesVerified = !filters.verified || p.verified;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesExperience &&
      matchesAvailability &&
      matchesDuration &&
      matchesPrice &&
      matchesVerified
    );
  });

  return (
    <>
      {/* Filters */}
      <div className="max-w-7xl md:mt-5 mt-16 mx-auto p-4">
        <ServiceFilters
          searchTerm={searchTerm}
          onSearch={(term) => setSearchTerm(term)}
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />
      </div>

      {/* Header */}
      {/* Header / No Services Found */}
<div className="max-w-7xl mx-auto px-4 mb-4 text-gray-700 font-medium">
  {filteredProviders.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      {/* Example illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No services"
        className="w-40 h-40 object-contain opacity-70 animate-bounce"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        No services found
      </h2>
      <p className="text-gray-500 text-center max-w-xs">
        Try adjusting your filters or search term to see more services.
      </p>
      <button
        onClick={() => setFilters({})} // Reset filters
        className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition"
      >
        Reset Filters
      </button>
    </div>
  ) : (
    `Showing ${filteredProviders.length} service${filteredProviders.length > 1 ? "s" : ""}`
  )}
</div>

      {/* Service Listings */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.map((provider) => (
          <div
            key={provider.id}
            onClick={() => navigate(`/services/${provider.id}`)}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow hover:shadow-lg transition cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-56 w-full bg-gray-100">
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover object-center rounded-t-2xl hover:scale-105 transition-transform duration-500"
              />
              {provider.verified && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-500 text-white text-xs px-1 py-1 rounded-full">
                  <BadgeCheck className="w-4 h-4" />
                </div>
              )}

              {/* Views */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                <Users className="w-3.5 h-3.5" />
                <span>{provider.views} views</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-[16px] font-semibold text-black">{provider.name}</h3>
              <p className="text-[13px] text-gray-600 mb-2">{provider.category}</p>
              <p className="text-sm text-gray-500 mb-4">{provider.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1 text-primary">
                  <Star className="w-4 h-4 fill-primary" />
                  <span className="font-medium">{provider.rating}</span>
                  <span className="text-gray-500">({provider.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {provider.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {provider.responseTime}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <span className="text-sm text-gray-500">Starting at</span>
                <p className="text-[17px] font-bold text-black">{provider.hourlyRate}/hr</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


export default Services;
