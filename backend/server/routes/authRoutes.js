import express from "express";
import { login, getMe, updatePassword } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.put("/password", authMiddleware, updatePassword);

export default router;
