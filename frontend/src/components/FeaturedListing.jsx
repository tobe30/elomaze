import PropertyCard from "./cards/PropertyCard";
import SectionHeader from "./common/SectionHeader";

const listings = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "NGN 450,000",
    image: "/IMG_5146.jpg",
    verified: true,
  },
  {
    id: 2,
    title: "Spacious 2-Bedroom Flat",
    location: "Victoria Island, Lagos",
    price: "NGN 750,000",
    image: "/room2.jpg",
  },
  {
    id: 3,
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: "NGN 1,200,000",
    image: "/room.jpg",
  },
  {
    id: 4,
    title: "Cozy Student Room",
    location: "Yaba, Lagos",
    price: "NGN 280,000",
    image: "/house.jpg",
    verified: true,
  },
];

const FeaturedListings = () => {
  return (
    <section className="px-4 md:px-12 py-8 bg-white">
      <SectionHeader
        title="Top Homes for You"
        subtitle="Discover your perfect accommodation"
        to="/listings"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <PropertyCard key={listing.id} property={listing} variant="featured" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
