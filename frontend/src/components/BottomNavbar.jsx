import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Compass, PlusCircle, MessageSquare, UserRound } from "lucide-react";

const BottomNavbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down → hide
        setVisible(false);
      } else {
        // Scrolling up → show
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-14 md:hidden z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        to="/"
        className="flex flex-col items-center text-gray-600 hover:text-primary transition"
      >
        <Home className="size-5" />
        <span className="text-[11px]">Home</span>
      </Link>

      <Link
        to="/explore"
        className="flex flex-col items-center text-gray-600 hover:text-primary transition"
      >
        <Compass className="size-5" />
        <span className="text-[11px]">Explore</span>
      </Link>

      <Link
        to="/post"
        className="flex flex-col items-center text-primary transition scale-110"
      >
        <PlusCircle className="size-7" />
        <span className="text-[11px] font-medium">Post</span>
      </Link>

      <Link
        to="/community"
        className="flex flex-col items-center text-gray-600 hover:text-primary transition"
      >
        <MessageSquare className="size-5" />
        <span className="text-[11px]">Community</span>
      </Link>

      <Link
        to="/profile"
        className="flex flex-col items-center text-gray-600 hover:text-primary transition"
      >
        <UserRound className="size-5" />
        <span className="text-[11px]">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
