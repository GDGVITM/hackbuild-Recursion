// routes/eventRoutes.js
import express from "express";
import Event from "../models/Event.js"; 

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("GET /api/events hit"); 
  try {
    const events = await Event.find();
    console.log(" Events fetched:", events); 
    res.json(events);
  } catch (error) {
    console.error(" Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
