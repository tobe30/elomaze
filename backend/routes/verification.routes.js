import express from "express";
import { approveVerification, getMyVerificationStatus, rejectVerification, submitVerification } from "../controllers/verification.controller.js";
import upload from "../lib/multer.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { allowRoles } from "../middleware/rbac.js";

const router = express.Router();

router.post("/submit", protectRoute, upload.fields([
  { name: "documentImage", maxCount: 1 },
    { name: "selfieImage", maxCount: 1 },
  ]),
  submitVerification
);
router.patch("/:verificationId/approve", protectRoute, allowRoles("admin"), approveVerification);
router.patch("/:verificationId/reject", protectRoute, allowRoles("admin"), rejectVerification);
router.get("/me", protectRoute, getMyVerificationStatus);

export default router;