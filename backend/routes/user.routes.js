import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { changeUserPassword, getSavedProperties, getSavedServices, getUserProfile, saveProperty, saveService, unsaveProperty, unsaveService, updateUserProfile } from "../controllers/user.controller.js";

const router = express.Router();


router.get("/profile/:id", getUserProfile);
router.put("/update/:id", protectRoute, updateUserProfile);
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