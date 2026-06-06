import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { conversationId, text } = req.body;

    // 1. Find conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // 2. Create message
    const newMessage = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
    });

    // 3. Update conversation last message
    conversation.lastMessage = newMessage._id;
    conversation.lastMessageText = text;

    // 4. Update unread count for OTHER participants
    conversation.participants.forEach((userId) => {
      if (userId.toString() !== senderId.toString()) {
        const current = conversation.unreadCount.get(userId.toString()) || 0;
        conversation.unreadCount.set(userId.toString(), current + 1);
      }
    });

    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;

    // 1. Check if conversation exists
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // 2. Security check (user must be part of chat)
    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 3. Get messages
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "username profileImg")
      .sort({ createdAt: 1 }); // oldest → newest

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;
    const { conversationId } = req.params;

    // 1. Check conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // 2. Ensure user is participant
    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 3. Mark messages as read (THIS is where isRead is used)
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: userId },
        isRead: false,
      },
      { isRead: true }
    );

    // 4. Reset unread count
    conversation.unreadCount.set(userId.toString(), 0);
    await conversation.save();

    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    console.log("Error in markAsRead: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};