import express from "express";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getEducations);
router.post("/", authMiddleware, createEducation);
router.put("/:id", authMiddleware, updateEducation);
router.delete("/:id", authMiddleware, deleteEducation);

export default router;
