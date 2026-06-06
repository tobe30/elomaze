import Conversation from "../models/conversation.js";

export const createConversation = async (req, res) => {
  try {
    const userId = req.user._id; // current logged-in user
    const { receiverId, serviceId } = req.body;

    // 1. Prevent user from chatting themselves
    if (userId.toString() === receiverId) {
      return res.status(400).json({
        error: "You cannot start a conversation with yourself",
      });
    }

    // 2. Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },// ensures both users are in the participants array
      service: serviceId,
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // 3. Create new conversation
    const newConversation = await Conversation.create({
      participants: [userId, receiverId],
      service: serviceId,
    });

    res.status(201).json(newConversation);
  } catch (error) {
    console.log("Error in createConversation controller function: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "username profileImg") // show users
      .populate("lastMessage") // optional if you store it
      .sort({ updatedAt: -1 }); // latest first

    res.status(200).json(conversations);
  } catch (error) {
    console.log("Error in getUserConversations: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSingleConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId)
      .populate("participants", "username profileImg")
      .populate("lastMessage");

    // ❗ Security check (VERY IMPORTANT)
    if (
      !conversation ||
      !conversation.participants.some(
        (p) => p._id.toString() === userId.toString()
      )
    ) {
      return res.status(404).json({
        error: "Conversation not found or access denied",
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.log("Error in getSingleConversation controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

