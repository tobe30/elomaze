import React from "react";
import {
  Heart,
  Star,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import { categoryData } from "../assets/assets";

/* =========================
   PROPERTY CARD
========================= */
export const PropertyCard = ({ item, isFavorite, onToggleFavorite }) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <div className="flex flex-col group cursor-pointer">
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden rounded-2xl mb-3 shadow-sm border border-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* VERIFIED BADGE */}
        {item.isVerified && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-blue-600 fill-blue-600/10" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-tight">
              Verified
            </span>
          </div>
        )}

        {/* HEART BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute top-3 right-3 p-2 bg-black/10 backdrop-blur-md rounded-full hover:bg-black/20 transition-all"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* TEXT */}
      <div className="space-y-0.5 px-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[14px] text-gray-900 truncate pr-2">
            {item.title}
          </h3>

          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3 h-3 fill-current text-primary" />
            <span className="text-xs font-semibold">{item.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 text-xs font-medium">
          <span className="font-bold text-gray-900">{formattedPrice}</span>{" "}
          {item.period}
        </p>
      </div>
    </div>
  );
};

/* =========================
   SECTION
========================= */
const PropertySection = ({
  title,
  data,
  categoryKey,
  favorites,
  onToggleFavorite,
}) => {
  const displayItems = data.slice(0, 6);

  return (
    <div className="mb-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-4">
          

          <div className="flex items-center gap-1 group cursor-pointer">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <ChevronRight className="w-6 h-6 mt-1 text-gray-400" />
          </div>
        </div>

        <span className="text-sm font-bold text-gray-900 hover:underline cursor-pointer">
          View all
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {displayItems.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

/* =========================
   MAIN GRID
========================= */
const PropertyGrid = ({ favorites = [], onToggleFavorite = () => {} }) => {
  return (
    <div className="w-full px-4 md:px-12 py-16 bg-white">
      <PropertySection
        title="Top Homes For You"
        categoryKey="tophomes"
        data={categoryData.tophomes || []}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      <PropertySection
        title="Homes Near You"
        categoryKey="nearyou"
        data={categoryData.nearyou || []}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      <PropertySection
        title="Recently Added"
        categoryKey="recent"
        data={categoryData.recent || []}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      <PropertySection
        title="Affordable Homes"
        categoryKey="ahomes"
        data={categoryData.ahomes || []}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default PropertyGrid;
