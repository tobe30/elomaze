import { useEffect, useRef, useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Star,
  ShieldCheck,
  Image as ImageIcon,
  ArrowLeft,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  X,
  BadgeCheck,
} from "lucide-react";

// Mock data (JSX version)
const mockConversations = [
  {
    id: "1",
    name: "Adebayo Johnson",
    avatar: "",
    lastMessage:
      "The apartment at Lekki is still available. Would you like to schedule a viewing?",
    timestamp: "2m ago",
    unread: 2,
    verified: true,
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "Hello! I saw your inquiry about the 3-bedroom apartment in Lekki.",
        time: "10:30 AM",
        type: "text",
      },
      {
        id: "m2",
        sender: "me",
        text: "Yes, I'm very interested! Is it still available?",
        time: "10:32 AM",
        type: "text",
      },
      {
        id: "m3",
        sender: "them",
        text: "The apartment at Lekki is still available. Would you like to schedule a viewing?",
        time: "10:35 AM",
        type: "text",
      },
    ],
  },
  {
    id: "2",
    name: "Chioma Okeke",
    avatar: "",
    lastMessage: "I can come for the plumbing fix tomorrow by 9 AM. Does that work?",
    timestamp: "1h ago",
    unread: 0,
    verified: true,
    messages: [
      {
        id: "m1",
        sender: "me",
        text: "Hi Chioma, I need a plumber urgently. Can you help?",
        time: "9:00 AM",
        type: "text",
      },
      { id: "m2", sender: "them", text: "Of course! What's the issue?", time: "9:05 AM", type: "text" },
      { id: "m3", sender: "me", text: "Leaking pipe in the kitchen. It's getting worse.", time: "9:06 AM", type: "text" },
      {
        id: "m4",
        sender: "them",
        text: "I can come for the plumbing fix tomorrow by 9 AM. Does that work?",
        time: "9:10 AM",
        type: "text",
      },
    ],
  },
  {
    id: "3",
    name: "Emeka Nwankwo",
    avatar: "",
    lastMessage: "The price is negotiable. Let me know your budget.",
    timestamp: "3h ago",
    unread: 1,
    verified: false,
    messages: [
      { id: "m1", sender: "them", text: "Hi there! Thanks for your interest in the property.", time: "Yesterday", type: "text" },
      { id: "m2", sender: "me", text: "What's the final asking price?", time: "Yesterday", type: "text" },
      { id: "m3", sender: "them", text: "The price is negotiable. Let me know your budget.", time: "Yesterday", type: "text" },
    ],
  },
  {
    id: "4",
    name: "Funke Adeleke",
    avatar: "",
    lastMessage: "Great choice! I'll send the documents shortly.",
    timestamp: "1d ago",
    unread: 0,
    verified: true,
    inactive: true,
    messages: [
      { id: "m1", sender: "them", text: "The studio apartment in Yaba is ready for inspection.", time: "2 days ago", type: "text" },
      { id: "m2", sender: "me", text: "I'll take it. Let's proceed.", time: "1 day ago", type: "text" },
      { id: "m3", sender: "them", text: "Great choice! I'll send the documents shortly.", time: "1 day ago", type: "text" },
    ],
  },
  {
    id: "5",
    name: "Ibrahim Musa",
    avatar: "",
    lastMessage: "The cleaning is done. Please check and confirm.",
    timestamp: "2d ago",
    unread: 0,
    verified: false,
    inactive: true,
    messages: [
      { id: "m1", sender: "me", text: "Can you deep clean a 2-bedroom apartment?", time: "3 days ago", type: "text" },
      { id: "m2", sender: "them", text: "Sure! I charge ₦25,000 for deep cleaning.", time: "3 days ago", type: "text" },
      { id: "m3", sender: "me", text: "Let's do it. When can you come?", time: "2 days ago", type: "text" },
      { id: "m4", sender: "them", text: "The cleaning is done. Please check and confirm.", time: "2 days ago", type: "text" },
    ],
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  // rating modal
  const [ratingOpen, setRatingOpen] = useState(false);
  const [ratingTarget, setRatingTarget] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [recommend, setRecommend] = useState(null);
  const [ratedChats, setRatedChats] = useState(new Set());

  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find((c) => c.id === activeChat);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages?.length]);

  const handleSend = () => {
    if (!messageInput.trim() || !activeChat) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `m${Date.now()}`,
                  sender: "me",
                  text: messageInput.trim(),
                  time: "Just now",
                  type: "text",
                },
              ],
              lastMessage: messageInput.trim(),
              timestamp: "Just now",
            }
          : c
      )
    );

    setMessageInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectChat = (id) => {
    setActiveChat(id);
    setShowMobileChat(true);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const handleSubmitRating = () => {
    if (ratingTarget) {
      setRatedChats((prev) => {
        const next = new Set(prev);
        next.add(ratingTarget);
        return next;
      });
    }
    setRatingOpen(false);
    setRating(0);
    setRatingComment("");
    setRecommend(null);
    setRatingTarget(null);
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "Agent":
        return "badge-primary";
      case "Service Provider":
        return "badge-secondary";
      case "Seller":
        return "badge-accent";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="h-full bg-base-200 overflow-hidden mt-14 md:mt-0">

      <div className="pt-0 h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div
            className={[
              "w-full md:w-[380px] lg:w-[420px] border-r border-base-300 bg-base-100 flex flex-col",
              showMobileChat ? "hidden md:flex" : "flex",
            ].join(" ")}
          >
            {/* Header */}
            <div className="p-4 border-b border-t border-base-300">
              <h1 className="text-xl font-bold mb-3">Messages</h1>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60" />
                <input
                  className="input input-bordered w-full pl-9 bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Conversation list (no ScrollArea; use native overflow) */}
            <div className="flex-1 overflow-y-auto">
              <div className="divide-y divide-base-200">
                {filteredConversations.map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => selectChat(convo.id)}
                    className={[
                      "w-full text-left p-4 transition hover:bg-base-200/70",
                      activeChat === convo.id ? "bg-base-200/70" : "",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="avatar placeholder">
                          <div className="w-12 rounded-full bg-primary/10 text-primary">
                            <span className="text-sm font-semibold">{getInitials(convo.name)}</span>
                          </div>
                        </div>

                        {convo.unread > 0 && (
                          <span className="absolute -top-1 -right-1 badge bg-blue-500 text-white badge-sm text-[10px] font-bold">
                            {convo.unread}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={[
                                "font-semibold text-sm truncate",
                                convo.unread > 0 ? "text-base-content" : "text-base-content/80",
                              ].join(" ")}
                            >
                              {convo.name}
                            </span>

                            {convo.verified && (
                              <div className="rounded-full bg-blue-500">

                                <BadgeCheck className="w-3.5 h-3.5 text-white flex-shrink-0" />
                              </div>
                            )}
                          </div>

                          <span className="text-[11px] opacity-60 flex-shrink-0 ml-2">{convo.timestamp}</span>
                        </div>


                        <p
                          className={[
                            "text-xs truncate",
                            convo.unread > 0 ? "text-base-content font-medium" : "opacity-70",
                          ].join(" ")}
                        >
                          {convo.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}

                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center opacity-70 text-sm">No conversations found</div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div
            className={[
              "flex-1 flex flex-col bg-base-200",
              !showMobileChat ? "hidden md:flex" : "flex",
            ].join(" ")}
          >
            {activeConversation ? (
              <>
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-t border-base-300 bg-base-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className="md:hidden btn btn-ghost btn-sm btn-square"
                      onClick={() => setShowMobileChat(false)}
                      aria-label="Back"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div className="avatar placeholder">
                      <div className="w-10 rounded-full bg-primary/10 text-primary">
                        <span className="text-xs font-semibold">{getInitials(activeConversation.name)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm">{activeConversation.name}</span>
                        <div className="bg-blue-500 rounded-full">
                        {activeConversation.verified && <BadgeCheck className="w-4 h-4 text-white" />}
                        </div>
                      </div>

                    </div>
                  </div>

                  <button className="btn btn-ghost btn-sm btn-square" aria-label="Menu">
                    <MoreVertical className="w-5 h-5 opacity-70" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="max-w-2xl mx-auto space-y-3">
                    {activeConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={[
                            "max-w-[75%] px-4 py-2.5",
                            msg.sender === "me"
                              ? "bg-primary text-primary-content rounded-2xl rounded-br-md"
                              : "bg-base-100 border border-base-300 text-base-content rounded-2xl rounded-bl-md shadow-sm",
                          ].join(" ")}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                          <p className={`text-[10px] mt-1.5 ${msg.sender === "me" ? "opacity-70" : "opacity-60"}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Rating prompt (inactive chats) */}
                  {activeConversation.inactive && !ratedChats.has(activeConversation.id) && (
                    <div className="max-w-2xl mx-auto mt-6">
                      <div className="bg-base-100 border border-base-300 rounded-2xl p-5 text-center shadow-sm">
                        <p className="text-sm font-medium mb-1">
                          How was your experience with {activeConversation.name}?
                        </p>
                        <p className="text-xs opacity-70 mb-4">
                          Your feedback helps build trust in the Elomaze community.
                        </p>

                        <button
                          className="btn bg-primary text-white btn-sm gap-2"
                          onClick={() => {
                            setRatingTarget(activeConversation.id);
                            setRatingOpen(true);
                          }}
                        >
                          <Star className="w-4 h-4" />
                          Rate this conversation
                        </button>
                      </div>
                    </div>
                  )}

                  {activeConversation.inactive && ratedChats.has(activeConversation.id) && (
                    <div className="max-w-2xl mx-auto mt-6">
                      <div className="bg-blue-500/10 border border-blue-500/50 rounded-2xl p-4 text-center">
                        <p className="text-sm text-blue-500 font-medium">✓ Thank you for your feedback!</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="border-t border-base-300 bg-base-100 p-3">
                  <div className="max-w-2xl mx-auto flex items-end gap-2">
                    <div className="flex gap-1">
                      <button className="btn btn-ghost btn-sm btn-square" aria-label="Attach">
                        <Paperclip className="w-4 h-4 opacity-70" />
                      </button>

                      <button
                        className="btn btn-ghost btn-sm btn-square hidden sm:inline-flex"
                        aria-label="Image"
                      >
                        <ImageIcon className="w-4 h-4 opacity-70" />
                      </button>

                      <button
                        className="btn btn-ghost btn-sm btn-square hidden sm:inline-flex"
                        aria-label="Emoji"
                      >
                        <Smile className="w-4 h-4 opacity-70" />
                      </button>
                    </div>

                    <textarea
                      className="textarea textarea-bordered w-full bg-base-200 min-h-[44px] max-h-[120px] leading-snug text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      rows={1}
                    />

                    <button
                      className="btn text-white bg-primary btn-square"
                      onClick={handleSend}
                      disabled={!messageInput.trim()}
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Empty state
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-20 h-20 rounded-2xl bg-base-100 border border-base-300 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 opacity-60" />
                  </div>
                  <h2 className="text-lg font-semibold mb-1">Your Messages</h2>
                  <p className="text-sm opacity-70 max-w-xs mx-auto">
                    Select a conversation to start chatting with agents, sellers, or service providers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Modal (pure Tailwind/DaisyUI-style) */}
      {ratingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setRatingOpen(false)}
          />
          <div className="relative w-full max-w-md bg-base-100 rounded-2xl shadow-xl border border-base-300">
            {/* Close */}
            <button
              className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
              onClick={() => setRatingOpen(false)}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="p-5 border-b border-base-300">
              <h3 className="font-semibold text-center">Rate your experience</h3>
            </div>

            {/* Body */}
            <div className="p-5 space-y-5">
              {/* Stars */}
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className="p-1 transition hover:scale-110"
                    aria-label={`Rate ${s} star`}
                  >
                    <Star
                      className={[
                        "w-8 h-8 transition",
                        s <= rating ? "text-primary fill-primary" : "text-base-300 hover:text-primary",
                      ].join(" ")}
                    />
                  </button>
                ))}
              </div>

              {/* Comment */}
              <div>
                <label className="text-sm font-medium block mb-2">Leave a comment (optional)</label>
                <textarea
                  className="textarea textarea-bordered w-full focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="How was your interaction?"
                  rows={3}
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                />
              </div>

              {/* Recommend */}
              <div>
                <label className="text-sm font-medium block mb-2">Would you recommend this provider?</label>
                <div className="flex gap-3">
                  <button
                    className={[
                      "btn btn-sm flex-1 gap-2",
                      recommend === true ? "bg-primary text-white" : "btn-outline border-gray-300",
                    ].join(" ")}
                    onClick={() => setRecommend(true)}
                    type="button"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Yes
                  </button>

                  <button
                    className={[
                      "btn btn-sm flex-1 gap-2",
                      recommend === false ? "bg-red-600 text-white" : "btn-outline border-gray-300",
                    ].join(" ")}
                    onClick={() => setRecommend(false)}
                    type="button"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-base-300">
              <button
                className="btn bg-primary text-white w-full"
                onClick={handleSubmitRating}
                disabled={rating === 0}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;