import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} from "../controllers/skillController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getSkills);
router.post("/", authMiddleware, createSkill);
router.put("/reorder", authMiddleware, reorderSkills);
router.put("/:id", authMiddleware, updateSkill);
router.delete("/:id", authMiddleware, deleteSkill);

export default router;
