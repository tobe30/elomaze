import Conversation from "../models/conversation.js";
import Rating from "../models/rating.js";

export const addRating = async (req, res) => {
  try {
    const raterId = req.user._id;

    const { conversationId, rating, comment, recommend } = req.body;

    // 1. Validate rating input
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5",
      });
    }

    // 2. Check if already rated this conversation
    const existingRating = await Rating.findOne({
      conversation: conversationId,
      rater: raterId,
    });

    if (existingRating) {
      return res.status(400).json({
        error: "You have already rated this conversation",
      });
    }

    // 3. Find conversation
    const conversation = await Conversation.findById(conversationId).populate(
      "participants"
    );

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // 4. Ensure user is part of conversation
    const isParticipant = conversation.participants.some(
      (p) => p._id.toString() === raterId.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ error: "Access denied" });
    }

    // 5. Find the other user (the one being rated)
    const ratedUser = conversation.participants.find(
      (p) => p._id.toString() !== raterId.toString()
    );

    if (!ratedUser) {
      return res.status(400).json({
        error: "Could not determine user to rate",
      });
    }

    // 6. Create rating
    const newRating = await Rating.create({
      conversation: conversationId,
      rater: raterId,
      reviewedUser: ratedUser._id,
      rating,
      comment,
      recommend,
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.log("Error in addRating: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};