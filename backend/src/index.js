import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});


import eventRoutes from "./routes/eventRoutes.js";
app.use("/api/events", eventRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
