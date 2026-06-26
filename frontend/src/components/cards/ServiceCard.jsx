import { BadgeCheck, Clock, MapPin, Star, Users } from "lucide-react";

const ServiceCard = ({ provider, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow hover:shadow-lg transition cursor-pointer"
    >
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

        {provider.views && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            <Users className="w-3.5 h-3.5" />
            <span>{provider.views} views</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-[16px] font-semibold text-black">{provider.name}</h3>
        <p className="text-[13px] text-gray-600 mb-2">{provider.category}</p>
        <p className="text-sm text-gray-500 mb-4">{provider.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-sm text-gray-500">
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

        <div>
          <span className="text-sm text-gray-500">Starting at</span>
          <p className="text-[17px] font-bold text-black">
            {provider.hourlyRate}/hr
          </p>
        </div>
      </div>
    </button>
  );
};

export default ServiceCard;
