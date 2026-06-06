import Notification from "../models/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "firstName lastName avatarUrl")
      .sort({ createdAt: -1 });

    await Notification.updateMany(
      { recipient: userId },
      { isRead: true }
    );

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications function: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ recipient: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};