import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/database.js'; 
import mongoose from 'mongoose';
import { Event } from './models.js';
import eventRoutes from './src/routes/events.js';
import paymentRoutes from './src/routes/payment.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use the correct MongoDB URI
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
console.log("MONGO_URI:", mongoURI);

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static committees
const committees = ["GDG", "CSI"];

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
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

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

app.get("/api/events/:id", async (req, res) => { 
  try {
    const event = await Event.findById(req.params.id).populate("committee"); 
    if (!event) return res.status(404).json({ error: "Event not found" }); 
    res.json(event); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});


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

// Connect to MongoDB and start server
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
