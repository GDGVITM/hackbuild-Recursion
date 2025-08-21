import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

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

import paymentRoutes from './src/routes/payment.routes.js';
app.use("/api/payments", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});