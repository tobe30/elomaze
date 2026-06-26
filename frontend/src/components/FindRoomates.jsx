import { useEffect, useRef, useState } from "react";
import RoommateCard from "./cards/RoommateCard";
import SectionHeader from "./common/SectionHeader";

const roommates = [
  {
    id: 1,
    name: "Sarah Chen",
    school: "MIT Engineering",
    location: "Cambridge, MA",
    bio: "Looking for a neat female roommate near school gate",
    budget: "NGN 150k - NGN 200k",
    preference: "male",
    image: "/student-profile.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Jones",
    school: "Harvard Business",
    location: "Boston, MA",
    bio: "Easygoing and clean, prefer someone tidy and social.",
    budget: "NGN 150k - NGN 200k",
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
    budget: "NGN 150k - NGN 200k",
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
    budget: "NGN 180k - NGN 250k",
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

    const onPointerDown = (event) => {
      isDownRef.current = true;
      setIsDragging(true);
      el.setPointerCapture(event.pointerId);
      startXRef.current = event.clientX;
      scrollLeftRef.current = el.scrollLeft;
    };

    const onPointerMove = (event) => {
      if (!isDownRef.current) return;
      event.preventDefault();
      const walk = (event.clientX - startXRef.current) * 1.2;
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const onPointerUp = (event) => {
      isDownRef.current = false;
      setIsDragging(false);
      try {
        el.releasePointerCapture(event.pointerId);
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
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <SectionHeader
        title="Match with Roommates"
        subtitle="Your vibe. Your space. Your budget"
        to="/roomates"
      />

      <div
        ref={containerRef}
        className={`flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scroll-smooth select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {roommates.map((person) => (
          <RoommateCard key={person.id} person={person} variant="carousel" />
        ))}
      </div>
    </section>
  );
};

export default FindRoommates;
