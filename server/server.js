import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

// ================================
// ENV SETUP
// ================================
dotenv.config();

// ================================
// APP INIT
// ================================
const app = express();

// Render injects PORT automatically
const PORT = process.env.PORT || 5000;

// ================================
// CORS CONFIGURATION
// ================================
// Allowed origins:
// - Local dev
// - Netlify frontend (via env)
// - Flexible for future domains
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(",").map(origin => origin.trim())
    : [])
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, Postman, curl
    if (!origin) return callback(null, true);

    const isDevelopment = process.env.NODE_ENV !== "production";

    if (isDevelopment || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// ================================
// BODY PARSERS
// ================================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ================================
// HEALTH CHECKS (RENDER NEEDS THIS)
// ================================
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "CO Attainment backend is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is healthy"
  });
});

// ================================
// API ROUTES
// ================================
app.use("/api", uploadRoutes);

// ================================
// ERROR HANDLER (MUST BE LAST)
// ================================
app.use(errorHandler);

// ================================
// START SERVER
// ================================
app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("=================================");
});
