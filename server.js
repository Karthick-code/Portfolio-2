import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { connectMySQL } from "./server/config/db.js";
import { seedDatabaseIfEmpty } from "./server/seed/seedData.js";

import authRoutes from "./server/routes/authRoutes.js";
import profileRoutes from "./server/routes/profileRoutes.js";
import skillRoutes from "./server/routes/skillRoutes.js";
import projectRoutes from "./server/routes/projectRoutes.js";
import experienceRoutes from "./server/routes/experienceRoutes.js";
import educationRoutes from "./server/routes/educationRoutes.js";
import contactRoutes from "./server/routes/contactRoutes.js";
import messageRoutes from "./server/routes/messageRoutes.js";
import adminRoutes from "./server/routes/adminRoutes.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize MySQL Database connection and initial tables/seed
  await connectMySQL();
  await seedDatabaseIfEmpty(false);

  // Global Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "MySQL Developer Portfolio API",
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/skills", skillRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/experience", experienceRoutes);
  app.use("/api/education", educationRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/admin", adminRoutes);

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Developer Portfolio MySQL Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal bootstrap error:", err);
});
