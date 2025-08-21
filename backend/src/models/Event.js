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
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: String,
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
  price: { type: Number, default: 0 },
  image: { type: String },
  integrations: {
    googleCalendarId: String,
    externalApis: [{ name: String, endpoint: String }]
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;   // ✅ ESM default export
