import express from 'express';
import multer from 'multer';
import Event from '../models/Event.js';
import Committee from '../models/Committee.js';
import User from '../models/User.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary configuration
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
    console.log("GET /api/events hit");
    
    // Build filter
    const filter = { isActive: true };
    if (req.query.status && req.query.status !== "all") {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } }
      ];
    }
    
    const events = await Event.find(filter)
      .populate("committee", "name description")
      .populate("organizer", "name email")
      .populate("venue", "name capacity location")
      .sort({ createdAt: -1 });
    
    console.log("Events fetched:", events.length);
    res.json(events); // Return events directly like LandingPage expects
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET all users (for admin dashboard)
router.get("/users", async (req, res) => {
  try {
    console.log("GET /api/events/users hit");
    const users = await User.find({ isActive: true })
      .select("-passwordHash")
      .sort({ createdAt: -1 });
    
    console.log("Users fetched:", users.length);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST create organizer
router.post("/users", async (req, res) => {
  try {
    console.log("Creating organizer with data:", req.body);
    
    const { name, email, phone, role = "organizer" } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    
    // Create new user (organizer)
    const user = new User({
      name,
      email,
      phone,
      role,
      passwordHash: 'temp_password', // Will be set when they first login
      isActive: true,
      isClerkUser: false
    });
    
    await user.save();
    
    console.log("Organizer created successfully:", user);
    res.status(201).json({
      success: true,
      message: "Organizer created successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
    
  } catch (err) {
    console.error("Error creating organizer:", err);
    res.status(500).json({ error: "Failed to create organizer" });
  }
});

// PUT update user role
router.put("/users/:userId/role", async (req, res) => {
  try {
    console.log("Updating user role:", req.params.userId, req.body);
    
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({ error: "Role is required" });
    }
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-passwordHash");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    console.log("User role updated successfully:", user);
    res.json({
      success: true,
      message: "User role updated successfully!",
      user
    });
    
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({ error: "Failed to update user role" });
  }
});

// DELETE deactivate user
router.delete("/users/:userId", async (req, res) => {
  try {
    console.log("Deactivating user:", req.params.userId);
    
    const { userId } = req.params;
    
    // Find and deactivate user
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select("-passwordHash");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    console.log("User deactivated successfully:", user);
    res.json({
      success: true,
      message: "User deactivated successfully!",
      user
    });
    
  } catch (err) {
    console.error("Error deactivating user:", err);
    res.status(500).json({ error: "Failed to deactivate user" });
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

    // Parse JSON fields from frontend
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
