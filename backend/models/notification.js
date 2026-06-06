import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["message", "saved", "review", "system"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);

    // Optional but very important for Elomaze
    // so chat is tied to a listing/service it prevents random chats and allows us to show relevant info in the chat UI
    // For example, if a user is inquiring about a specific property, the conversation can be linked to that property. This way, when the user opens the chat, they can see details about the property and the agent can easily reference it in their messages.
    // In the future, we can expand this to support multiple types of conversations (e.g., general support chats that aren't tied to a specific listing)
    //structure 