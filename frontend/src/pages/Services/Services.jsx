import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../components/common/EmptyState";
import ServiceCard from "../../components/cards/ServiceCard";
import ServiceFilters from "../../components/services/ServiceFilters";

const initialFilters = {
  category: "",
  experience: "",
  availability: [],
  serviceDuration: "",
  minPrice: "",
  maxPrice: "",
  verified: false,
};

const providers = [
  {
    id: 1,
    name: "John's Repair Services",
    category: "Home Repair",
    rating: 4.9,
    reviews: 112,
    hourlyRate: "NGN 45,000",
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
    hourlyRate: "NGN 30,000",
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
    hourlyRate: "NGN 50,000",
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
    hourlyRate: "NGN 50,000",
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
  const [filters, setFilters] = useState(initialFilters);
  const [filterKey, setFilterKey] = useState(0);
  const navigate = useNavigate();

  const filteredProviders = providers.filter((provider) => {
    const availability = filters.availability || [];
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || provider.category === filters.category;
    const matchesExperience =
      !filters.experience || provider.experience === filters.experience;
    const matchesAvailability =
      availability.length === 0 ||
      availability.every((item) => provider.availability?.includes(item));
    const matchesDuration =
      !filters.serviceDuration ||
      provider.serviceDuration === filters.serviceDuration;

    const minPrice = parseInt(String(filters.minPrice || "").replace(/\D/g, "")) || 0;
    const maxPrice =
      parseInt(String(filters.maxPrice || "").replace(/\D/g, "")) || Infinity;
    const providerPrice =
      parseInt(String(provider.hourlyRate || "").replace(/\D/g, "")) || 0;
    const matchesPrice = providerPrice >= minPrice && providerPrice <= maxPrice;
    const matchesVerified = !filters.verified || provider.verified;

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

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setFilterKey((key) => key + 1);
  };

  return (
    <>
      <div className="max-w-7xl md:mt-5 mt-16 mx-auto p-4">
        <ServiceFilters
          key={filterKey}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onFilterChange={setFilters}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-4 text-gray-700 font-medium">
        {filteredProviders.length === 0
          ? ""
          : `Showing ${filteredProviders.length} service${
              filteredProviders.length > 1 ? "s" : ""
            }`}
      </div>

      {filteredProviders.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 pb-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ServiceCard
              key={provider.id}
              provider={provider}
              onClick={() => navigate(`/services/${provider.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          imageSrc="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          imageAlt="No services"
          title="No services found"
          message="Try adjusting your filters or search term to see more services."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      )}
    </>
  );
};

export default Services;
