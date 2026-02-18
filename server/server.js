import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Render injects PORT automatically
const PORT = process.env.PORT || 5000;

/* ================================
   CORS CONFIGURATION
================================ */
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(',').map(origin => origin.trim())
    : [])
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server / Postman / curl
    if (!origin) return callback(null, true);

    const isDevelopment = process.env.NODE_ENV !== 'production';

    if (
      isDevelopment ||
      allowedOrigins.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================================
   HEALTH CHECK (IMPORTANT)
================================ */
// Root health check for Render
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'CO Attainment backend is running',
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'CO Attainment backend is running'
  });
});

/* ================================
   API ROUTES
================================ */
app.use('/api', uploadRoutes);

/* ================================
   ERROR HANDLER (LAST)
================================ */
app.use(errorHandler);

/* ================================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
