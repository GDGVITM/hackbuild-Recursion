import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './src/database.js'; 
import mongoose from 'mongoose';
import { Event } from './models.js';
import eventRoutes from './src/routes/events.js';
import paymentRoutes from './src/routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
console.log("MONGO_URI:", process.env.MONGO_URI);
// ✅ Connect to MongoDB before starting the server
connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/events", eventRoutes);

app.use("/api/payments", paymentRoutes);

// Root endpoint
// Connect to MongoDB
connectDB();

// Static committees
const committees = ["GDG", "CSI"];

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'EventHub Backend API', 
    status: 'running',
    timestamp: new Date().toISOString(),
    staticCommittees: committees
  });
});

// Routes
// Events Routes (all CRUD handled inside events.js)
app.use("/events", eventRoutes);

// GET Committees
app.get('/api/committees', (req, res) => {
  res.json(committees);
});

// GET all events (populate committee info)
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().populate("committee").sort({ startTime: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Payment routes
import authRoutes from './src/routes/auth.routes.js';

app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 route
app.use('/*any', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
