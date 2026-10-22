// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectMySQL } from "./server/config/db.js";

// import authRoutes from "./server/routes/authRoutes.js";
// import profileRoutes from "./server/routes/profileRoutes.js";
// import skillRoutes from "./server/routes/skillRoutes.js";
// import projectRoutes from "./server/routes/projectRoutes.js";
// import experienceRoutes from "./server/routes/experienceRoutes.js";
// import educationRoutes from "./server/routes/educationRoutes.js";
// import contactRoutes from "./server/routes/contactRoutes.js";
// import messageRoutes from "./server/routes/messageRoutes.js";
// import adminRoutes from "./server/routes/adminRoutes.js";

// dotenv.config();

// async function startServer() {
//   const app = express();
//   const PORT = Number(process.env.PORT || 3000);

//   // Initialize database tables only; never insert demo/default portfolio data.
//   await connectMySQL();

//   // Global Middlewares
//   const allowedOrigins = (process.env.FRONTEND_URL || "")
//     .split(",")
//     .map((origin) => origin.trim().replace(/\/$/, ""))
//     .filter(Boolean);

//   app.use(cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
//         return callback(null, true);
//       }
//       return callback(new Error("Origin not allowed by CORS"));
//     },
//     credentials: true,
//   }));
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // API Routes
//   app.get("/api/health", (req, res) => {
//     res.status(200).json({
//       status: "ok",
//       timestamp: new Date().toISOString(),
//       service: "MySQL Developer Portfolio API",
//     });
//   });

//   app.use("/api/auth", authRoutes);
//   app.use("/api/profile", profileRoutes);
//   app.use("/api/skills", skillRoutes);
//   app.use("/api/projects", projectRoutes);
//   app.use("/api/experience", experienceRoutes);
//   app.use("/api/education", educationRoutes);
//   app.use("/api/contact", contactRoutes);
//   app.use("/api/messages", messageRoutes);
//   app.use("/api/admin", adminRoutes);

//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(`[Server] Developer Portfolio MySQL Server active on http://0.0.0.0:${PORT}`);
//   });
// }

// startServer().catch((err) => {
//   console.error("[Server] Fatal bootstrap error:", err);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMySQL } from "./server/config/db.js";

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
  const PORT = Number(process.env.PORT || 3000);

  // Connect to MySQL.
  await connectMySQL();

  // Allowed frontend origins.
  const allowedOrigins = [
    "https://karthick-portfolio-02.netlify.app",
    "http://localhost:5173",
    ...(process.env.FRONTEND_URL || "").split(","),
  ]
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

  // Configure CORS before registering API routes.
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests without an Origin header.
        if (!origin) {
          return callback(null, true);
        }

        const normalizedOrigin = origin.replace(/\/+$/, "");

        if (allowedOrigins.includes(normalizedOrigin)) {
          return callback(null, true);
        }

        console.warn(`[CORS] Blocked origin: ${origin}`);
        return callback(
          new Error(`Origin not allowed by CORS: ${origin}`)
        );
      },
      credentials: true,
      methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
      ],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
      ],
      optionsSuccessStatus: 204,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check.
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "MySQL Developer Portfolio API",
    });
  });

  // API routes.
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/skills", skillRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/experience", experienceRoutes);
  app.use("/api/education", educationRoutes);
  app.use("/api/contact", contactRoutes);
  app.use("/api/messages", messageRoutes);
  app.use("/api/admin", adminRoutes);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `[Server] Developer Portfolio API running on port ${PORT}`
    );
    console.log(
      `[CORS] Allowed origins: ${allowedOrigins.join(", ")}`
    );
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal bootstrap error:", err);
  process.exit(1);
});
