import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Laundry & Dry Cleaning",
    provider: "by Elomaze Laundry",
    price: "₦1,500",
    duration: "/load",
    image: "/service.png",
    rating: 1.2,
  },
  {
    id: 2,
    title: "Expert Plumbing Services",
    provider: "by Ade’s Services",
    price: "₦8,000",
    duration: "/hr",
    image: "/eee.webp",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Room Cleaning Service",
    provider: "by Campus Cleaners",
    price: "₦2,000",
    duration: "/room",
    image: "/e.webp",
    rating: 4.9,
  },

  {
    id: 4,
    title: "Laundry & Dry Cleaning",
    provider: "by Elomaze Laundry",
    price: "₦1,500",
    duration: "/load",
    image: "/service.png",
    rating: 1.2,
  },
  {
    id: 5,
    title: "Expert Plumbing Services",
    provider: "by Ade’s Services",
    price: "₦8,000",
    duration: "/hr",
    image: "/eee.webp",
    rating: 4.7,
  },
  {
    id: 6,
    title: "Room Cleaning Service",
    provider: "by Campus Cleaners",
    price: "₦2,000",
    duration: "/room",
    image: "/e.webp",
    rating: 4.9,
  },

];

const ServiceSection = () => {
  return (
    <section className="px-4 md:px-12 py-12 bg-[#fafafa]">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-bold text-[#15324f]">
            Top Local Services
          </h3>
          <p className="text-gray-600 mt-1 text-[15px]">
            Book trusted services around your area
          </p>
        </div>

        <Link
          to="/services"
          className="flex items-center text-sm gap-1 text-primary font-semibold hover:gap-2 transition-all duration-300"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 
                       shadow-[0_8px_24px_rgba(21,50,79,0.15)] hover:shadow-[0_10px_30px_rgba(21,50,79,0.25)] 
                       transition duration-500"
          >
            {/* Image */}
<div className="relative h-56 w-full overflow-hidden flex items-center justify-center bg-[#f9fafb]">
  <img
    src={service.image}
    alt={service.title}
    className="w-full h-full object-cover object-center rounded-t-2xl transition-transform duration-500 hover:scale-110"
  />

              {/* Price Tag */}
              <div className="absolute top-3 right-3 bg-[#15324f] text-white text-[13px] font-semibold px-3 py-1 rounded-full shadow-md">
                {service.price}
                <span className="text-[12px] font-normal">{service.duration}</span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-3 left-3  bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{service.rating}k reviews</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-[16px] font-semibold text-[#15324f] leading-snug">
                {service.title}
              </h3>
              <p className="text-[13px] text-gray-600 mt-1">{service.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
