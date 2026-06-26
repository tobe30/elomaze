import { BadgeCheck, Briefcase, GraduationCap, Heart, MapPin, MessageCircle, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const formatBudget = (budget) => {
  if (typeof budget === "string") return budget;
  return `NGN ${Number(budget || 0).toLocaleString()}`;
};

const RoommateCard = ({ person, variant = "grid", to }) => {
  const isCarousel = variant === "carousel";
  const href = to || `/roommates/${person.id}`;
  const containerClass = isCarousel
    ? "min-w-[300px] sm:min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col snap-start"
    : "bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col";

  const handleActionClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const content = (
    <>
      <div className="flex items-start gap-4 mb-4 relative">
        <div className="relative">
          <img
            src={person.image}
            alt={person.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          {person.verified && (
            <BadgeCheck className="w-5 h-5 text-white absolute -top-2 -right-2 bg-blue-500 rounded-full p-[2px]" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <span className="font-semibold text-gray-900 block">{person.name}</span>

          <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
            {isCarousel ? (
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
            ) : (
              <Briefcase className="w-4 h-4 text-primary shrink-0" />
            )}
            <span className="truncate">{person.school}</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="truncate">{person.location}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleActionClick}
          className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      <div className="border-t border-gray-100 my-3" />

      <div className={isCarousel ? "flex items-center gap-2 mb-3" : "flex items-center gap-2 mb-4 p-3 rounded-lg bg-muted/50 border border-border/50"}>
        {!isCarousel && <Wallet className="w-4 h-4 text-primary" />}
        {!isCarousel && <span className="text-sm text-muted-foreground">Budget:</span>}
        <span className="font-semibold text-gray-900">{formatBudget(person.budget)}</span>
        <span className="text-sm text-gray-500">{isCarousel ? "/budget" : "/year"}</span>
      </div>

      <p className="text-gray-600 text-sm mb-5 flex-grow">{person.bio}</p>

      <button
        type="button"
        onClick={handleActionClick}
        className="btn w-full rounded-xl bg-primary text-white hover:bg-blue-500 transition-all duration-300 border-0 mt-auto flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-5 h-5" />
        Message
      </button>
    </>
  );

  if (isCarousel) {
    return <div className={containerClass}>{content}</div>;
  }

  return (
    <Link to={href} className={containerClass}>
      {content}
    </Link>
  );
};

export default RoommateCard;
