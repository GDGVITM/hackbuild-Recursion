import User from "../models/User.js";
import Event from "../models/Event.js";
import Venue from "../models/Venue.js";
import Audit from "../models/Audit.js";

// Get dashboard overview stats
export const getDashboardStats = async (req, res) => {
  try {
    // Count total events
    const totalEvents = await Event.countDocuments({ isActive: true });
    
    // Count events by status
    const approvedEvents = await Event.countDocuments({ 
      isActive: true, 
      status: "Approved" 
    });
    
    const pendingEvents = await Event.countDocuments({ 
      isActive: true, 
      status: "Pending" 
    });
    
    // Count total users
    const totalUsers = await User.countDocuments({ isActive: true });

    res.json({
      success: true,
      stats: {
        totalEvents,
        approvedEvents,
        pendingEvents,
        totalUsers
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

// Get all events with filtering and pagination
export const getEvents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      search,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = { isActive: true };
    if (status && status !== "all") {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const events = await Event.find(filter)
      .populate("organizer", "name email")
      .populate("venue", "name capacity")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(filter);

    res.json({
      success: true,
      events,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalEvents: total,
        hasNext: skip + events.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Get pending event approvals
export const getPendingApprovals = async (req, res) => {
  try {
    const pendingEvents = await Event.find({ 
      status: "Pending",
      isActive: true 
    })
    .populate("organizer", "name email")
    .populate("venue", "name capacity")
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      pendingEvents
    });
  } catch (error) {
    console.error("Get pending approvals error:", error);
    res.status(500).json({ error: "Failed to fetch pending approvals" });
  }
};

// Approve or reject an event
export const updateEventStatus = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status, rejectionReason } = req.body;
    const adminId = req.user.userId;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.status = status;
    event.approvalDetails = {
      approvedBy: adminId,
      approvedAt: new Date(),
      rejectionReason: status === "Rejected" ? rejectionReason : undefined
    };

    await event.save();

    // Log the action
    await Audit.create({
      user: adminId,
      action: `Event ${status.toLowerCase()}`,
      target: eventId,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent")
    });

    res.json({
      success: true,
      message: `Event ${status.toLowerCase()} successfully`,
      event
    });
  } catch (error) {
    console.error("Update event status error:", error);
    res.status(500).json({ error: "Failed to update event status" });
  }
};

// Get all users with filtering
export const getUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      role, 
      search,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = {};
    if (role && role !== "all") {
      filter.role = role;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const users = await User.find(filter)
      .select("-passwordHash")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      success: true,
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: skip + users.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get all venues
export const getVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ isActive: true })
      .populate("currentBooking.eventId", "title startTime endTime")
      .populate("currentBooking.bookedBy", "name email")
      .sort({ name: 1 });

    res.json({
      success: true,
      venues
    });
  } catch (error) {
    console.error("Get venues error:", error);
    res.status(500).json({ error: "Failed to fetch venues" });
  }
};

// Allocate venue to event
export const allocateVenue = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { eventId, startTime, endTime } = req.body;
    const adminId = req.user.userId;

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ error: "Venue not found" });
    }

    if (venue.status === "Booked") {
      return res.status(400).json({ error: "Venue is already booked" });
    }

    venue.status = "Booked";
    venue.currentBooking = {
      eventId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      bookedBy: adminId
    };

    await venue.save();

    // Log the action
    await Audit.create({
      user: adminId,
      action: "Venue allocated",
      target: venueId,
      ipAddress: req.ip,
      userAgent: req.get("User-Agent")
    });

    res.json({
      success: true,
      message: "Venue allocated successfully",
      venue
    });
  } catch (error) {
    console.error("Allocate venue error:", error);
    res.status(500).json({ error: "Failed to allocate venue" });
  }
};

// Get audit logs
export const getAuditLogs = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20,
      action,
      userId,
      startDate,
      endDate,
      sortBy = "timestamp",
      sortOrder = "desc"
    } = req.query;

    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = {};
    if (action) filter.action = action;
    if (userId) filter.user = userId;
    if (startDate || endDate) {
      filter.timestamp = {};
      if (startDate) filter.timestamp.$gte = new Date(startDate);
      if (endDate) filter.timestamp.$lte = new Date(endDate);
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const logs = await Audit.find(filter)
      .populate("user", "name email")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Audit.countDocuments(filter);

    res.json({
      success: true,
      logs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalLogs: total,
        hasNext: skip + logs.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Get audit logs error:", error);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
};

// Get recent activity for dashboard
export const getRecentActivity = async (req, res) => {
  try {
    const recentLogs = await Audit.find()
      .populate("user", "name email")
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      success: true,
      recentActivity: recentLogs
    });
  } catch (error) {
    console.error("Get recent activity error:", error);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
};
