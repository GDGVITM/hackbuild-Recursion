import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Check if JWT_SECRET is configured
const checkJWTSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }
};

// Traditional login (for non-Clerk users)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check JWT_SECRET
    checkJWTSecret();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if user is a Clerk user
    if (user.isClerkUser) {
      return res.status(400).json({ 
        error: "This account is managed by Clerk. Please use the sign-in button." 
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error.message.includes('JWT_SECRET')) {
      res.status(500).json({ error: "Server configuration error. Please contact administrator." });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Traditional registration
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role = "student" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check JWT_SECRET
    checkJWTSecret();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      passwordHash,
      phone,
      role,
      isClerkUser: false
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.message.includes('JWT_SECRET')) {
      res.status(500).json({ error: "Server configuration error. Please contact administrator." });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Clerk user sync/creation
export const syncClerkUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, phone } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Clerk ID and email are required" });
    }

    // Check JWT_SECRET
    checkJWTSecret();

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [{ email }, { clerkId }] 
    });

    if (user) {
      // Update existing user with Clerk info
      user.clerkId = clerkId;
      user.isClerkUser = true;
      if (firstName && lastName) {
        user.name = `${firstName} ${lastName}`;
      }
      if (phone) {
        user.phone = phone;
      }
      await user.save();
    } else {
      // Create new user from Clerk data
      user = new User({
        name: `${firstName || ''} ${lastName || ''}`.trim() || 'Clerk User',
        email,
        passwordHash: 'clerk_managed', // Placeholder for Clerk users
        clerkId,
        isClerkUser: true,
        phone,
        role: 'student' // Default role for new Clerk users
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isClerkUser: true
      }
    });
  } catch (error) {
    console.error("Clerk sync error:", error);
    if (error.message.includes('JWT_SECRET')) {
      res.status(500).json({ error: "Server configuration error. Please contact administrator." });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Check if user exists (for frontend routing)
export const checkUserExists = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    
    res.json({
      exists: !!user,
      isClerkUser: user?.isClerkUser || false,
      user: user ? {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone
      } : null
    });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { name, phone, notificationPreferences } = req.body;
    
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (notificationPreferences) {
      user.notificationPreferences = { ...user.notificationPreferences, ...notificationPreferences };
    }

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        notificationPreferences: user.notificationPreferences
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
