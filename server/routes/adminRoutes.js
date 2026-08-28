import express from "express";
import { getStats } from "../controllers/statsController.js";
import { authMiddleware } from "../middleware/auth.js";
import { seedDatabaseIfEmpty } from "../seed/seedData.js";

const router = express.Router();

router.get("/stats", authMiddleware, getStats);

// Emergency re-seed endpoint (protected)
router.post("/reseed", authMiddleware, async (req, res) => {
  try {
    await seedDatabaseIfEmpty(true);
    res.status(200).json({ success: true, message: "Database reseeded successfully with fresh data." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
