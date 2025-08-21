// routes/eventRoutes.js
import express from "express";
import Event from "../models/Event.js"; // Ensure correct import path

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("📥 GET /api/events hit"); // <-- log request received
  try {
    const events = await Event.find();
    console.log("✅ Events fetched:", events); // <-- log data before sending
    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
