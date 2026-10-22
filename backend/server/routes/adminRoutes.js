import express from "express";
import { getStats } from "../controllers/statsController.js";
import { authMiddleware } from "../middleware/auth.js";

export default const router = express.Router();

router.get("/stats", authMiddleware, getStats);


