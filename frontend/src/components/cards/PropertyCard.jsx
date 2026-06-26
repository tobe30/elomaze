import { BadgeCheck, Car, Dumbbell, Heart, MapPin, Star, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  if (typeof price === "string" && price.includes("NGN")) return price;
  if (typeof price === "string" && Number.isNaN(Number(price))) return price;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);
};

const amenityIcons = {
  Wifi,
  WiFi: Wifi,
  Parking: Car,
  Gym: Dumbbell,
};

const PropertyCard = ({
  property,
  variant = "listing",
  isFavorite = false,
  onToggleFavorite,
  to,
}) => {
  // Variants:
  // - "compact" is used by the home page property sections in PropertyGrid.
  // - "featured" is used by the home page FeaturedListing section.
  // - "listing" is the default card for the full PropertyListing page.
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";
  const verified = property.verified || property.isVerified;
  const price = formatPrice(property.price);
  const href = to || `/listing/${property.id}`;

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite?.(property.id);
  };

  //
  if (isCompact) {
    return (
      <Link to={href} className="flex flex-col group cursor-pointer">
        <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 shadow-sm border border-gray-100">
          <img
            src={property.image}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />

          {verified && (
            <div className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <BadgeCheck className="w-3 h-3 text-blue-600" />
              <span className="text-[10px] font-bold text-white uppercase">
                Verified
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2 bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition-all"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        <div className="space-y-0.5 px-1">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[14px] text-gray-900 truncate pr-2">
              {property.title}
            </h3>
            {property.rating && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3 fill-current text-primary" />
                <span className="text-xs font-semibold">{property.rating}</span>
              </div>
            )}
          </div>
          <p className="text-gray-500 text-xs font-medium">
            <span className="font-bold text-gray-900">{price}</span>{" "}
            {property.period}
          </p>
        </div>
      </Link>
    );
  }

  // Default "listing" or "featured" variant

  return (
    <Link
      to={href}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 overflow-hidden group flex flex-col"
    >
      <div className={`relative ${isFeatured ? "h-52" : "aspect-[4/3]"} w-full overflow-hidden`}>
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {property.status || "For Rent"}
        </div>

        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-lg rounded-full p-2 shadow-sm hover:bg-white/60 transition-all duration-300 transform hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-300 hover:text-red-500 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="text-[15px] font-semibold text-gray-900">
          {isFeatured && property.location
            ? `${property.title} - ${property.location}`
            : property.title}
        </h3>

        {!isFeatured && property.location && (
          <div className="flex items-center text-gray-600 text-sm gap-1">
            <MapPin className="w-4 h-4 text-primary" />
            {property.location}
          </div>
        )}

        {!isFeatured && property.amenities?.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mt-1">
            {property.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity];
              return (
                <span key={amenity} className="flex items-center gap-1">
                  {Icon && <Icon className="w-4 h-4 text-primary" />}
                  {amenity}
                </span>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3">
          <p className="text-[17px] font-bold text-black">
            {price}
            <span className="text-gray-500 font-normal text-sm"> /year</span>
          </p>

          {verified && (
            <BadgeCheck className="w-5 h-5 text-white bg-secondary rounded-full" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
