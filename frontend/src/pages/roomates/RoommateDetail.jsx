import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Heart, Shield, MessageCircle, Phone, Mail, Share2, Flag, Wallet, Users, Calendar, GraduationCap, MapPin, BadgeCheck, Briefcase, Info } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RoommateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const profiles = [
  {
    id: 1,
    name: "Sarah Chen",
    age: 20,
    school: "MIT Engineering",
    location: "Cambridge, MA",
    bio: "Looking for a neat female roommate near school gate 🏡",
    fullBio: "Hi there! I'm Sarah, a final year Computer Science student at UNILAG. I'm looking for a clean, quiet, and respectful roommate to share an apartment with. I spend most of my time studying or working on coding projects, so I appreciate a peaceful environment. On weekends, I love to cook and sometimes host small study groups. I'm an early riser and keep my space tidy. I'm looking for someone who values cleanliness and respects quiet hours during exams. I'm friendly, easy-going, and always up for a good conversation over tea. If you're a fellow student who appreciates a balanced lifestyle, let's connect!",
    budget: 150000,
    image: "/student-profile.jpg",
    verified: true,
    gender: "female",
    moveInDate: "2025-12-15",
    phone: "123-456-7890",
    email: "sarah@example.com",
    interests: ["Cooking", "Reading", "Sports"],
    preferences: ["Non-smoker", "Pet-friendly"],
  },
  {
    id: 2,
    name: "Marcus Jones",
    age: 22,
    school: "Harvard Business",
    location: "Boston, MA",
    bio: "Easygoing and clean — prefer someone tidy and social.",
    fullBio: "I enjoy sports and movies...",
    budget: 180000,
    image: "/roommate2.jpg",
    verified: true,
    gender: "male",
    moveInDate: "2025-12-01",
    phone: "987-654-3210",
    email: "marcus@example.com",
    interests: ["Sports", "Travel", "Music"],
    preferences: ["Early riser", "Quiet"],
  },
  {
    id: 3,
    name: "Priya Patel",
    age: 21,
    school: "BU Computer Science",
    location: "Boston, MA",
    bio: "Quiet, respectful, and loves cooking together.",
    fullBio: "I am a software student, love coding and cooking...",
    budget: 200000,
    image: "/roommate3.jpg",
    verified: false,
    gender: "female",
    moveInDate: "2026-01-01",
    phone: "555-123-4567",
    email: "priya@example.com",
    interests: ["Coding", "Cooking", "Gaming"],
    preferences: ["No loud music", "Pet-friendly"],
  },
];


  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Roommate not found</h1>
          <button
            onClick={() => navigate("/roommates")}
            className="btn btn-outline btn-primary flex items-center mx-auto gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Roommates
          </button>
        </div>
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleConnect = () => {
    alert(`Connection request sent to ${profile.name}`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile link copied to clipboard!");
  };

  return (
    <>

    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
     <div className="relative pb-24 pt-8 overflow-hidden" style={{ backgroundColor: '#153351' }}>
        {/* Thematic Background - Roommate & Housing Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute -top-20 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-secondary/15 to-transparent blur-3xl" />
            <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-3xl" />
            
            {/* Floating thematic icons - very subtle */}
            <div className="absolute top-20 right-32 opacity-[0.04]">
              <Users className="w-24 h-24 text-white animate-float" />
            </div>
            <div className="absolute bottom-32 left-20 opacity-[0.05]" style={{ animationDelay: '1s' }}>
              <GraduationCap className="w-28 h-28 text-white animate-float" />
            </div>
            <div className="absolute top-1/3 left-1/4 opacity-[0.04]" style={{ animationDelay: '2s' }}>
              <MapPin className="w-20 h-20 text-secondary animate-float" />
            </div>
            <div className="absolute bottom-1/4 right-1/3 opacity-[0.05]" style={{ animationDelay: '1.5s' }}>
              <Heart className="w-16 h-16 text-accent animate-float" />
            </div>
            <div className="absolute top-1/2 right-1/4 opacity-[0.03]" style={{ animationDelay: '0.5s' }}>
              <MessageCircle className="w-20 h-20 text-white animate-float" />
            </div>
            
            {/* House/home silhouettes */}
            <div className="absolute top-1/4 left-1/3 opacity-[0.03]">
              <div className="w-32 h-32 relative animate-float" style={{ animationDelay: '2.5s' }}>
                <div className="absolute bottom-0 w-full h-20 bg-white/10 rounded-sm" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[64px] border-r-[64px] border-b-[40px] border-l-transparent border-r-transparent border-b-white/10" />
              </div>
            </div>
            
            {/* Connection lines - representing networking */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="70%" y1="40%" x2="30%" y2="80%" stroke="white" strokeWidth="1" strokeDasharray="5,5" />
              <circle cx="20%" cy="30%" r="4" fill="white" />
              <circle cx="80%" cy="70%" r="4" fill="white" />
              <circle cx="70%" cy="40%" r="4" fill="white" />
              <circle cx="30%" cy="80%" r="4" fill="white" />
            </svg>
            
            {/* Grid pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
              }}
            />
          </div>

        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate("/roommates")}
            className="btn btn-ghost text-white mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Roommates
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                <img src={profile.image} alt={profile.name} className="object-cover w-full h-full" />
                {!profile.image && (
                  <div className="flex items-center justify-center bg-gray-300 w-full h-full text-3xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              {profile.verified && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                  <BadgeCheck className="w-6 h-6" />
                </div>
              )}
            </div>

            {/* Name & Info */}
            <div className="text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">
                  {profile.name}, {profile.age}
                </h1>
                
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-white/80">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  {profile.school}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white shadow rounded-lg p-4">
              <div className="text-center">
                <Wallet className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-500 mb-1">Budget</p>
                <p className="font-semibold text-sm">₦{profile.budget.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-500 mb-1">Gender</p>
                <p className="font-semibold text-sm">{profile.gender}</p>
              </div>
              <div className="text-center">
                <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-500 mb-1">Move-in</p>
                <p className="font-semibold text-sm">{profile.moveInDate}</p>
              </div>
              <div className="text-center">
                <Briefcase className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-xs text-gray-500 mb-1">Role</p>
                <p className="font-semibold text-sm">{profile.school.split(" ").slice(-1)[0]}</p>
              </div>
            </div>

            {/* About */}
            {/* About */}
                    <div className="bg-white shadow rounded-lg p-6 space-y-1">
  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    <Heart className="w-5 h-5 text-blue-500" />
    About {profile.name.split(" ")[0]}
  </h2>
  {profile.fullBio.split(". ").map((paragraph, idx) => (
    <p key={idx} className="text-gray-700">
      {paragraph}.
    </p>
  ))}
</div>



            {/* Interests & Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="font-semibold mb-4">Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.preferences.map((pref) => (
                    <span key={pref} className="badge text-white py-2 bg-primary">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          {/* Right Column */}
<div className="space-y-6 relative">
  <div className="space-y-6 sticky top-24">
    {/* Connect / Verified Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
      {profile.verified && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 border border-blue-200">
          <Shield className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Verified Profile</p>
            <p className="text-xs text-gray-500">Identity confirmed by Elomaze</p>
          </div>
        </div>
      )}

      <button
        onClick={handleConnect}
        className="btn bg-primary text-white w-full flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Connect with {profile.name.split(" ")[0]}
      </button>

      {/* Contact Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowContact((prev) => !prev)}
          className="w-full flex items-center gap-2 justify-center border border-gray-300 p-2 rounded-lg hover:bg-gray-100"
        >
          <Phone className="w-4 h-4" />
          {showContact ? "Hide Contact" : "Show Contact"}
        </button>
        {showContact && (
          <div className="mt-3 space-y-3">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Agent Phone</p>
              <a 
                href={`tel:${profile.phone}`}
                className="text-lg font-semibold text-primary hover:underline flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {profile.phone}
              </a>
            </div>
            
            <div className="space-y-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Messaging through Elomaze is safer and helps track communication.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Inform the seller you got their number on Elomaze so they know where you came from.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-200">
        <button onClick={handleShare} className="btn btn-ghost flex-1 gap-1.5">
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button className="btn btn-ghost flex-1 gap-1.5 text-red-500 hover:text-red-700">
          <Flag className="w-4 h-4" /> Report
        </button>
      </div>
    </div>

    {/* Safety Tips Card */}
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4 text-primary" /> Safety Tips
      </h3>
      <ul className="text-sm text-gray-500 space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
          <span>Always meet in public places first</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
          <span>Verify their student ID before committing</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
          <span>Trust your instincts and ask questions</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
          <span>Use Elomaze messaging for records</span>
        </li>
      </ul>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
    </>
  );
};

export default RoommateDetail;
