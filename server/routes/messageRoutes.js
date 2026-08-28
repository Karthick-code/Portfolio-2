import express from "express";
import {
  getMessages,
  markMessageAsRead,
  deleteMessage,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, getMessages);
router.put("/:id/read", authMiddleware, markMessageAsRead);
router.delete("/:id", authMiddleware, deleteMessage);

export default router;
