import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    target: String, // e.g., eventId, registrationId
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    userAgent: String
});

// Indexes for efficient querying
auditSchema.index({ timestamp: -1 });
auditSchema.index({ user: 1 });
auditSchema.index({ action: 1 });

const Audit = mongoose.model("Audit", auditSchema);

export default Audit;