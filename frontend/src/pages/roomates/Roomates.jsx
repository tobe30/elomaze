import { useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import RoommateCard from "../../components/cards/RoommateCard";
import RoommateFilters from "../../components/roomates/RoomatesFilters";

const initialFilters = {
  gender: "Any",
  verified: null,
  minBudget: "",
  maxBudget: "",
  interests: [],
};

const roommates = [
  {
    id: 1,
    name: "Sarah Chen",
    school: "MIT Engineering",
    location: "Cambridge, MA",
    bio: "Looking for a neat female roommate near school gate",
    budget: 150000,
    image: "/student-profile.jpg",
    verified: true,
    gender: "female",
    interests: ["non_smoker", "quiet", "clean"],
  },
  {
    id: 2,
    name: "Marcus Jones",
    school: "Harvard Business",
    location: "Boston, MA",
    bio: "Easygoing and clean, prefer someone tidy and social.",
    budget: 180000,
    image: "/roommate2.jpg",
    verified: true,
    gender: "male",
    interests: ["gaming", "social", "night_owl"],
  },
  {
    id: 3,
    name: "Priya Patel",
    school: "BU Computer Science",
    location: "Boston, MA",
    bio: "Quiet, respectful, and loves cooking together.",
    budget: 200000,
    image: "/roommate3.jpg",
    verified: false,
    gender: "female",
    interests: ["cooking", "quiet", "early_riser"],
  },
];

const filterRoommates = (term, filters) => {
  const normalizedTerm = term.toLowerCase();

  return roommates.filter((person) => {
    const interests = filters.interests || [];
    const matchesSearch =
      person.name.toLowerCase().includes(normalizedTerm) ||
      person.school.toLowerCase().includes(normalizedTerm) ||
      person.location.toLowerCase().includes(normalizedTerm);
    const matchesGender =
      !filters.gender || filters.gender === "Any"
        ? true
        : person.gender.toLowerCase() === filters.gender.toLowerCase();
    const matchesMinBudget =
      !filters.minBudget || person.budget >= parseInt(filters.minBudget);
    const matchesMaxBudget =
      !filters.maxBudget || person.budget <= parseInt(filters.maxBudget);
    const matchesVerified =
      filters.verified === null ? true : person.verified === filters.verified;
    const matchesInterests =
      interests.length > 0
        ? interests.every((interest) => person.interests?.includes(interest))
        : true;

    return (
      matchesSearch &&
      matchesGender &&
      matchesMinBudget &&
      matchesMaxBudget &&
      matchesVerified &&
      matchesInterests
    );
  });
};

const RoommatesPage = () => {
  const [filteredRoommates, setFilteredRoommates] = useState(roommates);
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKey, setFilterKey] = useState(0);

  const applyFilters = (nextFilters) => {
    setFilters(nextFilters);
    setFilteredRoommates(filterRoommates(searchTerm, nextFilters));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredRoommates(filterRoommates(term, filters));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setFilteredRoommates(roommates);
    setFilterKey((key) => key + 1);
  };

  return (
    <div className="max-w-7xl md:mt-5 mt-16 mx-auto p-4">
      <RoommateFilters
        key={filterKey}
        onSearch={handleSearch}
        onFilterChange={applyFilters}
      />

      <div className="mb-4 text-gray-700 font-medium">
        {filteredRoommates.length === 0
          ? ""
          : `Showing ${filteredRoommates.length} roommate${
              filteredRoommates.length > 1 ? "s" : ""
            }`}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoommates.map((person) => (
          <RoommateCard key={person.id} person={person} />
        ))}
      </div>

      {filteredRoommates.length === 0 && (
        <EmptyState
          imageSrc="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          imageAlt="No roommates"
          title="No roommates match your search or filters"
          message="Try adjusting your filters or search terms to see more roommates."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      )}
    </div>
  );
};

export default RoommatesPage;
