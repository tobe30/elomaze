import { useRef, useState, useEffect } from "react";
import { Heart, CheckCircle, MapPin, GraduationCap, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const roommates = [
  {
    id: 1,
    name: "Sarah Chen",
    school: "MIT Engineering",
    location: "Cambridge, MA",
    bio: "Looking for a neat female roommate near school gate 🏡",
    budget: "₦150k - ₦200k",
    preference: "male",
    image: "/student-profile.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Jones",
    school: "Harvard Business",
    location: "Boston, MA",
    bio: "Easygoing and clean — prefer someone tidy and social.",
    budget: "₦150k - ₦200k",
    preference: "female",
    image: "/fair.jpg", 
    verified: true,
  },
  {
     id: 3,
    name: "Priya Patel",
    school: "BU Computer Science",
    location: "Boston, MA",
    bio: "Quiet, respectful, and loves cooking together.",
    budget: "₦150k - ₦200k",
    preference: "female",
    image: "/daek.jpg", 
    verified: true,
  },
  {
    id: 4,
    name: "Daniel Smith",
    school: "Stanford Business",
    location: "California, USA",
    bio: "Clean, focused, and friendly roommate wanted.",
    budget: "₦180k - ₦250k",
    preference: "female",
    image: "/dark.jpg", 
    verified: true,
  },
];

const FindRoommates = () => {
  const containerRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Pointer (mouse + touch) handlers
    const onPointerDown = (e) => {
      isDownRef.current = true;
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      scrollLeftRef.current = el.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (!isDownRef.current) return;
      // prevent selecting text while dragging
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startXRef.current) * 1.2; // scroll speed
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const onPointerUp = (e) => {
      isDownRef.current = false;
      setIsDragging(false);
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <section className="px-4 md:px-12 py-12 bg-[#fafafa]">
      {/* inline css to hide native scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-black">
            Match with Roommates
          </h3>
          <p className="text-gray-500 mt-1 text-[15px]">
           Your vibe. Your space. Your budget
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

      {/* Horizontal Scroll Section */}
      <div
        ref={containerRef}
  className={`flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scroll-smooth select-none ${
    isDragging ? "cursor-grabbing" : "cursor-grab"
  }`}
  style={{
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch", // adds iOS smoothness
  }}
      >
       {roommates.map((person) => (
          <div
            key={person.id}
            className="min-w-[300px] sm:min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col snap-start"
          >
            {/* Top */}
            <div className="flex items-start gap-4 mb-4 relative">
              <div className="relative">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                {person.verified && (
                  <CheckCircle className="w-5 h-5 text-blue-600 absolute -top-2 -right-2 bg-white rounded-full p-[2px]" />
                )}
              </div>

              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">
                  {person.name}
                </span>

                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  {person.school}
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  {person.location}
                </div>
              </div>

              <button className="text-gray-400 hover:text-red-500 transition">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="border-t border-gray-100 my-3"></div>

            {/* Budget */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-gray-900">
                {person.budget}
              </span>
              <span className="text-sm text-gray-500">/budget</span>
            </div>

            {/* Bio */}
            <p className="text-gray-600 text-sm mb-5 flex-grow">
              {person.bio}
            </p>

            {/* Button */}
            <button className="w-full rounded-xl bg-primary text-white py-2 flex items-center justify-center gap-2 hover:bg-blue-500 transition mt-auto">
                <MessageCircle className="w-5 h-5" />
              Message
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FindRoommates;
