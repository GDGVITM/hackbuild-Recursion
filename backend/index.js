import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/database.js'; 
import eventRoutes from './src/routes/events.js';
import paymentRoutes from './src/routes/payment.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import userRoutes from './src/routes/user.routes.js';
import venueRoutes from './src/routes/venue.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
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

// API Routes
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/venues", venueRoutes);

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const User = await import('./src/models/User.js');
    
    res.json({
      message: 'Database test',
      connectionState: mongoose.default.connection.readyState,
      userModelExists: !!User.default,
      collections: mongoose.default.connection.db ? 
        (await mongoose.default.connection.db.listCollections().toArray()).map(c => c.name) : 
        'No database connection'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database test failed',
      message: error.message
    });
  }
});

// GET Committees
app.get('/api/committees', (req, res) => {
  res.json(committees);
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
