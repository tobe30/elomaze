import { useState } from "react";
import {
  MapPin,
  Shield,
  Edit,
  Settings,
  ThumbsUp,
  Trash2,
  Plus,
  Pause,
  Play,
  Eye,
  CheckCircle,
  MessageSquare,
  Bookmark,
  Briefcase,
  Lock,
  Bell,
  UserX,
  BadgeCheck,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../../lib/api";
import ProfileCompletionBanner from "../../components/banners/ProfileCompletionBanner";
import { isProfileComplete } from "../../utils/profile";

/* ---------------- MOCK DATA - KEPT FOR REFERENCE ---------------- */
// This is kept only for other sections like posts, services, etc.
// User data is fetched from API

const mockPosts = [
  {
    id: 1,
    title: "Best areas to rent in Lagos Mainland?",
    tag: "Housing",
    likes: 24,
    upvotes: 24,
    status: "answered",
    date: "2024-01-10",
    answers: 8,
  },
  {
    id: 2,
    title: "Recommended movers for interstate relocation",
    tag: "Services",
    likes: 24,
    upvotes: 12,
    status: "unanswered",
    answers: 8,
    date: "2024-01-08",
  },
];

const mockServices = [
  {
    id: 1,
    name: "Property Inspection",
    price: "₦15,000",
    status: "active",
    bookings: 8,
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    name: "Document Verification",
    price: "₦25,000",
    status: "paused",
    bookings: 3,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
  },
];

const mockListings = [
  {
    id: 1,
    title: "Modern 3 Bedroom Apartment",
    location: "Lekki Phase 1",
    views: 245,
    price: "₦2.5M/year",
    status: "available",
    coverImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
  },
];

const mockSaved = {
  posts: [
    {
      id: 1,
      title: "Best areas to rent in Lagos Mainland?",
      tag: "Housing",
    },
    {
      id: 2,
      title: "Trusted agents around FUNAI",
      tag: "Agents",
    },
  ],

  services: [
    {
      id: 1,
      name: "House Inspection",
      provider: "John Doe",
      price: "₦15,000",
      coverImage:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    },
  ],

  listings: [
    {
      id: 1,
      title: "Modern 2 Bedroom Apartment",
      location: "Abakaliki",
      price: "₦1.2M/year",
      coverImage:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    },
  ],
};


/* ---------------- COMPONENT ---------------- */

export default function MyProfile() {
  const [tab, setTab] = useState("about");
  const [savedSubTab, setSavedSubTab] = useState("posts");

  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
  });

  const user = data?.user || data;

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3 bg-base-100">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-base-300"></div>
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-sm text-base-content/60 animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">Could not load user profile</p>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const userLocation = user.locationPreference
    ? `${user.locationPreference.city || ""}, ${user.locationPreference.state || ""}, ${user.locationPreference.country || ""}`.replace(/,\s*,/g, ",").replace(/,\s*$/, "")
    : "Not specified";

  return (
    <div className="min-h-screen bg-base-200">
      {user && !isProfileComplete(user) && <ProfileCompletionBanner />}
      
      <div className="max-w-6xl mx-auto p-4">
{/* PROFILE HEADER */}
<div className="relative bg-white border border-slate-200 rounded-2xl shadow-sm mb-6 px-6 py-6 min-h-[160px]">

  {/* LEFT */}
  <div className="flex items-center gap-4">
    <div className="w-14 h-14 rounded-full overflow-hidden border border-slate-200">
      <img
        src={user.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"}
        alt={user.firstName || "User"}
        className="w-full h-full object-cover"
      />
    </div>

    <div>
      <div className="flex items-center gap-2">
  <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-1">
    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
    {user.isVerified && (
      <div className="flex items-center justify-center bg-blue-500 rounded-full w-4 h-4 sm:w-5 sm:h-5">
        <BadgeCheck className="text-white w-3 h-3 sm:w-4 sm:h-4" />
      </div>
    )}
  </h2>
</div>

      <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
        <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium">
          {user.role || "User"}
        </span>

        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-primary" />
          {userLocation}
        </span>
      </div>
    </div>
  </div>

  {/* RIGHT — FORCED TO BOTTOM */}
  {/* ACTIONS */}
<div
  className="
    mt-6
    flex items-center gap-3
    sm:mt-0
    sm:absolute sm:bottom-6 sm:right-6
  "
>
  <button
    className="
      flex-1 sm:flex-none
      flex items-center justify-center gap-2
      px-3 h-9
      rounded-lg
      bg-primary text-white text-sm font-medium
      hover:bg-slate-800 transition
    "
  >
    <Edit className="w-4 h-4" />
    Edit Profile
  </button>

  <button
    className="
      w-11 h-11
      flex items-center justify-center
      rounded-xl border border-slate-200
      hover:bg-slate-100 transition
    "
  >
    <Settings className="w-5 h-5 text-slate-600" />
  </button>
</div>


</div>


        {/* TABS */}
        {/* PROFILE NAV TABS */}
<div className="border-b border-gray-200 mb-6">
  <div className="flex gap-7 overflow-x-auto text-sm font-medium">
    {[
      { key: "about", label: "About" },
      { key: "posts", label: "Posts" },
      { key: "services", label: "Services" },
      { key: "listings", label: "Listings" },
      { key: "saved", label: "Saved" },
    ].map((item) => (
      <button
        key={item.key}
        onClick={() => setTab(item.key)}
        className={`pb-3 whitespace-nowrap border-b-2 transition-colors ${
          tab === item.key
            ? "border-primary text-primary"
            : "border-transparent text-gray-500 hover:text-gray-800"
        }`}
      >
        {item.label}
      </button>
    ))}
  </div>
</div>


       {/* ABOUT */}
{tab === "about" && (
  <div className="bg-white rounded-lg border border-gray-200">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4">
      <h3 className="text-sm font-semibold text-gray-900">
        Profile Information
      </h3>

      <button className="btn btn-ghost btn-sm gap-1 text-primary">
        <Edit className="w-4 h-4" />
        Edit
      </button>
    </div>

    <div className="border-t border-gray-200" />

    {/* Content */}
    <div className="px-6 py-5 space-y-6">

      {/* Bio */}
      <div>
        <p className="text-sm text-gray-600 leading-relaxed">
          {user.bio || "No bio added yet"}
        </p>
      </div>

      <div className="border-t border-gray-200" />

      {/* Details */}
      <div className="grid sm:grid-cols-2 gap-y-5 gap-x-10 text-sm">
        <div>
          <p className="text-gray-400 text-xs mb-1">Email</p>
          <p className="text-gray-800">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">Phone</p>
          <p className="text-gray-800">{user.phone || "Not added"}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">Location</p>
          <p className="text-gray-800">{userLocation}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">Member since</p>
          <p className="text-gray-800">
            {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
    </div>
  </div>
)}


        {/* COMMUNITY POSTS */}
{tab === "posts" && (
  <div className="mt-4 sm:mt-6">
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-medium text-gray-900">Your Posts</h2>
        <button className="px-3 py-1 sm:px-4 sm:py-2 text-sm bg-primary text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-1">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Post</span>
        </button>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200 p-3 sm:p-4">
        {mockPosts.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-gray-400">
            <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm sm:text-base">You haven't created any posts yet</p>
          </div>
        ) : (
          mockPosts.map((post) => {
            const postDate = new Date(post.date);
            const shortDate = postDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={post.id}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
              >
                {/* Post Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{post.title}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{post.tag}</span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.answers}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "answered"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.status === "answered" ? "Answered" : "Unanswered"}
                    </span>
                    <span className="text-gray-400">{shortDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="flex items-center justify-center w-7 h-7 text-gray-600 hover:text-gray-900 transition rounded-full">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center justify-center w-7 h-7 text-red-500 hover:text-red-700 transition rounded-full">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  </div>
)}


        {/* SERVICES */}
{tab === "services" && (
  <div className="space-y-4">

    {/* Header */}
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-gray-900">
        Your Services
      </h2>

      <button className="btn bg-primary text-white btn-sm gap-1">
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Add Service</span>
        <span className="sm:hidden">Add</span>
      </button>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {mockServices.map((service) => (
        <div
          key={service.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition"
        >
          {/* Cover Image */}
          {service.coverImage && (
            <div className="relative w-full aspect-[16/10]">
              <img
                src={service.coverImage}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-4">
            {/* Top */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-sm text-gray-900">
                {service.name}
              </h3>

              {/* Status */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  service.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {service.status === "active" ? "Active" : "Paused"}
              </span>
            </div>

            {/* Price */}
            <p className="text-primary font-semibold mb-1">
              {service.price}
            </p>

            {/* Meta */}
            <p className="text-xs text-gray-500 mb-3">
              {service.bookings} bookings
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="btn btn-outline border border-gray-200 btn-sm flex-1 gap-1">
                <Edit className="w-3 h-3" />
                Edit
              </button>

              <button className="btn btn-outline border border-gray-200 btn-sm flex-1 gap-1">
                {service.status === "active" ? (
                  <>
                    <Pause className="w-3 h-3" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}



      
        {/* MY LISTINGS (AGENT ONLY) */}
{tab === "listings" && mockUser.role === "agent" && (
  <div className="space-y-4">

    {/* Header */}
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium text-gray-900">
        Your Listings
      </h2>

      <button className="btn bg-primary text-white btn-sm gap-1">
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Add Listing</span>
        <span className="sm:hidden">Add</span>
      </button>
    </div>

    {/* Listings Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockListings.map((listing) => (
        <div
          key={listing.id}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition"
        >

          {/* Image */}
          <div className="relative aspect-[16/10]">
            <img
              src={listing.coverImage}
              alt={listing.title}
              className="w-full h-full object-cover"
            />

            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                listing.status === "available"
                  ? "bg-primary text-white"
                  : "bg-primary text-gray-600"
              }`}
            >
              {listing.status === "available" ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-medium text-sm mb-1 truncate">
              {listing.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {listing.location}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {listing.views}
              </span>
            </div>

            <p className="text-primary font-semibold mb-3">
              {listing.price}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="btn btn-outline border border-gray-200 btn-sm flex-1 gap-1">
                <Edit className="w-3 h-3" />
                Edit
              </button>

              <button className="btn btn-outline border border-gray-200 btn-sm flex-1 gap-1">
                {listing.status === "available" ? (
                  <>
                    <Pause className="w-3 h-3" />
                    Pause
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Activate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        {/* SAVED */}
{tab === "saved" && (
  <div className="bg-white border border-gray-200 rounded-xl">

    {/* Saved Sub Tabs */}
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex min-w-max">
        {["posts", "services", "listings"].map((item) => (
          <button
            key={item}
            onClick={() => setSavedSubTab(item)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              savedSubTab === item
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {item === "posts"
              ? "Posts"
              : item === "services"
              ? "Services"
              : "Listings"}
          </button>
        ))}
      </div>
    </div>

    {/* Content */}
    <div className="p-4">

      {/* SAVED POSTS */}
      {savedSubTab === "posts" && (
        <div className="divide-y">
          {mockSaved.posts.map((post) => (
            <div
              key={post.id}
              className="py-3 flex items-center justify-between"
            >
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">
                  {post.title}
                </p>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full border border-gray-300 text-gray-600">
                  {post.tag}
                </span>
              </div>

              <button className="btn btn-ghost btn-sm">
                <Bookmark className="w-4 h-4 fill-current text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SAVED SERVICES */}
      {savedSubTab === "services" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockSaved.services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition"
            >
              <div className="relative aspect-[16/10]">
                <img
                  src={service.coverImage}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 btn btn-xs btn-ghost bg-white/80">
                  <Bookmark className="w-4 h-4 fill-current text-primary" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-xs text-gray-500">
                  by {service.provider}
                </p>
                <p className="text-primary font-semibold mt-1">
                  {service.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SAVED LISTINGS */}
      {savedSubTab === "listings" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockSaved.listings.map((listing) => (
            <div
              key={listing.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition"
            >
              <div className="relative aspect-[16/10]">
                <img
                  src={listing.coverImage}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 btn btn-xs btn-ghost bg-white/80">
                  <Bookmark className="w-4 h-4 fill-current text-primary" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-medium">{listing.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {listing.location}
                </p>
                <p className="text-primary font-semibold mt-1">
                  {listing.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


       
      </div>
    </div>
  );
}
