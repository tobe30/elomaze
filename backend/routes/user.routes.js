import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { changeUserPassword, getSavedProperties, getSavedServices, getUserProfile, saveProperty, saveService, unsaveProperty, unsaveService, updateUserProfile } from "../controllers/user.controller.js";
import User from "../models/User.js";
import upload from "../lib/multer.js";

const router = express.Router();

// PATCH /api/user/update-role
router.patch("/update-role", protectRoute, async (req, res) => {
  try {
    const { role } = req.body;
    const allowed = ["user", "agent"];
    if (!allowed.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    await User.findByIdAndUpdate(req.user._id, { role });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile/:id", getUserProfile);
router.put("/update", protectRoute, upload.single("avatar"), updateUserProfile);
router.put("/change-password", protectRoute, changeUserPassword);
// user saves a property route 
router.post("/save-property/:propertyId", protectRoute, saveProperty);
router.get("/saved-property", protectRoute, getSavedProperties);
router.delete("/save-property/:propertyId", protectRoute, unsaveProperty);

// user saves a service route
router.post("/save-service/:serviceId", protectRoute, saveService);
router.get("/saved-service", protectRoute, getSavedServices);
router.delete("/save-service/:serviceId", protectRoute, unsaveService);
export default router;