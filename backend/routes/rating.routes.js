import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addRating, getServiceRatings, getRatingsForUser } from "../controllers/rating.controller.js";

const router = express.Router();

router.post("/", protectRoute, addRating);
router.get("/ratings/:userId", getRatingsForUser);
router.get("/services/:serviceId/ratings", getServiceRatings);

export default router;