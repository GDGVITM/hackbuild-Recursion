import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './src/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ 
    message: 'EventHub Backend API', 
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Routes
import paymentRoutes from './src/routes/payment.routes.js';
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

app.use('/*any', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Auth endpoints available at http://localhost:${PORT}/api/auth`);
  console.log(`Payment endpoints available at http://localhost:${PORT}/api/payments`);
});