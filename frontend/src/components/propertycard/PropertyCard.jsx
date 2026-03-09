import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // for verified icon

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/listing/${property.id}`} className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden transition relative">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      
      {/* Verified badge */}
      {property.verified && (
        <div className="absolute top-3 left-3 bg-white/80 p-1 rounded-full">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <p className="mt-2 font-bold text-gray-800">{property.price}</p>
      </div>
    </Link>
  );
};

export default PropertyCard;
