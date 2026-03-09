import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  CheckCircle,
  Shield,
  MessageCircle,
  Clock,
  Award,
  Users,
  Home,
  Briefcase,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  ThumbsUp,
  ArrowLeft,
  Phone,
  Mail,
  Heart,
  Share2,
  BadgeCheck,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const mockProfiles = {
  "user-1": {
    id: "user-1",
    type: "user",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    role: "User",
    trustScore: 92,
    badge: "Gold",
    verified: true,
    joinedDate: "2024-06-15",
    location: "Lagos, Nigeria",
    bio: "Passionate about finding the perfect living spaces. I love helping others navigate the city and find their ideal home.",
    stats: {
      verifiedDeals: 12,
      avgResponseTime: "15 min",
      avgRating: 4.8,
      totalReviews: 20,
      endorsements: 3,
      questionsAnswered: 45,
      helpfulVotes: 128,
    },
    services: [
      {
        id: 1,
        title: "Room Cleaning Service",
        price: "₦5,000/session",
        rating: 4.9,
        reviews: 15,
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300",
      },
      {
        id: 2,
        title: "Moving Assistance",
        price: "₦15,000/trip",
        rating: 4.7,
        reviews: 8,
        image:
          "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300",
      },
    ],
    roommateListings: [
      {
        id: 1,
        title: "Looking for Female Roommate",
        location: "Lekki Phase 1",
        budget: "₦150,000/month",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300",
      },
    ],
    recentReviews: [
      {
        id: 1,
        author: "Mike O.",
        rating: 5,
        comment: "Super helpful and responsive!",
        date: "2024-12-20",
      },
       {
        id: 2,
        author: "Mike O.",
        rating: 5,
        comment: "Super helpful and responsive!",
        date: "2024-12-20",
      },
    ],
  },
  "agent-1": {
    id: "agent-1",
    type: "agent",
    name: "Daniel Okeke",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    role: "Agent",
    trustScore: 95,
    badge: "Gold",
    verified: true,
    joinedDate: "2023-11-02",
    location: "Abuja, Nigeria",
    bio: "Licensed real estate agent helping people find trusted homes.",
    stats: {
      verifiedDeals: 45,
      avgResponseTime: "10 min",
      avgRating: 4.9,
      totalReviews: 82,
      endorsements: 21,
      questionsAnswered: 120,
      helpfulVotes: 340,
    },
    services: [
  {
    id: 1,
    title: "Property Inspection",
    price: "₦20,000",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300",
  },
  {
    id: 2,
    title: "Rental Documentation",
    price: "₦35,000",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300",
  },
],

    properties: [
      {
        id: 1,
        title: "2 Bedroom Apartment",
        location: "Gwarinpa",
        price: "₦1,200,000/year",
        image:
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300",
      },
    ],
    recentReviews: [],
  },
};

/* ---------------- COMPONENT ---------------- */
function StatCard({ icon, value, label, sub }) {
  return (
    <div className="bg-base-200 rounded-xl p-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <p className="text-lg font-bold leading-tight">{value}</p>
        <p className="text-xs opacity-70">{label}</p>
        {sub && <p className="text-xs opacity-50">{sub}</p>}
      </div>
    </div>
  );
}

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const profile = mockProfiles[id] || mockProfiles["user-1"];
  const isAgent = profile.type === "agent";

  const [expandedStats, setExpandedStats] = useState(false);
  const [tab, setTab] = useState("services");

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    const statsList = [
  {
    icon: <CheckCircle className="text-primary" />,
    value: profile.stats.verifiedDeals,
    label: "Verified Deals",
  },
  {
    icon: <Clock className="text-blue-500" />,
    value: profile.stats.avgResponseTime,
    label: "Avg Response",
  },
  {
    icon: <Star className="text-orange-400" />,
    value: profile.stats.avgRating,
    label: "Rating",
    sub: `from ${profile.stats.totalReviews} reviews`,
  },
  {
    icon: <ThumbsUp className="text-teal-500" />,
    value: profile.stats.endorsements,
    label: "Endorsements",
  },
  {
    icon: <MessageCircle className="text-gray-500" />,
    value: profile.stats.questionsAnswered,
    label: "Questions Answered",
  },
  {
    icon: <ThumbsUp className="text-orange-400" />,
    value: profile.stats.helpfulVotes,
    label: "Helpful Votes",
  },
];

const MAX_VISIBLE_STATS = 4;
const hasExtraStats = statsList.length > MAX_VISIBLE_STATS;


  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm mb-4"
        >
          <ArrowLeft size={16} /> Back
        </button>

{/* PROFILE HEADER */}
<div className="bg-white rounded-2xl shadow border overflow-hidden mb-6">

  {/* Gradient Banner */}
  <div className="h-36 bg-primary" />

  <div className="p-6 pt-0 relative">

    {/* Avatar */}
    <div className="absolute -top-16 left-6">
      <div className="relative">
        <img
          src={profile.avatar}
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
        />
        {profile.verified && (
          <div className="absolute -bottom-1 -right-1 bg-teal-500 p-1.5 rounded-full shadow">
            <BadgeCheck size={18} className="text-white" />
          </div>
        )}
      </div>
    </div>

    {/* Right Icons */}
    <div className="flex justify-end gap-3 pt-4">
      <button className="btn btn-ghost btn-sm btn-circle">
        <Heart size={18} />
      </button>
      <button className="btn btn-ghost btn-sm btn-circle">
        <Share2 size={18} />
      </button>
    </div>

    {/* Profile Content */}
    <div className="mt-10 pl-36">

      {/* Name + Badges */}
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold">{profile.name}</h1>

        <span className="inline-flex items-center gap-1 bg-[#153351] text-white px-3 py-1 rounded-full text-xs font-medium">
          {isAgent ? <Briefcase size={12} /> : <Users size={12} />}
          {isAgent ? "Agent" : "User"}
        </span>

        {profile.verified && (
          <span className="inline-flex items-center gap-1 border border-teal-500 text-teal-600 px-3 py-1 rounded-full text-xs font-medium">
            <BadgeCheck size={12} />
            Verified
          </span>
        )}
      </div>

      {/* Trust */}
      <div className="flex items-center gap-3 mb-2 text-sm">
        <div className="flex items-center gap-1 text-orange-500 font-semibold">
          <Shield size={16} />
          {profile.trustScore}/100
        </div>
        <span className="text-gray-500">Trusted {isAgent ? "Agent" : "User"}</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {profile.location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          Joined {formatDate(profile.joinedDate)}
        </span>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 max-w-xl leading-relaxed mb-6">
        {profile.bio}
      </p>

      {/* Action Buttons (MATCH IMAGE) */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-[#153351] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0f2742] transition">
          <MessageCircle size={16} />
          Message
        </button>

        <button className="flex items-center gap-2 border border-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
          <Phone size={16} />
          Call
        </button>
      </div>

    </div>
  </div>
</div>


{/* Stats & Activity */}
<div className="card bg-base-100 border shadow-sm mb-6">
  {/* Header */}
  <div
    className="flex items-center justify-between px-5 py-4 cursor-pointer"
    onClick={() => hasExtraStats && setExpandedStats(!expandedStats)}
  >
    <h3 className="font-semibold flex items-center gap-2">
      <Star size={18} className="text-orange-400" />
      Stats & Activity
    </h3>

    {hasExtraStats &&
      (expandedStats ? (
        <ChevronUp className="opacity-60" />
      ) : (
        <ChevronDown className="opacity-60" />
      ))}
  </div>

  {/* Content */}
  <div className="px-5 pb-5">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {(expandedStats
        ? statsList
        : statsList.slice(0, MAX_VISIBLE_STATS)
      ).map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  </div>
</div>



        {/* Tabs */}
{/* Segmented Tabs */}
<div className="bg-[#f4f7fb] rounded-xl p-2 mb-6 shadow-sm">
  <div className="grid grid-cols-2 w-full">


    {/* Services */}
    <button
      onClick={() => setTab("services")}
      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition
      ${tab === "services"
        ? "bg-white shadow text-gray-900"
        : "text-gray-500 hover:bg-white/60"}`}
    >
      <Briefcase size={16} />
      Services
    </button>

    {/* Roommates */}
    {!isAgent && (
      <button
        onClick={() => setTab("roommates")}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition
        ${tab === "roommates"
          ? "bg-white shadow text-gray-900"
          : "text-gray-500 hover:bg-white/60"}`}
      >
        <Users size={16} />
        FindRoommate
      </button>
    )}

    {/* Properties */}
    {isAgent && (
      <button
        onClick={() => setTab("properties")}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition
        ${tab === "properties"
          ? "bg-white shadow text-gray-900"
          : "text-gray-500 hover:bg-white/60"}`}
      >
        <Home size={16} />
        Properties
      </button>
    )}

  </div>
</div>



        {/* Services */}
       {tab === "services" && profile.services?.length > 0 && (
  <div className="grid md:grid-cols-3 gap-4">
    {profile.services.map((s) => (
      <div key={s.id} className="card bg-base-200 shadow">
        <img src={s.image} className="h-40 w-full object-cover" />
        <div className="p-3">
          <h4 className="font-semibold">{s.title}</h4>
          <p className="text-primary">{s.price}</p>
        </div>
      </div>
    ))}
  </div>
)}


{!isAgent && tab === "roommates" && (
  <div className="grid md:grid-cols-3 gap-4">
    {profile.roommateListings.map((r) => (
      <div key={r.id} className="card bg-base-200 shadow">
        <img src={r.image} className="h-40 w-full object-cover" />
        <div className="p-3">
          <h4 className="font-semibold">{r.title}</h4>
          <p className="text-sm opacity-70">{r.location}</p>
          <p className="text-primary">{r.budget}</p>
        </div>
      </div>
    ))}
  </div>
)}

{isAgent && tab === "properties" && (
  <div className="grid md:grid-cols-3 gap-4">
    {profile.properties.map((p) => (
      <div key={p.id} className="card bg-base-200 shadow">
        <img src={p.image} className="h-40 w-full object-cover" />
        <div className="p-3">
          <h4 className="font-semibold">{p.title}</h4>
          <p className="text-sm opacity-70">{p.location}</p>
          <p className="text-primary font-semibold">{p.price}</p>
        </div>
      </div>
    ))}
  </div>
)}



       {/* Reviews */}
<div className="bg-white border rounded-xl p-6 mt-8 shadow-sm">

  {/* Header */}
  <div className="flex items-center gap-2 mb-6">
    <MessageCircle className="text-blue-500" size={18} />
    <h3 className="font-semibold text-lg">Recent Reviews</h3>
  </div>

  <div className="space-y-5">

    {profile.recentReviews.map((r, i) => (
      <div key={r.id} className="flex gap-4">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center font-semibold text-gray-700">
          {r.author.charAt(0)}
        </div>

        {/* Content */}
        <div className="flex-1">

          {/* Name + Stars + Date (tight like the image) */}
          <div className="flex items-center gap-3 flex-wrap">

            <div className="font-semibold text-sm">
              {r.author}
            </div>

            <div className="flex text-orange-400">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={12}
                  className={index < r.rating ? "fill-orange-400" : ""}
                />
              ))}
            </div>

            <span className="text-xs text-gray-500">
              {formatDate(r.date)}
            </span>

          </div>

          {/* Comment */}
          <p className="text-sm text-gray-600 mt-1">
            {r.comment}
          </p>

          {/* Divider */}
          {i !== profile.recentReviews.length - 1 && (
            <div className="h-px bg-gray-200 mt-5" />
          )}

        </div>

      </div>
    ))}

  </div>

  {profile.recentReviews.length > 0 && (
    <div className="mt-6 text-center">
      <button className="text-sm text-[#153351] font-medium hover:underline">
        View All Reviews
      </button>
    </div>
  )}

</div>


      </div>
    </div>
  );
}
