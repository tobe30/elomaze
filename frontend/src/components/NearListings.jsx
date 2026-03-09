import { Heart, CheckCircle, ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const listings = [
  {
    id: 1,
    title: "Modern Studio Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦450,000",
    image: "/home.jpg",
    verified: true,

  },
  {
    id: 2,
    title: "Spacious 2-Bedroom Flat",
    location: "Victoria Island, Lagos",
    price: "₦750,000",
    image: "/img.jpg",
  },
  {
    id: 3,
    title: "Luxury 3-Bedroom Apartment",
    location: "Banana Island, Lagos",
    price: "₦1,200,000",
    image: "/IMG_4430.jpg",
  },
  {
    id: 4,
    title: "Cozy Student Room",
    location: "Yaba, Lagos",
    price: "₦280,000",
    image: "/men.webp",
    verified: true,

  },

  
];

const NearListings = () => {
  return (
    <section className="px-4 md:px-12 bg-white">
      

<div className="mb-8 flex items-center justify-between">
  <div>
    <h3 className="text-2xl font-bold text-black">Homes Near You</h3>
    <p className="text-gray-500 mt-1 text-[15px]">
      Based on your school or location
    </p>
  </div>

  <Link
          to="/listings"
          className="flex items-center text-sm gap-1 text-primary font-semibold hover:gap-2 transition-all duration-300"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
</div>


      {/* ✅ Mobile = 2 columns, Tablet = 3, Desktop = 4 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 overflow-hidden group flex flex-col"
          >
            {/* ✅ Image hover zoom */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

               {/* ✅ Verified badge */}
              {/* 🏷️ For Rent tag */}
              <div className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                For Rent
              </div>


              {/* ❤️ Animated like button */}
                                     <button
  className="absolute top-3 right-3 bg-white/10 backdrop-blur-lg rounded-full p-2 shadow-sm 
             hover:bg-white/60 transition-all duration-300 transform hover:scale-110 
             animate-in fade-in zoom-in"
>
  <Heart
    className="w-5 h-5 text-gray-300 transition-all duration-300 hover:text-red-500 hover:scale-125 
               animate-pulse hover:animate-bounce"
  />
</button>
            </div>

            {/* ✅ Keep price aligned at the bottom */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2">
                {listing.title} • {listing.location}
              </h3>

              {/* ✅ Price + Verified badge */}
              <div className="flex items-center justify-between mt-auto">
                <p className="text-[16px] font-bold text-black">
                  {listing.price}
                  <span className="text-gray-500 font-normal text-sm"> /year</span>
                </p>

                {listing.verified && (
            <div className="flex items-center gap-0.5 sm:gap-1 rounded-full bg-blue-500">
                <BadgeCheck className="w-5 text-white h-5 sm:w-5 sm:h-5 font-bold" />
               
            </div>
            )}

              </div>
              
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearListings;
