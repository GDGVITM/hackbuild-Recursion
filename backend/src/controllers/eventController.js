// controllers/eventController.js
import Event from "../models/eventModel.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    console.log("Fetched Events:", events); // 👈 check terminal logs
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
