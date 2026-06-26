import { categoryData } from "../assets/assets";
import PropertyCard from "./cards/PropertyCard";
import SectionHeader from "./common/SectionHeader";

const PropertySection = ({ title, data, favorites, onToggleFavorite }) => {
  const displayItems = data.slice(0, 6);

  return (
    <div className="mb-16">
      <SectionHeader title={title} compact />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {displayItems.map((item) => (
          <PropertyCard
            key={item.id}
            property={item}
            variant="compact"
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

const sections = [
  ["Top Homes For You", "tophomes"],
  ["Homes Near You", "nearyou"],
  ["Recently Added", "recent"],
  ["Affordable Homes", "ahomes"],
];

const PropertyGrid = ({ favorites = [], onToggleFavorite = () => {} }) => {
  return (
    <div className="w-full px-4 md:px-12 py-16 bg-white">
      {sections.map(([title, key]) => (
        <PropertySection
          key={key}
          title={title}
          data={categoryData[key] || []}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
