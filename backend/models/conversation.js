import mongoose from "mongoose";

//represents a chat between two or more users(agents/users) about a specific listing/service
const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // Optional but very important for Elomaze
    // so chat is tied to a listing/service it prevents random chats and allows us to show relevant info in the chat UI
    // For example, if a user is inquiring about a specific property, the conversation can be linked to that property. This way, when the user opens the chat, they can see details about the property and the agent can easily reference it in their messages.
    // In the future, we can expand this to support multiple types of conversations (e.g., general support chats that aren't tied to a specific listing)
    //structure 
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service", // or Property
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    lastMessageText: {
      type: String,
    },

    unreadCount: {
      type: Map,
      of: Number, // keeps unread per user
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);