import Rating from "../models/rating.js";
import User from "../models/User.js";

export const updateTrustScore = async (userId) => {
  const ratings = await Rating.find({ reviewedUser: userId });

  if (ratings.length === 0) {
    await User.findByIdAndUpdate(userId, { trustScore: 0 });
    return;
  }

  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  const average = total / ratings.length;

  await User.findByIdAndUpdate(userId, {
    trustScore: parseFloat(average.toFixed(1)),
  });
};