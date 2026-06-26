import Conversation from "../models/conversation.js";
import Rating from "../models/rating.js";
import { updateTrustScore } from "../utils/calcTrustScore.js";

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

    await updateTrustScore(ratedUser._id); // update trust score after new rating

    res.status(201).json(newRating);
  } catch (error) {
    console.log("Error in addRating: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRatingsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ratings = await Rating.find({ reviewedUser: userId })
      .populate("rater", "name email profilePic")
      .sort({ createdAt: -1 });

    // calculate average rating
    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    res.status(200).json({
      totalRatings,
      averageRating: parseFloat(averageRating.toFixed(1)),
      ratings,
    });
  } catch (error) {
    console.log("Error in getRatingsForUser: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getServiceRatings = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // 1. Find all conversations related to this service
    const conversations = await Conversation.find({
      service: serviceId,
    });

    const conversationIds = conversations.map((c) => c._id);

    // 2. Get ratings linked to those conversations
    const ratings = await Rating.find({
      conversation: { $in: conversationIds },
    })
      .populate("rater", "name avatarUrl")
      .sort({ createdAt: -1 });

    // 3. Calculate average rating
    const total = ratings.length;

    const average =
      total > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / total
        : 0;

    res.status(200).json({
      totalRatings: total,
      averageRating: parseFloat(average.toFixed(1)),
      ratings,
    });
  } catch (error) {
    console.log("Error in getServiceRatings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};