import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // bcrypt hashed
  roles: {
    type: [String],
    enum: ["admin", "organizer", "volunteer", "student"],
    default: ["student"], // every user starts as student
  },
  activeRole: { 
    type: String, 
    enum: ["admin", "organizer", "volunteer", "student"],
    default: "student" 
  }, // which dashboard to show after login

  phone: { type: String },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: "College" },

  createdAt: { type: Date, default: Date.now },

  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    browser: { type: Boolean, default: true },
  },
});

// Ensure activeRole is always inside roles
userSchema.pre("save", function (next) {
  if (!this.roles.includes(this.activeRole)) {
    this.activeRole = this.roles[0]; // fallback to first role
  }
  next();
});

// Export as default
export default mongoose.model("User", userSchema);