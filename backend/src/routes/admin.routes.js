import express from "express";
import { 
  getDashboardStats,
  getEvents,
  getPendingApprovals,
  updateEventStatus,
  getUsers,
  getVenues,
  allocateVenue,
  getAuditLogs,
  getRecentActivity
} from "../controllers/admin.controller.js";
import { authenticateToken, requireRole } from "../middleware/auth.middleware.js";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireRole(["admin"]));

// Dashboard overview
router.get("/dashboard/stats", getDashboardStats);
router.get("/dashboard/recent-activity", getRecentActivity);

// Events management
router.get("/events", getEvents);
router.get("/events/pending-approvals", getPendingApprovals);
router.put("/events/:eventId/status", updateEventStatus);

// User management
router.get("/users", getUsers);

// Venue management
router.get("/venues", getVenues);
router.post("/venues/:venueId/allocate", allocateVenue);

// Audit logs
router.get("/audit-logs", getAuditLogs);

export default router;
