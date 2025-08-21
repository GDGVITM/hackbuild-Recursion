import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ["admin", "organizer", "volunteer", "student"], default: "student" },
  phone: { type: String },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" }, // optional for multi-college later
  createdAt: { type: Date, default: Date.now },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    browser: { type: Boolean, default: true }
  },
  // Clerk integration fields
  clerkId: { type: String, unique: true, sparse: true }, // Clerk user ID
  isClerkUser: { type: Boolean, default: false }, // Flag to identify Clerk users
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ clerkId: 1 });

// Export as default
export default mongoose.model("User", userSchema);