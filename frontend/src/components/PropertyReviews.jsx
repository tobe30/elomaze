import { Star, ThumbsUp, Flag, BadgeCheck } from "lucide-react";

const PropertyReviews = ({ propertyId }) => {
  const reviews = [
    {
      id: 1,
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        date: "2024-01-10",
      },
      rating: 5,
      title: "Perfect location and modern amenities",
      content:
        "I lived here for 6 months and absolutely loved it. The apartment is exactly as shown in the photos, with stunning city views. The building management is responsive and helpful. The location is unbeatable - walking distance to everything!",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      author: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        date: "2023-12-28",
      },
      rating: 4,
      title: "Great apartment, minor noise issues",
      content:
        "Beautiful apartment with great natural light. The kitchen is well-equipped and the bedrooms are spacious. Only downside is some street noise during rush hours, but nothing a good pair of curtains can't fix.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      author: {
        name: "David Park",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        date: "2023-11-15",
      },
      rating: 5,
      title: "Highly recommend!",
      content:
        "The agent Sarah was incredibly helpful throughout the entire process. The apartment exceeded my expectations - clean, modern, and the amenities are top-notch. The gym and rooftop access are amazing perks!",
      helpful: 15,
      verified: true,
    },
  ];

  const ratingBreakdown = { 5: 65, 4: 20, 3: 10, 2: 3, 1: 2 };
  const averageRating = 4.7;
  const totalReviews = 47;

  const renderStars = (rating) =>
  Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      className="w-4 h-4"
      fill={i < rating ? "#153351" : "none"} // yellow fill for rated stars
      stroke={i < rating ? "#153351" : "#153351"} // outline color
    />
  ));

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Star className="w-6 h-6 text-primary" />
        Reviews & Ratings
      </h2>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 p-6 rounded-xl bg-gray-100 border border-gray-200">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold text-black mb-2">{averageRating}</div>
          <div className="flex gap-1 mb-2">{renderStars(Math.round(averageRating))}</div>
          <p className="text-gray-500">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {Object.entries(ratingBreakdown)
            .reverse()
            .map(([stars, percentage]) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm w-12 flex items-center gap-1">
                  {stars} <Star className="w-3 h-3 text-primary" />
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500 w-10">{percentage}%</span>
              </div>
            ))}
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Reviews List */}
      <div className="space-y-4">
  {reviews.map((review) => (
    <div
      key={review.id}
      className="p-4 rounded-lg bg-white border border-gray-200 hover:shadow-sm transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img
              src={review.author.avatar}
              alt={review.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>

<div className="flex items-center gap-1">
  <span className="font-medium text-sm">{review.author.name}</span>

  {review.verified && (
    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white">
      <BadgeCheck className="w-3 h-3" />
    </span>
  )}
</div>

            <p className="text-xs text-gray-500">{formatDate(review.author.date)}</p>
          </div>
        </div>
        <div className="flex gap-0.5">{renderStars(review.rating)}</div>
      </div>

      {/* Content */}
      <h4 className="font-medium mb-1 text-sm">{review.title}</h4>
      <p className="text-gray-600 text-sm mb-3">{review.content}</p>

      {/* Actions */}
      <div className="flex items-center gap-3 text-xs">
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-800">
          <ThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-800">
          <Flag className="w-3 h-3" /> Report
        </button>
      </div>
    </div>
  ))}
</div>


      {/* Load More */}
      <div className="text-center">
       <button className="btn min-w-[200px] bg-primary text-white hover:bg-primary/90">
  Show all {totalReviews} reviews
</button>

      </div>
    </div>
  );
};

export default PropertyReviews;
