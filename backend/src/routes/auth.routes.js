import express from "express";
import {
  login,
  register,
  syncClerkUser,
  checkUserExists,
  getProfile,
  updateProfile
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", login);
router.post("/register", register);
router.post("/sync-clerk", syncClerkUser);
router.get("/check-user/:email", checkUserExists);

// Protected routes
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);

export default router;
