import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Event } from './models.js';
import eventRoutes from './src/routes/events.js';
import paymentRoutes from './src/routes/payment.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use("/api/payments", paymentRoutes);

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
