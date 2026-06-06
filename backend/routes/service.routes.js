import { createService, deleteService, getServiceById, getServices, getServicesByProvider, updateService } from "../controllers/service.controller.js";
import upload from "../lib/multer.js";
import express from 'express';
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/create', protectRoute, upload.array('images', 5), createService);
router.get("/", getServices);
router.get("/:id", getServiceById);
router.get("/user/:id", getServicesByProvider);
router.put( "/:id", protectRoute, upload.array("images", 5), updateService);
router.delete("/:id", protectRoute, deleteService);

export default router;