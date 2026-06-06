import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  HelpCircle,
  BookOpen,
  Info,
  UserRound,
  Settings,
  LogOut,
  User,
  MessageCircleMore,
} from "lucide-react";
import BottomNavbar from "./BottomNavbar";
import ListYourSpaceModal from "./modals/ListYourSpaceModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // replace with real auth
  const navigate = useNavigate()
  const [listModalOpen, setListModalOpen] = useState(false);



  return (
    <>
      {/* ===== DESKTOP / TABLET NAVBAR ===== */}
      <div className="hidden md:flex w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 w-full">
          
          {/* LEFT: Logo */}
            <div className="flex-shrink-0">
            <img
              onClick={() => navigate('/')}
              src="/Elomaze-logo3.png"
              alt="Elomaze Logo"
              className="w-28 sm:w-32 md:w-40 lg:w-48 xl:w-56 cursor-pointer"
            />
          </div>

          {/* CENTER: Main Links */}
          <div className="flex-1 flex justify-center gap-10 flex-wrap font-medium text-black">
            <Link to="/listings" className="hover:text-primary transition">
              Listings
            </Link>
            <Link to="/community" className="hover:text-primary transition">
              Community
            </Link>
            <Link to="/services" className="hover:text-primary transition">
              Services
            </Link>
          </div>

          {/* RIGHT: Links / Profile / Menu */}
          <div className="flex items-center gap-4 flex-shrink-0 relative">
           <button
              onClick={() => setListModalOpen(true)}
              className="hover:text-primary transition"
            >
              List Your Space
            </button>


            {isLoggedIn ? (
              <img
                src="/elomaze-hero.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <>
                <span className="text-primary">|</span>
                <Link to="/signin" className="hover:text-primary transition">
                  Sign In
                </Link>
              </>
            )}

            {/* Dropdown Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {open && (
              <div className="absolute right-0 top-14 bg-white shadow-xl rounded-lg w-52 sm:w-56 py-2 z-50 border border-gray-100">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <User className="w-4 h-4 text-primary" />
                      My Profile
                    </Link>
                     <Link
                      to="/messages"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <MessageCircleMore className="w-4 h-4 text-primary" />
                      Messages
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <Settings className="w-4 h-4 text-primary" />
                      Account Settings
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <Link
                      to="/help"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <HelpCircle className="w-4 h-4 text-primary" />
                      Help Center
                    </Link>
                    <Link
                      to="/blog"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      Blog
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <Info className="w-4 h-4 text-primary" />
                      About Us
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      <LogOut className="w-4 h-4 text-primary" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/help"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <HelpCircle className="w-4 h-4 text-primary" />
                      Help Center
                    </Link>
                    <Link
                      to="/blog"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      Blog
                    </Link>
                    <Link
                      to="/about"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <Info className="w-4 h-4 text-primary" />
                      About Us
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <Link
                      to="/signin"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      <UserRound className="w-4 h-4 text-primary" />
                      Login / Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MOBILE NAVBAR ===== */}
      <div className="md:hidden fixed  top-0  left-0 right-0 bg-white shadow-md flex justify-between items-center px-4 h-12 z-50">
        {/* Logo */}
        <img src="/elomaze-logo.png" alt="Elomaze Logo" className="w-28" />

        {/* Right: Profile or Menu */}
        <div className="flex items-center gap-3 relative">
          {isLoggedIn ? (
            <img
              src="/elomaze-hero.jpg"
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <div className="flex items-center gap-3 text-sm font-medium">
              <Link
                to="/list-space"
                className="text-gray-700 hover:text-primary transition"
              >
                List
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/signin" className="text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          )}

          {/* Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition ml-1"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-14 bg-white shadow-xl rounded-lg w-52 sm:w-56 py-2 z-50 border border-gray-100">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <User className="w-4 h-4 text-primary" />
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-primary" />
                    Account Settings
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <Link
                    to="/help"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <HelpCircle className="w-4 h-4 text-primary" />
                    Help Center
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <BookOpen className="w-4 h-4 text-primary" />
                    Blog
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Info className="w-4 h-4 text-primary" />
                    About Us
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <LogOut className="w-4 h-4 text-primary" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/help"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <HelpCircle className="w-4 h-4 text-primary" />
                    Help Center
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <BookOpen className="w-4 h-4 text-primary" />
                    Blog
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <Info className="w-4 h-4 text-primary" />
                    About Us
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <Link
                    to="/signin"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setOpen(false)}
                  >
                    <UserRound className="w-4 h-4 text-primary" />
                    Login / Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>


      <BottomNavbar />
      <ListYourSpaceModal open={listModalOpen} onOpenChange={setListModalOpen} />

    </>
  );
};

export default Navbar;
