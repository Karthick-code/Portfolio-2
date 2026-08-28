import express from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
