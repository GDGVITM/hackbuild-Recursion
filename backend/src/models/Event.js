// models/Event.js
import mongoose from "mongoose";

const CATEGORY_TYPES = [
  "Technology",
  "Business",
  "Education",
  "Health & Wellness",
  "Other"
];

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  committee: { type: mongoose.Schema.Types.ObjectId, ref: "Committee" },
  organizer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed", "Cancelled"],
    default: "Pending"
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: String,
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue"
  },
  maxAttendees: Number,
  categories: {
    type: [String],
    enum: CATEGORY_TYPES,
  },
  tracks: [{
    name: String,
    description: String,
    startTime: Date,
    endTime: Date,
    location: String,
    maxAttendees: Number
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  price: { type: Number, default: 0 },
  image: { type: String },
  integrations: {
    googleCalendarId: String,
    externalApis: [{ name: String, endpoint: String }]
  },
  approvalDetails: {
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    approvedAt: Date,
    rejectionReason: String
  }
});

// Update timestamp on save
eventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for efficient querying
eventSchema.index({ status: 1 });
eventSchema.index({ organizer: 1 });
eventSchema.index({ startTime: 1 });
eventSchema.index({ isActive: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;   // ✅ ESM default export
