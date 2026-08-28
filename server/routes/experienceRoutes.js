import express from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getExperiences);
router.post("/", authMiddleware, createExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
