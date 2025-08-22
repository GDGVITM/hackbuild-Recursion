import User from '../models/User.js';
import mongoose from 'mongoose';

// Get all active users
export const getAllUsers = async (req, res) => {
  try {
    console.log("Getting all users...");
    console.log("MongoDB connection state:", mongoose.connection.readyState);
    
    // Wait for database connection if not ready
    if (mongoose.connection.readyState !== 1) {
      console.log("Database not ready, waiting for connection...");
      await new Promise(resolve => {
        if (mongoose.connection.readyState === 1) {
          resolve();
        } else {
          mongoose.connection.once('connected', resolve);
        }
      });
    }
    
    console.log("Database is ready, proceeding with query...");
    
    // Let's also check the total count without filters
    const totalCount = await User.countDocuments({});
    console.log("Total users in database (including inactive):", totalCount);
    
    const users = await User.find({})
      .select("-passwordHash")
      .sort({ createdAt: -1 });
    
    console.log(`Found ${users.length} active users`);
    console.log("Users:", users);
    
    res.json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch users",
      details: error.message
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select("-passwordHash");
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    res.json({
      success: true,
      user: user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch user" 
    });
  }
};

// Update user role
export const updateUserRole = async (req, res) => {
  try {
    console.log("Updating user role:", req.params.userId, req.body);
    
    const { userId } = req.params;
    const { role } = req.body;
    
    if (!role) {
      return res.status(400).json({ 
        success: false,
        error: "Role is required" 
      });
    }
    
    // Validate role
    const validRoles = ["admin", "organizer", "volunteer", "student"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        success: false,
        error: "Invalid role. Must be one of: admin, organizer, volunteer, student" 
      });
    }
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select("-passwordHash");
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    console.log("User role updated successfully:", user);
    res.json({
      success: true,
      message: "User role updated successfully!",
      user: user
    });
    
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to update user role" 
    });
  }
};

// Deactivate user
export const deactivateUser = async (req, res) => {
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
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    console.log("User deactivated successfully:", user);
    res.json({
      success: true,
      message: "User deactivated successfully!",
      user: user
    });
    
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to deactivate user" 
    });
  }
};

// Get user statistics
export const getUserStats = async (req, res) => {
  try {
    console.log("Getting user statistics...");
    
    // Wait for database connection if not ready
    if (mongoose.connection.readyState !== 1) {
      console.log("Database not ready, waiting for connection...");
      await new Promise(resolve => {
        if (mongoose.connection.readyState === 1) {
          resolve();
        } else {
          mongoose.connection.once('connected', resolve);
        }
      });
    }
    
    console.log("Database is ready, proceeding with stats query...");
    
    const totalUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ isActive: true, role: "admin" });
    const organizerUsers = await User.countDocuments({ isActive: true, role: "organizer" });
    const volunteerUsers = await User.countDocuments({ isActive: true, role: "volunteer" });
    const studentUsers = await User.countDocuments({ isActive: true, role: "student" });
    
    const stats = {
      totalUsers,
      adminUsers,
      organizerUsers,
      volunteerUsers,
      studentUsers
    };
    
    console.log("User stats:", stats);
    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch user statistics" 
    });
  }
};

// Get user role by Clerk ID
export const getUserRoleByClerkId = async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId }).select('role');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: "User not found" 
      });
    }
    
    res.json({
      success: true,
      role: user.role
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch user role" 
    });
  }
};
