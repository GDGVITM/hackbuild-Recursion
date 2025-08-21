import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    target: String, // e.g., eventId, registrationId
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    userAgent: String
});
  
module.exports = mongoose.model("Audit", auditSchema);