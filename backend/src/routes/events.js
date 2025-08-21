import express from 'express';
import multer from 'multer';
import { Event, Committee } from '../../models.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary configuration
console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = express.Router();
const upload = multer({ dest: "temp/" }); // temporary storage

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("committee");
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST create event
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("Creating event with data:", req.body);

    const {
      title,
      description,
      committee, 
      startTime,
      endTime,
      location,
      maxAttendees,
      categories,
      price,
      tracks,
      integrations
    } = req.body;

    // Find committee by name
    const committeeDoc = await Committee.findOne({ name: committee });
    if (!committeeDoc) return res.status(400).json({ error: "Invalid committee name" });

    // Upload image if provided
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "events",
      });
      imageUrl = result.secure_url;
    }

    // Parse JSON fields from frontend (if sent as JSON strings)
    const parsedCategories = categories ? JSON.parse(categories) : [];
    const parsedTracks = tracks ? JSON.parse(tracks) : [];
    const parsedIntegrations = integrations ? JSON.parse(integrations) : {};

    const event = new Event({
      title,
      description,
      committee: committeeDoc._id,
      startTime,
      endTime,
      location,
      maxAttendees,
      categories: parsedCategories,
      price: price || 0,
      image: imageUrl,
      tracks: parsedTracks,
      integrations: parsedIntegrations
    });

    console.log("Event data before saving:", event);

    const savedEvent = await event.save();

    // ✅ Only one response
    res.status(201).json({
      message: "Event created successfully!",
      event: savedEvent
    });
    console.log("Event created successfully:", savedEvent);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

export default router;
