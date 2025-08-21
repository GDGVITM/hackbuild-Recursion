// EventRole.js
const mongoose = require("mongoose");

const eventRoleSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { 
    type: String, 
    enum: ["organizer", "volunteer", "student"], 
    default: "student" 
  },
  assignedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EventRole", eventRoleSchema);
