import { useState } from "react";
import {
  Search,
  ThumbsUp,
  MessageCircle,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  ChevronDown,
  Users,
  Award,
  Compass,
  Route,
  Map,
  Plus,
  Share2,
  Bookmark,
} from "lucide-react";

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [votedQuestions, setVotedQuestions] = useState({});
  const [openAskModal, setOpenAskModal] = useState(false);


  const categories = [
    "All",
    "Navigation",
    "Housing",
    "Safety",
    "Recommendations",
    "Local Events",
  ];

  const questions = [
    {
      id: 1,
      author: "Jessica Martinez",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      verified: true,
      location: "Downtown",
      question:
        "What's the fastest route from Tech Park to University during rush hour?",
      description:
        "I commute daily and want to avoid traffic. Looking for shortcuts or alternative routes that save time.",
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
          authorImage:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          verified: true,
          text:
            "Take the East Boulevard route via 5th Street – it bypasses the main intersection and saves about 15 minutes during peak hours.",
          upvotes: 89,
          downvotes: 3,
          timeAgo: "1 hour ago",
        },
      ],
    },
  ];

  const toggleSave = (id) => {
    setSavedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const toggleVote = (id) => {
    setVotedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = questions.filter(
    (q) =>
      (q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeCategory === "All" || q.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-base-100">
      {/* HERO */}
      <div className="relative bg-gradient-to-br from-primary via-primary/80 to-secondary/80 py-12">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Ask. Discover. Navigate.</h1>
          <p className="opacity-80 mb-6">
            Get local insights and community answers
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-12 pr-4 py-3 rounded-xl text-black"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="container mx-auto px-4 py-6 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <span
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "border"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* FEED */}
      <div className="container mx-auto px-4 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-5">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              {/* HEADER */}
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <img
                    src={q.authorImage}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{q.author}</span>
                      {q.verified && (
                        <CheckCircle className="w-4 h-4 text-teal-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {q.location} •{" "}
                      <Clock className="w-3 h-3" /> {q.timeAgo}
                    </div>
                  </div>
                </div>

                <span className="bg-teal-100 text-teal-700 text-xs px-3 py-1 rounded-full">
                  {q.category}
                </span>
              </div>

              {/* QUESTION */}
              <h3 className="mt-4 text-lg font-semibold">{q.question}</h3>
              <p className="text-gray-600 text-sm mt-1">{q.description}</p>

              {/* TAGS */}
              <div className="flex gap-3 mt-3 text-sm text-teal-600">
                {q.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>

              {/* ANSWER PREVIEW */}
              {q.allAnswers[0] && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={q.allAnswers[0].authorImage}
                      className="w-7 h-7 rounded-full"
                      alt=""
                    />
                    <span className="font-medium text-sm">
                      {q.allAnswers[0].author}
                    </span>
                    {q.allAnswers[0].verified && (
                      <span className="text-xs text-teal-600">Verified</span>
                    )}
                    <span className="ml-auto text-xs text-gray-400">
                      {q.allAnswers[0].timeAgo}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700">
                    {q.allAnswers[0].text}
                  </p>

                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    👍 {q.allAnswers[0].upvotes}
                    👎 {q.allAnswers[0].downvotes}
                    <span className="ml-auto text-teal-600 cursor-pointer">
                      View all answers →
                    </span>
                  </div>
                </div>
              )}

              {/* ROUTE */}
              {q.hasMap && (
                <div className="mt-4 border rounded-lg p-3 flex items-center gap-3 text-sm cursor-pointer hover:bg-gray-50">
                  <Route className="w-4 h-4 text-teal-600" />
                  <span className="font-medium">Route Available</span>
                  <span className="text-gray-400">Click to view on map</span>
                </div>
              )}

              {/* FOOTER ACTIONS */}
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleVote(q.id)}
                    className={`flex items-center gap-1 ${
                      votedQuestions[q.id] ? "text-teal-600" : ""
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {q.upvotes + (votedQuestions[q.id] ? 1 : 0)}
                  </button>

                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {q.allAnswers.length}
                  </span>

                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {q.views}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleSave(q.id)}
                    className={`hover:text-primary ${
                      savedQuestions.includes(q.id)
                        ? "text-primary"
                        : ""
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button className="hover:text-primary">
                    <Share2 className="w-4 h-4" />
                  </button>

                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block">
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-primary text-white p-4 font-semibold flex items-center gap-2">
              <Award className="w-5 h-5" /> Top Contributors
            </div>
            <div className="p-4 text-gray-500 text-sm">Coming soon…</div>
          </div>
        </div>
      </div>
      {/* Floating Ask Button */}
<button
  onClick={() => setOpenAskModal(true)}
  className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle shadow-lg hover:scale-105 transition"
>
  <Plus className="w-6 h-6" />
</button>

{/* Ask Navigation Modal */}
{openAskModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">

      {/* Close Button */}
      <button
        onClick={() => setOpenAskModal(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-black"
      >
        ✕
      </button>

      {/* Header */}
      <h3 className="text-xl font-semibold mb-1">
        Ask a Navigation Question
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Ask for directions, routes, or local tips from the community
      </p>

      {/* Form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="From where?"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          placeholder="To where?"
          className="input input-bordered w-full"
        />

        <textarea
          rows={3}
          placeholder="Describe the issue (traffic, safety, shortcut, etc.)"
          className="textarea textarea-bordered w-full"
        />

        <select className="select select-bordered w-full">
          <option>Navigation</option>
          <option>Safety</option>
          <option>Public Transport</option>
          <option>Walking Route</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setOpenAskModal(false)}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button className="btn btn-primary">
          Ask Question
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Community;
