import express from "express";
import { createConversation, getSingleConversation, getUserConversations } from "../controllers/conversation.controller.js";
import { getMessages, markAsRead, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();


/* =========================
   CONVERSATIONS
========================= */
router.post("/conversation", protectRoute, createConversation);
router.get("/conversations", protectRoute, getUserConversations);
router.get("/conversation/:conversationId", protectRoute, getSingleConversation);

/* =========================
   MESSAGES
========================= */
router.post("/message", protectRoute, sendMessage);
router.get("/messages/:conversationId", protectRoute, getMessages);


/* =========================
   READ STATUS
========================= */
router.patch("/conversation/:conversationId/read", protectRoute, markAsRead);

export default router;