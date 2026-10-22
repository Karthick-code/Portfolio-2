import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", authMiddleware, updateProfile);

export default router;
