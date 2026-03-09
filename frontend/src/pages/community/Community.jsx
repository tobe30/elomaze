import { useState } from "react";
import { 
  Search, ThumbsUp, MessageCircle, MapPin, Clock, Eye,
  CheckCircle, ChevronDown, Users, Award, Compass, Route, Map, Plus, Share2, Bookmark,
  NavigationIcon,
  ThumbsDown,
  BadgeCheck,
  X
} from "lucide-react";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedQuestions, setExpandedQuestions] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [votedQuestions, setVotedQuestions] = useState({});
  const [openAskModal, setOpenAskModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [openCommentsModal, setOpenCommentsModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [votedAnswers, setVotedAnswers] = useState({});
  const [commentInputs, setCommentInputs] = useState({}); // <-- add this

const handleAnswerVote = (answerId, voteType) => {
  setVotedAnswers(prev => {
    const currentVote = prev[answerId];
    if (currentVote === voteType) return { ...prev, [answerId]: null };
    return { ...prev, [answerId]: voteType };
  });
};

  const categories = ["All", "Navigation", "Housing", "Safety", "Recommendations", "Local Events"];

  
  const availableTags = [
    "Directions", "Transport", "Lagos", "Safety", "Housing", 
    "Food", "Nightlife", "Shopping", "University", "Parking",
    "Traffic", "Shortcuts", "Public Transit", "Walking Routes"
  ];


  const initialQuestions = [
    {
      id: 1,
      author: "Jessica Martinez",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      verified: true,
      location: "Downtown",
      question: "What's the fastest route from Tech Park to University during rush hour?",
      description: "I commute daily and want to avoid traffic. Looking for shortcuts or alternative routes that save time.",
      upvotes: 156,
      views: 1240,
      category: "Navigation",
      timeAgo: "2 hours ago",
      hasMap: true,
      tags: ["Directions", "Traffic", "Shortcuts"],
      allAnswers: [
        {
          id: 1,
          author: "Alex Kumar",
          authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          verified: true,
          text: "Take the East Boulevard route via 5th Street - it bypasses the main intersection and saves about 15 minutes during peak hours.",
          upvotes: 89,
          downvotes: 3,
          timeAgo: "1 hour ago",
          isTrusted: true,
        },
        {
          id: 2,
          author: "Alex Kumar",
          authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          verified: true,
          text: "Take the East Boulevard route via 5th Street - it bypasses the main intersection and saves about 15 minutes during peak hours.",
          upvotes: 89,
          downvotes: 3,
          timeAgo: "1 hour ago",
          isTrusted: true,
        },
      ],
      
    },
    // Add other questions here...
  ];

  const [questions, setQuestions] = useState(initialQuestions);

  const toggleExpanded = (id) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]
    );
  };
  const toggleTag = (tag) => {
  setSelectedTags((prev) =>
    prev.includes(tag)
      ? prev.filter((t) => t !== tag)
      : [...prev, tag]
  );
};

  const toggleSaveQuestion = (id) => {
    setSavedQuestions(prev =>
      prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]
    );
  };

  const handleQuestionUpvote = (id) => {
    setVotedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

    const topContributors = [
    { 
      name: "Alex Kumar", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      points: 2450, 
      answers: 127, 
      badge: "Local Expert",
      verified: true
    },
    { 
      name: "Lisa Park", 
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      points: 1890, 
      answers: 98, 
      badge: "Navigation Pro",
      verified: true
    },
    { 
      name: "Ryan Foster", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      points: 1620, 
      answers: 84, 
      badge: "Community Guide",
      verified: false
    },
    { 
      name: "Sarah Adams", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      points: 1450, 
      answers: 72, 
      badge: "Helpful Neighbor",
      verified: true
    },
  ];
  const filteredQuestions = questions.filter(q => 
    (q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     q.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeCategory === "All" || q.category === activeCategory)
  );

  const handleCommentSubmit = (questionId) => {
  const commentText = commentInputs[questionId]?.trim();
  if (!commentText) return;

  // Create a temporary answer
  const newAnswer = {
    id: Date.now(), // unique temporary id
    author: "You",
    authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    verified: false,
    text: commentText,
    upvotes: 0,
    downvotes: 0,
    timeAgo: "Just now",
    isTrusted: false,
  };

  // Update the question's allAnswers temporarily
  setQuestions(prevQuestions =>
    prevQuestions.map(q =>
      q.id === questionId
        ? { ...q, allAnswers: [...q.allAnswers, newAnswer] }
        : q
    )
  );

  // Clear the input
  setCommentInputs(prev => ({ ...prev, [questionId]: "" }));
};

  return (
    <div className="min-h-screen bg-base-100">

{/* Community Hero */}
<div className="border-b border-base-300 bg-base-100">
  <div className="max-w-2xl mx-auto px-4 py-4 md:py-6">

    {/* Create Post Box */}
    <div
      onClick={() => setOpenAskModal(true)}
      className="
        flex items-center gap-3 p-3 md:p-4
        border border-base-300 rounded-lg
        hover:border-primary cursor-pointer transition
      "
    >
      {/* Avatar */}
      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Fake input */}
      <div className="flex-1 bg-base-200 rounded-full px-4 py-2.5 text-sm md:text-base text-base-content/60">
        What’s on your mind? Ask a question…
      </div>
    </div>

    {/* Quick Actions */}
    <div className="flex items-center justify-between mt-3 px-1">

      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpenAskModal(true)}
          className="btn btn-ghost btn-xs md:btn-sm text-base-content/60"
        >
          <MessageCircle className="w-4 h-4" />
          Ask
        </button>

        <button
          onClick={() => setOpenAskModal(true)}
          className="btn btn-ghost btn-xs md:btn-sm text-base-content/60"
        >
          <MapPin className="w-4 h-4" />
          Location
        </button>

        <button
          onClick={() => setOpenAskModal(true)}
          className="btn btn-ghost btn-xs md:btn-sm text-base-content/60"
        >
          <Route className="w-4 h-4" />
          Route Help
        </button>
      </div>

      <button
        onClick={() => setOpenAskModal(true)}
        className="btn bg-primary text-white btn-xs md:btn-sm"
      >
        Post
      </button>
    </div>

    {/* Search & Filters */}
    <div className="mt-5 pt-4 border-t border-base-300">

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            input input-bordered w-full
            pl-9 h-9 text-sm rounded-full
          "
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-3 py-1.5 rounded-full text-xs md:text-sm font-medium
              border transition whitespace-nowrap
              ${
                activeCategory === category
                  ? "bg-primary text-primary-content border-primary"
                  : "bg-base-200 text-base-content/70 border-base-300 hover:bg-base-300"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

    </div>
  </div>
</div>






       {/* Mobile Top Contributors - Horizontal Scroll */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-2 mb-3 px-4">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Top Contributors</h3>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide px-4">
              {topContributors.map((contributor, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 bg-base-100 rounded-xl p-3 border border-base-300 shadow-sm hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="relative mx-auto w-14 h-14 mb-2">
                    <img
                      src={contributor.image}
                      alt={contributor.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                    />

                    {/* Rank */}
                    <div
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${
                          index === 0
                            ? "bg-yellow-400 text-black"
                            : index === 1
                            ? "bg-gray-300 text-black"
                            : index === 2
                            ? "bg-orange-400 text-white"
                            : "bg-primary text-primary-content"
                        }
                      `}
                    >
                      {index + 1}
                    </div>

                    {/* Verified */}
                    {contributor.verified && (
                      <CheckCircle className="absolute -bottom-0.5 -right-0.5 w-4 h-4 text-secondary bg-base-100 rounded-full" />
                    )}
                  </div>

                  {/* Name */}
                  <p className="font-medium text-xs text-center truncate">
                    {contributor.name}
                  </p>

                  {/* Points */}
                  <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500 mt-0.5">
                    <span>{contributor.points.toLocaleString()} pts</span>
                  </div>

                  {/* Badge */}
                  <div className="mt-2 text-[9px] text-center badge badge-outline w-full justify-center truncate">
                    {contributor.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>


      {/* Questions Feed */}
      <div className="container mx-auto px-4 grid mt-7 lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-4">
          {filteredQuestions.length === 0 && (
            <div className="card bg-base-200 p-8 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No questions found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or category filter</p>
              <button className="btn bg-primary text-white inline-flex items-center">
                <Plus className="w-4 h-4 mr-2" /> Ask a Question
              </button>
            </div>
          )}

         {filteredQuestions.map(q => (
  <div
    key={q.id}
    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all"
  >
    <div className="p-4">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={q.authorImage} alt={q.author} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{q.author}</span>

            {q.verified && (
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <BadgeCheck className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="w-3 h-3" /> {q.location} • <Clock className="w-3 h-3" /> {q.timeAgo}
          </div>
        </div>

        <span className="badge bg-primary text-white hidden sm:inline-flex text-xs">{q.category}</span>
      </div>

      <h3 className="text-base md:text-lg font-semibold mb-2">{q.question}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{q.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {q.tags.map(tag => (
          <span
            key={tag}
            className="badge text-xs cursor-pointer border border-gray-300 text-gray-700 hover:bg-primary hover:text-white"
          >
            #{tag}
          </span>
        ))}
      </div>

          {q.allAnswers[0] && (
  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <img
        src={q.allAnswers[0].authorImage}
        className="w-7 h-7 rounded-full"
        alt=""
      />
      <span className="font-medium text-sm">{q.allAnswers[0].author}</span>
      {q.allAnswers[0].verified && (
        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
          <BadgeCheck className="w-3 h-3 text-white" />
        </div>
      )}
      <span className="ml-auto text-xs text-gray-400">
        {q.allAnswers[0].timeAgo}
      </span>
    </div>

    <p className="text-sm text-gray-700">{q.allAnswers[0].text}</p>

    <div className="flex gap-4 mt-3 text-sm text-gray-500 items-center">
      <button className="flex items-center gap-1 hover:text-teal-600">
        <ThumbsUp className="w-4 h-4" />
        {q.allAnswers[0].upvotes}
      </button>

      <button className="flex items-center gap-1 hover:text-red-500">
        <ThumbsDown className="w-4 h-4" />
        {q.allAnswers[0].downvotes}
      </button>

      <span className="ml-auto text-black cursor-pointer">
        View all answers →
      </span>
    </div>
  </div>
)}


                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t gap-2">
                  <div className="flex items-center gap-1">
                    {/* Upvote */}
                    <button
                          className={`btn btn-ghost btn-sm flex items-center ${
                            votedQuestions[q.id] === "up" ? "bg-primary text-white" : ""
                          }`}
                          onClick={() => {
                            setVotedQuestions(prev => {
                              const current = prev[q.id];
                              if (current === "up") return { ...prev, [q.id]: null }; // undo
                              return { ...prev, [q.id]: "up" }; // set upvote
                            });
                          }}
          >
            <ThumbsUp className="w-4 h-4" />
            {(q.upvotes ?? 0) + (votedQuestions[q.id] === "up" ? 1 : 0)}
          </button>

                    {/* Downvote */}
                    <button
                      className={`btn btn-ghost btn-sm flex items-center gap-1 ${
                        votedQuestions[q.id] === "down" ? "bg-primary text-white" : ""
                      }`}
                      onClick={() => {
                        setVotedQuestions(prev => {
                          const current = prev[q.id];
                          if (current === "down") return { ...prev, [q.id]: null }; // undo
                          return { ...prev, [q.id]: "down" }; // set downvote
                        });
                      }}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      {q.downvotes ?? 0 + (votedQuestions[q.id] === "down" ? 1 : 0)}
                    </button>

                    {/* Comments */}
                    <button
                      className="btn btn-ghost btn-sm flex items-center gap-1"
                      onClick={() => {
                        setActiveQuestion(q);
                        setOpenCommentsModal(true);
                      }}
                    >
                      <MessageCircle className="w-4 h-4" /> {q.allAnswers?.length ?? 0}
                    </button>

                    {/* Views */}
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" /> {q.views ?? 0}
                    </span>
                  </div>

  <div className="flex items-center gap-2">
    <button
      className={`btn btn-ghost btn-sm ${
        savedQuestions.includes(q.id) ? "text-primary" : ""
      }`}
      onClick={() => toggleSaveQuestion(q.id)}
    >
      <Bookmark className="w-4 h-4" />
    </button>
    <button className="btn btn-ghost btn-sm">
      <Share2 className="w-4 h-4" />
    </button>
    
  </div>
            </div>
    </div>
  </div>
))}

        </div>

        {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="rounded-2xl overflow-hidden bg-base-100 border border-base-300 shadow-sm">

              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary p-4 flex items-center gap-2 text-primary-content">
                <Award className="w-5 h-5" />
                <h3 className="font-semibold">Top Contributors</h3>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4">
                {topContributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 cursor-pointer hover:bg-base-200 p-2 rounded-xl transition"
                  >
                    {/* Avatar + Rank */}
                    <div className="relative">
                      <img
                        src={contributor.image}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                      />

                      {/* Rank Badge */}
                      <div
  className={`absolute -top-1 -left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shadow
    ${
      index === 0
        ? "bg-slate-900 text-white"        // 1st – premium black
        : index === 1
        ? "bg-slate-600 text-white"        // 2nd – muted steel
        : index === 2
        ? "bg-slate-400 text-white"        // 3rd – soft gray
        : "bg-gray-200 text-gray-700"      // others
    }
  `}
>
  {index + 1}
</div>

                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium text-sm truncate hover:text-primary transition">
                          {contributor.name}
                        </p>
                        {contributor.verified && (
                          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <BadgeCheck className="w-3 h-3 text-white" />
              </div>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <span>{contributor.points.toLocaleString()} pts</span>
                        <span>•</span>
                        <span>{contributor.answers} answers</span>
                      </div>
                    </div>

                    {/* Badge */}
                    <span className="badge text-xs hidden sm:inline-flex border border-gray-300 text-gray-600 bg-gray-50">
  {contributor.badge}
</span>

                  </div>
                ))}
              </div>
            </div>
          </div>

      </div>
      
      <button
          onClick={() => setOpenAskModal(true)}
          className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle shadow-lg hover:scale-105 transition"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Ask Navigation Modal */}
            {openAskModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white w-[95vw] max-w-lg mx-auto max-h-[90vh] overflow-y-auto rounded-2xl p-5 sm:p-6 relative">

                {/* Close */}
                <button
                  onClick={() => setOpenAskModal(false)}
                  className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>

                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <NavigationIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <h2 className="text-base sm:text-lg font-semibold">
                    Ask a Navigation Question
                  </h2>
                </div>

                <div className="space-y-4">

                  {/* Category */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Navigation", "Housing", "Safety", "Recommendations"].map((cat) => (
                        <button
                          key={cat}
                          className="btn btn-sm btn-outline border border-gray-300 hover:bg-primary text-xs sm:text-sm"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Your Question
                    </label>
                     <input
                      type="text"
                      placeholder="e.g., What's the fastest route from..."
                      className="
                        input input-bordered w-full text-sm
                        focus:outline-none
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/20
                      "
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Add more context to help the community answer better..."
                      className="textarea textarea-bordered w-full text-sm focus:outline-none
                      focus:border-primary
                      focus:ring-2
                      focus:ring-primary/20"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Tags
                    </label>

                    <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto">
                      {availableTags.map((tag) => {
                        const selected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`btn btn-xs ${
                              selected ? "bg-primary text-white" : "btn-outline border border-gray-300"
                            }`}
                          >
                            #{tag}
                          </button>
                        );
                      })}
                    </div>

                    {selectedTags.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Selected: {selectedTags.map(t => `#${t}`).join(", ")}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">
                      Your Location (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter your area or neighborhood"
                        className="input input-bordered flex-1 text-sm focus:outline-none
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/20"
                      />
                      <button className="btn btn-outline border border-gray-300 btn-square">
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button className="btn bg-primary text-white w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Post Question
                  </button>

                </div>
              </div>
            </div>

            )}

          {openCommentsModal && activeQuestion && (() => {
            const modalQuestion =
              questions.find(q => q.id === activeQuestion.id) || activeQuestion;

            if (!modalQuestion) return null;

            return (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center px-2">
                <div className="bg-[#f1f5f9] w-full sm:max-w-2xl max-h-[92vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden shadow-lg">

                  {/* HEADER */}
                  <div className="px-5 py-4 bg-white border-b flex items-start gap-3">
                    <img
                      src={modalQuestion.authorImage}
                      alt={modalQuestion.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm text-gray-900">
                          {modalQuestion.author}
                        </p>
                        {modalQuestion.verified && (
                           <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <BadgeCheck className="w-3 h-3 text-white" />
              </div>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {modalQuestion.location} • {modalQuestion.timeAgo}
                      </p>
                    </div>

                    <span className="px-3 py-1 text-xs rounded-full bg-primary text-white font-medium">
                      {modalQuestion.category}
                    </span>

                                    <button
                  onClick={() => setOpenCommentsModal(false)}
                  className="
                    ml-2
                    w-10 h-10
                    flex items-center justify-center
                    rounded-full
                    text-gray-400
                    hover:text-gray-600
                    hover:bg-gray-100
                    transition
                  "
                >
                  <X className="w-5 h-5" />
                </button>
                  </div>

                  {/* QUESTION */}
                  <div className="px-5 py-5 bg-white space-y-3">
                    <h2 className="font-bold text-[15px] leading-snug text-gray-900">
                      {modalQuestion.question}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {modalQuestion.description}
                    </p>

                    {/* TAGS */}
                    {modalQuestion.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-xs text-teal-600">
                        {modalQuestion.tags.map(tag => (
                          <span key={tag} className="border border-gray-300 text-black px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ANSWER COUNT */}
                  <div className="px-5 py-3 text-sm text-gray-600 border-y bg-[#f1f5f9] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    {modalQuestion.allAnswers.length} Answers
                  </div>

                  {/* ANSWERS */}
                  <div className="flex-1 overflow-y-auto bg-[#f1f5f9] space-y-2 py-2 px-5">
                    {modalQuestion.allAnswers.length === 0 && (
                      <p className="text-center text-sm text-gray-500 py-10">
                        No answers yet. Be the first to help 👋
                      </p>
                    )}

                    {modalQuestion.allAnswers.map(answer => (
                      <div key={answer.id} className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex gap-3">
                          <img
                            src={answer.authorImage}
                            alt={answer.author}
                            className="w-8 h-8 rounded-full mt-1 object-cover"
                          />

                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium text-gray-900">
                                {answer.author}
                              </p>

                              {answer.verified && (
                                 <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <BadgeCheck className="w-3 h-3 text-white" />
              </div>
                              )}

                              <span className="ml-auto text-xs text-gray-400">
                                {answer.timeAgo}
                              </span>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed">
                              {answer.text}
                            </p>

                            {/* VOTES */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                              <button
                                onClick={() => handleAnswerVote(answer.id, "up")}
                                className={`flex items-center gap-1 hover:text-gray-700 ${
                                  votedAnswers[answer.id] === "up" ? "text-teal-600" : ""
                                }`}
                              >
                                <ThumbsUp className="w-4 h-4" />
                                {answer.upvotes + (votedAnswers[answer.id] === "up" ? 1 : 0)}
                              </button>

                              <button
                                onClick={() => handleAnswerVote(answer.id, "down")}
                                className={`flex items-center gap-1 hover:text-gray-700 ${
                                  votedAnswers[answer.id] === "down" ? "text-red-500" : ""
                                }`}
                              >
                                <ThumbsDown className="w-4 h-4" />
                                {answer.downvotes + (votedAnswers[answer.id] === "down" ? 1 : 0)}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* INPUT AREA */}
                  {/* INPUT AREA */}
          <div className="px-5 py-4 bg-white border-t">
            <div className="flex gap-3 items-start mb-2">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                className="w-9 h-9 rounded-full object-cover"
                alt="You"
              />

              <textarea
                rows={3}
                placeholder="Write your answer..."
                value={commentInputs[modalQuestion.id] || ""}
                onChange={(e) =>
                  setCommentInputs(prev => ({
                    ...prev,
                    [modalQuestion.id]: e.target.value,
                  }))
                }
                className="textarea textarea-bordered flex-1 text-sm resize-none"
              />
            </div>

            <div className="flex justify-end">
            <button
            onClick={() => handleCommentSubmit(modalQuestion.id)}
            disabled={!commentInputs[modalQuestion.id]?.trim()}
            className="flex items-center gap-1 bg-primary text-white px-4 py-1 text-sm rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageCircle className="w-4 h-4" />
            Post
          </button>

            </div>
          </div>

                </div>
              </div>
            );
          })()}





    </div>
  );
};

export default Community;
