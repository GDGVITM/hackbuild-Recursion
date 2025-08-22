import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, 
  role: { type: String, enum: ["admin", "organizer", "volunteer", "student"], default: "student" },
  phone: { type: String },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" }, 
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    browser: { type: Boolean, default: true }
  },
  // Clerk integration fields
  clerkId: { type: String, unique: true, sparse: true }, 
  isClerkUser: { type: Boolean, default: false }, 
});

userSchema.index({ email: 1 });
userSchema.index({ clerkId: 1 });
userSchema.index({ isActive: 1 });

// Debug: Log when model is created
console.log('Creating User model...');

// Use existing model if already defined, otherwise create new
const User = mongoose.models.User || mongoose.model("User", userSchema);

console.log('User model created/retrieved:', User.modelName);
console.log('User schema fields:', Object.keys(userSchema.paths));

export default User;
